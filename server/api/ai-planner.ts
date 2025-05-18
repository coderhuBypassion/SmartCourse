import { Course, LearningPlan, DailySchedule } from "../../client/src/lib/types";
import { generateId } from "../../client/src/lib/utils";
import { generateLearningPlan } from "../lib/gemini-client";

// Using the DeepSeek API to generate personalized learning plans

interface LearningPreferences {
  visualLearning: boolean;
  handsOnLearning: boolean;
  readingMaterials: boolean;
}

interface PlanGenerationRequest {
  goal: string;
  timePerDay: number; // in minutes
  deadlineDays: number;
  learningPreferences: LearningPreferences;
  availableCourses: Course[];
}

const activityIcons = {
  'HTML': 'code',
  'CSS': 'palette',
  'JavaScript': 'javascript',
  'React': 'code',
  'AI': 'smart_toy',
  'Node.js': 'terminal',
  'Python': 'code',
  'Design': 'design_services'
};

const activityColors = {
  'HTML': 'blue',
  'CSS': 'purple',
  'JavaScript': 'yellow',
  'React': 'pink',
  'AI': 'emerald',
  'Node.js': 'indigo',
  'Python': 'teal',
  'Design': 'purple'
};

export async function generateAiLearningPlan(request: PlanGenerationRequest): Promise<LearningPlan> {
  const { goal, timePerDay, deadlineDays, learningPreferences, availableCourses } = request;
  
  try {
    // Select relevant courses based on the goal
    const relevantCourses = selectRelevantCourses(goal, availableCourses);
    
    // Call DeepSeek API to generate personalized learning plan
    const dailySchedule = await generateDeepSeekLearningPlan(
      goal,
      timePerDay,
      deadlineDays,
      learningPreferences,
      relevantCourses
    );
    
    return {
      id: generateId(),
      goal,
      timePerDay,
      deadlineDays,
      createdAt: new Date().toISOString(),
      isPublic: false,
      upvotes: 0,
      dailySchedule
    };
  } catch (error) {
    console.error("Error generating learning plan:", error);
    
    // Fallback to our algorithm if DeepSeek API fails
    const relevantCourses = selectRelevantCourses(goal, availableCourses);
    const dailySchedule = generateDailySchedule(
      relevantCourses, 
      timePerDay, 
      deadlineDays, 
      learningPreferences
    );
    
    return {
      id: generateId(),
      goal,
      timePerDay,
      deadlineDays,
      createdAt: new Date().toISOString(),
      isPublic: false,
      upvotes: 0,
      dailySchedule
    };
  }
}

async function generateDeepSeekLearningPlan(
  goal: string,
  timePerDay: number,
  deadlineDays: number,
  preferences: LearningPreferences,
  courses: Course[]
): Promise<DailySchedule[]> {
  const preferencesText = Object.entries(preferences)
    .filter(([_, value]) => value)
    .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
    .join(', ');
  
  const coursesInfo = courses.map(course => ({
    title: course.title,
    description: course.description,
    duration: course.duration,
    difficulty: course.difficulty,
    topics: course.topics.map(t => t.name)
  }));
  
  const prompt = `You are an expert educational planner. Create a personalized daily learning schedule based on the following information:

Goal: ${goal}
Time available per day: ${timePerDay} minutes
Total days available: ${deadlineDays} days
Learning preferences: ${preferencesText || 'No specific preferences'}

Available Courses:
${JSON.stringify(coursesInfo, null, 2)}

Create a detailed daily learning schedule that will help achieve the goal within the timeframe.
For each day, include:
1. A title that summarizes that day's focus
2. A list of activities with:
   - Course title
   - Time allocation (in minutes)
   - A brief description of what will be covered
   - Appropriate icon (choose from: code, palette, javascript, smart_toy, terminal, design_services, school)
   - Color theme (choose from: blue, purple, yellow, pink, emerald, indigo, teal)
   - Progress percentage for that course (calculated based on total duration)

Return your response as a valid JSON array of daily schedules, following this exact structure:
[
  {
    "title": "Day title",
    "activities": [
      {
        "title": "Course title",
        "description": "Time allocation and progress",
        "icon": "icon_name",
        "color": "color_name",
        "progress": progress_percentage_number
      }
    ]
  }
]

Ensure the response is ONLY the JSON array, with no additional text before or after.`;

  try {
    const generatedContent = await generateLearningPlan(prompt);
    
    // Extract JSON from response (handle potential text before/after JSON)
    const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Could not extract valid JSON from Gemini response");
    }
    
    // Parse the JSON and validate the structure
    const scheduleData = JSON.parse(jsonMatch[0]);
    
    // Validate and normalize the schedule data
    return scheduleData.map((day: any) => ({
      title: day.title || "Learning Day",
      activities: (day.activities || []).map((activity: any) => ({
        title: activity.title || "Unnamed Activity",
        description: activity.description || "No description",
        icon: activity.icon || "school",
        color: activity.color || "blue",
        progress: typeof activity.progress === "number" ? activity.progress : 0
      }))
    }));
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

function selectRelevantCourses(goal: string, availableCourses: Course[]): Course[] {
  // Simple keyword matching to find relevant courses
  const goalLower = goal.toLowerCase();
  
  const keywords: { [key: string]: string[] } = {
    'frontend': ['html', 'css', 'javascript', 'react', 'frontend'],
    'backend': ['node', 'backend', 'server', 'api'],
    'fullstack': ['html', 'css', 'javascript', 'react', 'node', 'fullstack'],
    'data science': ['python', 'data', 'machine learning', 'ai'],
    'design': ['design', 'ui', 'ux']
  };
  
  // Find matching career path
  let matchedPath = 'frontend'; // default
  for (const [path, terms] of Object.entries(keywords)) {
    if (terms.some(term => goalLower.includes(term))) {
      matchedPath = path;
      break;
    }
  }
  
  // Filter and prioritize courses based on the matched path
  return availableCourses
    .filter(course => {
      const topicNames = course.topics.map(t => t.name.toLowerCase());
      return topicNames.some(topic => keywords[matchedPath].includes(topic));
    })
    .sort((a, b) => {
      // Sort by difficulty (beginner first)
      const difficultyOrder: { [key: string]: number } = {
        'Beginner': 1,
        'Intermediate': 2,
        'Advanced': 3
      };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
}

function generateDailySchedule(
  courses: Course[], 
  timePerDay: number, 
  deadlineDays: number,
  preferences: LearningPreferences
): DailySchedule[] {
  const schedule: DailySchedule[] = [];
  let remainingCourseMinutes: { [key: string]: number } = {};
  
  // Initialize remaining minutes for each course
  courses.forEach(course => {
    remainingCourseMinutes[course.title] = course.duration;
  });
  
  // For each day in the deadline
  for (let day = 1; day <= deadlineDays; day++) {
    const dailyActivities: any[] = [];
    let remainingTimeForDay = timePerDay;
    
    // Add activities until day is full
    for (const course of courses) {
      if (remainingCourseMinutes[course.title] <= 0) continue;
      
      // Determine time to allocate to this course today
      const timeForCourse = Math.min(
        remainingTimeForDay, 
        remainingCourseMinutes[course.title],
        // Don't spend more than 70% of daily time on one course
        Math.ceil(timePerDay * 0.7)
      );
      
      if (timeForCourse <= 0) continue;
      
      // Update remaining time
      remainingTimeForDay -= timeForCourse;
      remainingCourseMinutes[course.title] -= timeForCourse;
      
      // Calculate progress percentage for this course
      const totalProgress = Math.round(
        ((course.duration - remainingCourseMinutes[course.title]) / course.duration) * 100
      );
      
      // Get the primary topic for the course
      const primaryTopic = course.title.split(' ')[0];
      
      // Add activity to the day
      dailyActivities.push({
        title: course.title,
        description: `${getTimeDescription(timeForCourse)} (${totalProgress}% complete)`,
        icon: activityIcons[primaryTopic as keyof typeof activityIcons] || 'school',
        color: activityColors[primaryTopic as keyof typeof activityColors] || 'blue',
        progress: totalProgress
      });
      
      // If no more time left for today, break
      if (remainingTimeForDay <= 0) break;
    }
    
    // If we have activities for the day, add it to the schedule
    if (dailyActivities.length > 0) {
      schedule.push({
        title: getDayTitle(day, dailyActivities),
        activities: dailyActivities
      });
    }
    
    // If all courses are complete, stop
    if (Object.values(remainingCourseMinutes).every(min => min <= 0)) break;
  }
  
  return schedule;
}

function getTimeDescription(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMins} min`;
}

function getDayTitle(day: number, activities: any[]): string {
  // Generate a meaningful title based on the day's activities
  
  if (activities.length === 1) {
    const primaryCourse = activities[0].title.split(' ')[0];
    return `Focus on ${primaryCourse}`;
  }
  
  if (day === 1) {
    return "Getting Started";
  }
  
  const primaryTopics = activities.map(a => a.title.split(' ')[0]);
  
  if (primaryTopics.includes('HTML') && primaryTopics.includes('CSS')) {
    return "Web Fundamentals";
  }
  
  if (primaryTopics.includes('JavaScript')) {
    return "JavaScript Deep Dive";
  }
  
  if (primaryTopics.includes('React')) {
    return "React Components & State";
  }
  
  if (primaryTopics.includes('Node')) {
    return "Backend Development";
  }
  
  return `Day ${day} Learning`;
}
