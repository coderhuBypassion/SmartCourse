// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// client/src/lib/course-data.ts
var courses = [
  {
    id: 1,
    title: "HTML Crash Course",
    description: "Learn the fundamentals of HTML to build the structure of web pages. Perfect for absolute beginners.",
    duration: 90,
    // 1.5 hours in minutes
    durationText: "1.5 hours",
    difficulty: "Beginner",
    url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
    topics: [
      { name: "Frontend", emoji: "\u{1F5A5}\uFE0F" },
      { name: "Basics", emoji: "\u{1F530}" }
    ]
  },
  {
    id: 2,
    title: "CSS in Depth",
    description: "Master CSS with advanced styling techniques, flexbox, grid, and responsive design patterns.",
    duration: 180,
    // 3 hours in minutes
    durationText: "3 hours",
    difficulty: "Intermediate",
    url: "https://youtu.be/r1xBCi5SOjw?si=bd77esq029FHMslS",
    topics: [
      { name: "Frontend", emoji: "\u{1F5A5}\uFE0F" },
      { name: "Design", emoji: "\u{1F3A8}" }
    ]
  },
  {
    id: 3,
    title: "JavaScript Basics",
    description: "Introduction to JavaScript programming with hands-on exercises to build interactive websites.",
    duration: 120,
    // 2 hours in minutes
    durationText: "2 hours",
    difficulty: "Beginner",
    url: "https://youtu.be/PkZNo7MFNFg?si=vS6EBNH6-g3TvWQF",
    topics: [
      { name: "Frontend", emoji: "\u{1F5A5}\uFE0F" },
      { name: "Interactive", emoji: "\u26A1" }
    ]
  },
  {
    id: 4,
    title: "React for Beginners",
    description: "Learn to build modern web applications with React.js. Includes state management and routing.",
    duration: 300,
    // 5 hours in minutes
    durationText: "5 hours",
    difficulty: "Intermediate",
    url: "https://youtu.be/DLX62G4lc44?si=J1szKCIg9qVMv6td",
    topics: [
      { name: "Frontend", emoji: "\u{1F5A5}\uFE0F" },
      { name: "Framework", emoji: "\u269B\uFE0F" }
    ]
  },
  {
    id: 5,
    title: "Project-based Frontend Dev",
    description: "Build real-world projects from scratch using modern frontend technologies like React, Redux, and CSS-in-JS.",
    duration: 600,
    // 10 hours in minutes
    durationText: "10 hours",
    difficulty: "Advanced",
    url: "https://www.youtube.com/playlist?list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR",
    topics: [
      { name: "Frontend", emoji: "\u{1F5A5}\uFE0F" },
      { name: "Project", emoji: "\u{1F680}" }
    ]
  },
  {
    id: 6,
    title: "AI Fundamentals",
    description: "Introduction to artificial intelligence concepts, machine learning basics, and neural networks.",
    duration: 480,
    // 8 hours in minutes
    durationText: "8 hours",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/playlist?list=PLOspHqNVtKADfxkuDuHduUkDExBpEt3DF",
    topics: [
      { name: "AI", emoji: "\u{1F916}" },
      { name: "Data Science", emoji: "\u{1F4CA}" }
    ]
  },
  {
    id: 7,
    title: "Node.js Essentials",
    description: "Learn server-side JavaScript with Node.js to build scalable backend services and APIs.",
    duration: 360,
    // 6 hours in minutes
    durationText: "6 hours",
    difficulty: "Intermediate",
    url: "https://www.youtube.com/playlist?list=PLpc_YvcwbxaRl8WOTamrAD78jnsuNqM1C",
    topics: [
      { name: "Backend", emoji: "\u{1F5A7}" },
      { name: "JavaScript", emoji: "\u26A1" }
    ]
  },
  {
    id: 8,
    title: "Python Data Science",
    description: "Learn data analysis, visualization, and machine learning using Python and popular libraries.",
    duration: 240,
    // 4 hours in minutes
    durationText: "4 hours",
    difficulty: "Intermediate",
    url: "https://youtu.be/LHBE6Q9XlzI?si=xRjovhYLNwQ2IKih",
    topics: [
      { name: "Data Science", emoji: "\u{1F4CA}" },
      { name: "Python", emoji: "\u{1F40D}" }
    ]
  },
  {
    id: 9,
    title: "UX/UI Design Principles",
    description: "Master the fundamentals of user experience and interface design with practical examples.",
    duration: 150,
    // 2.5 hours in minutes
    durationText: "2.5 hours",
    difficulty: "Beginner",
    url: "https://www.youtube.com/live/BU_afT-aIn0?si=we5MuDZKsrENOLqP",
    topics: [
      { name: "Design", emoji: "\u{1F3A8}" },
      { name: "UI", emoji: "\u{1F58C}\uFE0F" }
    ]
  }
];
var peerPaths = [
  {
    id: 1,
    title: "Frontend in 4 Weeks",
    author: "@webdev_jane",
    timePerDay: 1.5,
    description: "A practical path focusing on modern frontend technologies with mini-projects along the way. Perfect for visual learners.",
    progress: 87,
    upvotes: 243,
    url: "https://roadmap.sh/frontend",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 2,
    title: "AI Developer Roadmap",
    author: "@ai_enthusiast",
    timePerDay: 2,
    description: "From Python basics to advanced machine learning concepts. This path was created by an AI researcher with beginners in mind.",
    progress: 65,
    upvotes: 187,
    url: "https://roadmap.sh/ai-engineer",
    tags: ["Python", "Data Science", "Machine Learning"]
  },
  {
    id: 3,
    title: "Fullstack Bootcamp Alternative",
    author: "@code_master",
    timePerDay: 3,
    description: "Save $15,000 and learn the same content as a bootcamp. This 12-week path covers frontend, backend, and deployment.",
    progress: 42,
    upvotes: 156,
    url: "https://roadmap.sh/full-stack",
    tags: ["Frontend", "Backend", "Project", "Career"]
  },
  {
    id: 4,
    title: "UX/UI Designer in 60 Days",
    author: "@design_guru",
    timePerDay: 2,
    description: "Start with fundamentals and progress to advanced UX/UI concepts. Includes practical exercises and portfolio-building projects.",
    progress: 74,
    upvotes: 129,
    url: "https://roadmap.sh/ux-design",
    tags: ["UX Design", "UI Design", "Figma", "Portfolio"]
  }
];

// client/src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function generateId() {
  return Math.floor(Math.random() * 1e4);
}

// server/lib/gemini-client.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
var apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}
var genAI = new GoogleGenerativeAI(apiKey);
var geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });
async function generateLearningPlan(prompt) {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

// server/api/ai-planner.ts
var activityIcons = {
  "HTML": "code",
  "CSS": "palette",
  "JavaScript": "javascript",
  "React": "code",
  "AI": "smart_toy",
  "Node.js": "terminal",
  "Python": "code",
  "Design": "design_services"
};
var activityColors = {
  "HTML": "blue",
  "CSS": "purple",
  "JavaScript": "yellow",
  "React": "pink",
  "AI": "emerald",
  "Node.js": "indigo",
  "Python": "teal",
  "Design": "purple"
};
async function generateAiLearningPlan(request) {
  const { goal, timePerDay, deadlineDays, learningPreferences, availableCourses } = request;
  try {
    const relevantCourses = selectRelevantCourses(goal, availableCourses);
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
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isPublic: false,
      upvotes: 0,
      dailySchedule
    };
  } catch (error) {
    console.error("Error generating learning plan:", error);
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
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isPublic: false,
      upvotes: 0,
      dailySchedule
    };
  }
}
async function generateDeepSeekLearningPlan(goal, timePerDay, deadlineDays, preferences, courses2) {
  const preferencesText = Object.entries(preferences).filter(([_, value]) => value).map(([key, _]) => key.replace(/([A-Z])/g, " $1").toLowerCase()).join(", ");
  const coursesInfo = courses2.map((course) => ({
    title: course.title,
    description: course.description,
    duration: course.duration,
    difficulty: course.difficulty,
    topics: course.topics.map((t) => t.name)
  }));
  const prompt = `You are an expert educational planner. Create a personalized daily learning schedule based on the following information:

Goal: ${goal}
Time available per day: ${timePerDay} minutes
Total days available: ${deadlineDays} days
Learning preferences: ${preferencesText || "No specific preferences"}

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
    const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Could not extract valid JSON from Gemini response");
    }
    const scheduleData = JSON.parse(jsonMatch[0]);
    return scheduleData.map((day) => ({
      title: day.title || "Learning Day",
      activities: (day.activities || []).map((activity) => ({
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
function selectRelevantCourses(goal, availableCourses) {
  const goalLower = goal.toLowerCase();
  const keywords = {
    "frontend": ["html", "css", "javascript", "react", "frontend"],
    "backend": ["node", "backend", "server", "api"],
    "fullstack": ["html", "css", "javascript", "react", "node", "fullstack"],
    "data science": ["python", "data", "machine learning", "ai"],
    "design": ["design", "ui", "ux"]
  };
  let matchedPath = "frontend";
  for (const [path3, terms] of Object.entries(keywords)) {
    if (terms.some((term) => goalLower.includes(term))) {
      matchedPath = path3;
      break;
    }
  }
  return availableCourses.filter((course) => {
    const topicNames = course.topics.map((t) => t.name.toLowerCase());
    return topicNames.some((topic) => keywords[matchedPath].includes(topic));
  }).sort((a, b) => {
    const difficultyOrder = {
      "Beginner": 1,
      "Intermediate": 2,
      "Advanced": 3
    };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
}
function generateDailySchedule(courses2, timePerDay, deadlineDays, preferences) {
  const schedule = [];
  let remainingCourseMinutes = {};
  courses2.forEach((course) => {
    remainingCourseMinutes[course.title] = course.duration;
  });
  for (let day = 1; day <= deadlineDays; day++) {
    const dailyActivities = [];
    let remainingTimeForDay = timePerDay;
    for (const course of courses2) {
      if (remainingCourseMinutes[course.title] <= 0) continue;
      const timeForCourse = Math.min(
        remainingTimeForDay,
        remainingCourseMinutes[course.title],
        // Don't spend more than 70% of daily time on one course
        Math.ceil(timePerDay * 0.7)
      );
      if (timeForCourse <= 0) continue;
      remainingTimeForDay -= timeForCourse;
      remainingCourseMinutes[course.title] -= timeForCourse;
      const totalProgress = Math.round(
        (course.duration - remainingCourseMinutes[course.title]) / course.duration * 100
      );
      const primaryTopic = course.title.split(" ")[0];
      dailyActivities.push({
        title: course.title,
        description: `${getTimeDescription(timeForCourse)} (${totalProgress}% complete)`,
        icon: activityIcons[primaryTopic] || "school",
        color: activityColors[primaryTopic] || "blue",
        progress: totalProgress
      });
      if (remainingTimeForDay <= 0) break;
    }
    if (dailyActivities.length > 0) {
      schedule.push({
        title: getDayTitle(day, dailyActivities),
        activities: dailyActivities
      });
    }
    if (Object.values(remainingCourseMinutes).every((min) => min <= 0)) break;
  }
  return schedule;
}
function getTimeDescription(minutes) {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMins} min`;
}
function getDayTitle(day, activities) {
  if (activities.length === 1) {
    const primaryCourse = activities[0].title.split(" ")[0];
    return `Focus on ${primaryCourse}`;
  }
  if (day === 1) {
    return "Getting Started";
  }
  const primaryTopics = activities.map((a) => a.title.split(" ")[0]);
  if (primaryTopics.includes("HTML") && primaryTopics.includes("CSS")) {
    return "Web Fundamentals";
  }
  if (primaryTopics.includes("JavaScript")) {
    return "JavaScript Deep Dive";
  }
  if (primaryTopics.includes("React")) {
    return "React Components & State";
  }
  if (primaryTopics.includes("Node")) {
    return "Backend Development";
  }
  return `Day ${day} Learning`;
}

// server/lib/learning-plans.ts
var ICONS = {
  HTML: "code",
  CSS: "palette",
  JavaScript: "javascript",
  React: "code",
  Node: "terminal",
  Database: "smart_toy",
  API: "design_services",
  DevOps: "terminal",
  Testing: "code",
  Security: "smart_toy"
};
var COLORS = {
  HTML: "blue",
  CSS: "purple",
  JavaScript: "yellow",
  React: "pink",
  Node: "indigo",
  Database: "emerald",
  API: "teal",
  DevOps: "blue",
  Testing: "purple",
  Security: "emerald"
};
var frontendPlan = {
  id: generateId(),
  goal: "Master Frontend Development",
  timePerDay: 120,
  // 2 hours per day
  deadlineDays: 31,
  createdAt: (/* @__PURE__ */ new Date()).toISOString(),
  isPublic: true,
  upvotes: 0,
  dailySchedule: [
    // Week 1: HTML & CSS Fundamentals
    {
      title: "HTML Structure & Elements",
      activities: [
        {
          title: "HTML Basics",
          description: "Learn HTML document structure, elements, and semantic markup",
          icon: ICONS.HTML,
          color: COLORS.HTML,
          progress: 0
        }
      ]
    },
    {
      title: "HTML Forms & Tables",
      activities: [
        {
          title: "Interactive Elements",
          description: "Create forms, tables, and interactive HTML elements",
          icon: ICONS.HTML,
          color: COLORS.HTML,
          progress: 0
        }
      ]
    },
    {
      title: "CSS Fundamentals",
      activities: [
        {
          title: "CSS Basics",
          description: "Selectors, properties, and basic styling",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "CSS Layout",
      activities: [
        {
          title: "Box Model & Flexbox",
          description: "Master the box model and flexbox layout",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "CSS Grid",
      activities: [
        {
          title: "Grid Layout",
          description: "Create complex layouts with CSS Grid",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "Responsive Design",
      activities: [
        {
          title: "Media Queries",
          description: "Make websites responsive with media queries",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "CSS Animations",
      activities: [
        {
          title: "Transitions & Animations",
          description: "Add smooth transitions and animations",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    // Week 2: JavaScript Fundamentals
    {
      title: "JavaScript Basics",
      activities: [
        {
          title: "Variables & Data Types",
          description: "Learn JavaScript variables, data types, and operators",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Control Flow",
      activities: [
        {
          title: "Conditionals & Loops",
          description: "Master if/else statements and loops",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Functions",
      activities: [
        {
          title: "Function Basics",
          description: "Create and use functions in JavaScript",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Arrays & Objects",
      activities: [
        {
          title: "Data Structures",
          description: "Work with arrays and objects",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "DOM Manipulation",
      activities: [
        {
          title: "DOM Basics",
          description: "Select and modify HTML elements",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Events",
      activities: [
        {
          title: "Event Handling",
          description: "Handle user interactions and events",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Async JavaScript",
      activities: [
        {
          title: "Promises & Async/Await",
          description: "Work with asynchronous code",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    // Week 3: React Fundamentals
    {
      title: "React Introduction",
      activities: [
        {
          title: "React Basics",
          description: "Learn React components and JSX",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Props & State",
      activities: [
        {
          title: "Component Data",
          description: "Work with props and state",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Hooks",
      activities: [
        {
          title: "React Hooks",
          description: "Use useState and useEffect hooks",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Forms & Events",
      activities: [
        {
          title: "Form Handling",
          description: "Handle forms and events in React",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Lists & Keys",
      activities: [
        {
          title: "Rendering Lists",
          description: "Render and manage lists in React",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Conditional Rendering",
      activities: [
        {
          title: "Dynamic UI",
          description: "Implement conditional rendering",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "React Router",
      activities: [
        {
          title: "Routing",
          description: "Implement client-side routing",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    // Week 4: Advanced React & Tools
    {
      title: "State Management",
      activities: [
        {
          title: "Context API",
          description: "Manage global state with Context",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Redux Basics",
      activities: [
        {
          title: "Redux Store",
          description: "Learn Redux fundamentals",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Redux Toolkit",
      activities: [
        {
          title: "Modern Redux",
          description: "Use Redux Toolkit for state management",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Testing",
      activities: [
        {
          title: "Jest & React Testing",
          description: "Write tests for React components",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    {
      title: "Performance",
      activities: [
        {
          title: "React Performance",
          description: "Optimize React application performance",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Build Tools",
      activities: [
        {
          title: "Webpack & Babel",
          description: "Configure build tools",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Deployment",
      activities: [
        {
          title: "Deployment Strategies",
          description: "Deploy React applications",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    // Week 5: Final Project & Advanced Topics
    {
      title: "TypeScript",
      activities: [
        {
          title: "TypeScript Basics",
          description: "Add type safety to React applications",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "Advanced CSS",
      activities: [
        {
          title: "CSS Modules & Styled Components",
          description: "Use modern CSS solutions",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "Final Project",
      activities: [
        {
          title: "Portfolio Project",
          description: "Build a complete frontend application",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    }
  ]
};
var backendPlan = {
  id: generateId(),
  goal: "Master Backend Development",
  timePerDay: 120,
  // 2 hours per day
  deadlineDays: 31,
  createdAt: (/* @__PURE__ */ new Date()).toISOString(),
  isPublic: true,
  upvotes: 0,
  dailySchedule: [
    // Week 1: Node.js Fundamentals
    {
      title: "Node.js Basics",
      activities: [
        {
          title: "Node.js Introduction",
          description: "Learn Node.js basics, event loop, and modules",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Node.js Core Concepts",
      activities: [
        {
          title: "Async Programming",
          description: "Master callbacks, promises, and async/await",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "File System & Streams",
      activities: [
        {
          title: "File Operations",
          description: "Work with files, directories, and streams",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Express.js Basics",
      activities: [
        {
          title: "Express Framework",
          description: "Create a basic Express.js server",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Middleware & Routing",
      activities: [
        {
          title: "Express Middleware",
          description: "Implement custom middleware and routing",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Error Handling",
      activities: [
        {
          title: "Error Management",
          description: "Implement error handling middleware",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "API Development",
      activities: [
        {
          title: "RESTful APIs",
          description: "Design and implement REST APIs",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    // Week 2: Database & Authentication
    {
      title: "Database Basics",
      activities: [
        {
          title: "SQL Fundamentals",
          description: "Learn SQL database concepts and queries",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "MongoDB",
      activities: [
        {
          title: "NoSQL Database",
          description: "Work with MongoDB and Mongoose",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "Database Design",
      activities: [
        {
          title: "Schema Design",
          description: "Design efficient database schemas",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "Authentication",
      activities: [
        {
          title: "User Auth",
          description: "Implement JWT authentication",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    {
      title: "Authorization",
      activities: [
        {
          title: "Access Control",
          description: "Implement role-based access control",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    {
      title: "Security Best Practices",
      activities: [
        {
          title: "API Security",
          description: "Secure your API endpoints",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    {
      title: "Data Validation",
      activities: [
        {
          title: "Input Validation",
          description: "Validate and sanitize user input",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    // Week 3: Advanced Topics
    {
      title: "Caching",
      activities: [
        {
          title: "Redis Caching",
          description: "Implement Redis for performance",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "Testing",
      activities: [
        {
          title: "Unit Testing",
          description: "Write tests with Jest and Supertest",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    {
      title: "Logging & Monitoring",
      activities: [
        {
          title: "Application Logs",
          description: "Set up logging and monitoring",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "WebSockets",
      activities: [
        {
          title: "Real-time Data",
          description: "Implement real-time features",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Message Queues",
      activities: [
        {
          title: "Queue Systems",
          description: "Work with message queues",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Deployment",
      activities: [
        {
          title: "Cloud Deployment",
          description: "Deploy to cloud platforms",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Final Project",
      activities: [
        {
          title: "Backend Project",
          description: "Build a complete backend system",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    // Week 4: System Design & Scaling
    {
      title: "System Architecture",
      activities: [
        {
          title: "Architecture Patterns",
          description: "Learn microservices and system design",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Load Balancing",
      activities: [
        {
          title: "Traffic Distribution",
          description: "Implement load balancing strategies",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Database Scaling",
      activities: [
        {
          title: "Scaling Strategies",
          description: "Learn database sharding and replication",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "Containerization",
      activities: [
        {
          title: "Docker",
          description: "Containerize your application",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Kubernetes Basics",
      activities: [
        {
          title: "Container Orchestration",
          description: "Learn Kubernetes fundamentals",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "CI/CD Pipeline",
      activities: [
        {
          title: "Backend Pipeline",
          description: "Set up CI/CD for backend deployment",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "API Documentation",
      activities: [
        {
          title: "Swagger/OpenAPI",
          description: "Create comprehensive API documentation",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    {
      title: "Error Tracking",
      activities: [
        {
          title: "Error Monitoring",
          description: "Implement error tracking systems",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Performance Testing",
      activities: [
        {
          title: "Load Testing",
          description: "Conduct performance and load tests",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    {
      title: "Project Completion",
      activities: [
        {
          title: "Final Deployment",
          description: "Complete and deploy your backend project",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    }
  ]
};
var fullstackPlan = {
  id: generateId(),
  goal: "Master Full Stack Development",
  timePerDay: 180,
  // 3 hours per day
  deadlineDays: 31,
  createdAt: (/* @__PURE__ */ new Date()).toISOString(),
  isPublic: true,
  upvotes: 0,
  dailySchedule: [
    // Week 1: Frontend Fundamentals
    {
      title: "HTML & CSS Basics",
      activities: [
        {
          title: "Web Fundamentals",
          description: "Learn HTML structure and CSS styling",
          icon: ICONS.HTML,
          color: COLORS.HTML,
          progress: 0
        }
      ]
    },
    {
      title: "Responsive Design",
      activities: [
        {
          title: "Mobile-First Design",
          description: "Create responsive layouts",
          icon: ICONS.CSS,
          color: COLORS.CSS,
          progress: 0
        }
      ]
    },
    {
      title: "JavaScript Basics",
      activities: [
        {
          title: "Core JavaScript",
          description: "Learn JavaScript fundamentals",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "DOM Manipulation",
      activities: [
        {
          title: "Dynamic UI",
          description: "Manipulate the DOM with JavaScript",
          icon: ICONS.JavaScript,
          color: COLORS.JavaScript,
          progress: 0
        }
      ]
    },
    {
      title: "React Basics",
      activities: [
        {
          title: "React Components",
          description: "Build React components and props",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "React State",
      activities: [
        {
          title: "State Management",
          description: "Manage state with hooks",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Frontend Testing",
      activities: [
        {
          title: "Component Testing",
          description: "Test React components",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    // Week 2: Backend Fundamentals
    {
      title: "Node.js Basics",
      activities: [
        {
          title: "Server Basics",
          description: "Create Node.js servers",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Express.js",
      activities: [
        {
          title: "Express Framework",
          description: "Build Express.js applications",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Database Design",
      activities: [
        {
          title: "SQL & NoSQL",
          description: "Work with different databases",
          icon: ICONS.Database,
          color: COLORS.Database,
          progress: 0
        }
      ]
    },
    {
      title: "API Development",
      activities: [
        {
          title: "RESTful APIs",
          description: "Create and consume APIs",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    {
      title: "Authentication",
      activities: [
        {
          title: "User Auth",
          description: "Implement authentication",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    {
      title: "Backend Testing",
      activities: [
        {
          title: "API Testing",
          description: "Test backend endpoints",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    {
      title: "Security",
      activities: [
        {
          title: "Web Security",
          description: "Implement security measures",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    // Week 3: Full Stack Integration
    {
      title: "Frontend-Backend",
      activities: [
        {
          title: "Integration",
          description: "Connect frontend and backend",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    {
      title: "State Management",
      activities: [
        {
          title: "Global State",
          description: "Implement Redux or Context",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "Real-time Features",
      activities: [
        {
          title: "WebSockets",
          description: "Add real-time functionality",
          icon: ICONS.Node,
          color: COLORS.Node,
          progress: 0
        }
      ]
    },
    {
      title: "Performance",
      activities: [
        {
          title: "Optimization",
          description: "Optimize application performance",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Deployment",
      activities: [
        {
          title: "Cloud Deploy",
          description: "Deploy full stack application",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Monitoring",
      activities: [
        {
          title: "App Monitoring",
          description: "Monitor application health",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Final Project",
      activities: [
        {
          title: "Full Stack App",
          description: "Build complete web application",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    // Week 4: Advanced Full Stack Topics
    {
      title: "Advanced State",
      activities: [
        {
          title: "State Patterns",
          description: "Implement advanced state management patterns",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    },
    {
      title: "GraphQL API",
      activities: [
        {
          title: "Full Stack GraphQL",
          description: "Build GraphQL APIs with Apollo",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    {
      title: "Microservices",
      activities: [
        {
          title: "Service Architecture",
          description: "Design microservices architecture",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Docker & K8s",
      activities: [
        {
          title: "Containerization",
          description: "Deploy with Docker and Kubernetes",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Full Stack Testing",
      activities: [
        {
          title: "E2E Testing",
          description: "Implement end-to-end testing",
          icon: ICONS.Testing,
          color: COLORS.Testing,
          progress: 0
        }
      ]
    },
    {
      title: "Performance",
      activities: [
        {
          title: "Full Stack Performance",
          description: "Optimize full stack performance",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Security Audit",
      activities: [
        {
          title: "Security Review",
          description: "Conduct security audit and fixes",
          icon: ICONS.Security,
          color: COLORS.Security,
          progress: 0
        }
      ]
    },
    {
      title: "Documentation",
      activities: [
        {
          title: "Project Docs",
          description: "Create comprehensive documentation",
          icon: ICONS.API,
          color: COLORS.API,
          progress: 0
        }
      ]
    },
    {
      title: "Deployment Pipeline",
      activities: [
        {
          title: "CI/CD Setup",
          description: "Set up full stack deployment pipeline",
          icon: ICONS.DevOps,
          color: COLORS.DevOps,
          progress: 0
        }
      ]
    },
    {
      title: "Project Launch",
      activities: [
        {
          title: "Final Launch",
          description: "Launch your full stack application",
          icon: ICONS.React,
          color: COLORS.React,
          progress: 0
        }
      ]
    }
  ]
};
var learningPlans = {
  frontend: frontendPlan,
  backend: backendPlan,
  fullstack: fullstackPlan
};
function getLearningPlan(planType) {
  const plan = learningPlans[planType];
  if (!plan) {
    throw new Error(`Invalid plan type: ${planType}`);
  }
  return {
    ...plan,
    id: generateId(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}

// server/api/deep-dive.ts
async function generateDeepDivePlan(request) {
  const { planType, timePerDay = 120, deadlineDays = 30 } = request;
  const planTypeMap = {
    "frontend": "frontend",
    "backend": "backend",
    "fullstack": "fullstack"
  };
  const mappedPlanType = planTypeMap[planType.toLowerCase()];
  if (!mappedPlanType) {
    throw new Error(`Invalid plan type. Must be one of: ${Object.keys(planTypeMap).join(", ")}`);
  }
  try {
    const plan = getLearningPlan(mappedPlanType);
    return {
      ...plan,
      timePerDay,
      deadlineDays
    };
  } catch (error) {
    console.error("Error generating learning plan:", error);
    throw error;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/courses", (_req, res) => {
    res.json(courses);
  });
  app2.get("/api/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });
  app2.get("/api/learning-paths/public", (_req, res) => {
    res.json(peerPaths);
  });
  app2.post("/api/ai-planner", async (req, res) => {
    try {
      const { goal, timePerDay, deadlineDays, visualLearning, handsOnLearning, readingMaterials } = req.body;
      if (!goal || !timePerDay || !deadlineDays) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const plan = await generateAiLearningPlan({
        goal,
        timePerDay,
        deadlineDays,
        learningPreferences: {
          visualLearning: visualLearning || false,
          handsOnLearning: handsOnLearning || false,
          readingMaterials: readingMaterials || false
        },
        availableCourses: courses
      });
      res.json(plan);
    } catch (error) {
      console.error("Error generating AI learning plan:", error);
      res.status(500).json({
        message: "Failed to generate learning plan",
        error: error.message
      });
    }
  });
  app2.post("/api/deep-dive", async (req, res) => {
    try {
      const { planType, timePerDay, deadlineDays } = req.body;
      if (!planType || !["frontend", "backend", "fullstack"].includes(planType.toLowerCase())) {
        return res.status(400).json({
          message: "Invalid plan type. Must be one of: frontend, backend, fullstack"
        });
      }
      const plan = await generateDeepDivePlan({
        planType,
        timePerDay: timePerDay || 120,
        // Default to 2 hours per day
        deadlineDays: deadlineDays || 31
        // Default to 30 days
      });
      res.json(plan);
    } catch (error) {
      console.error("Error generating deep dive plan:", error);
      res.status(500).json({
        message: "Failed to generate deep dive plan",
        error: error.message
      });
    }
  });
  app2.get("/api/learning-paths/:id", (req, res) => {
    const pathId = parseInt(req.params.id);
    const path3 = peerPaths.find((p) => p.id === pathId);
    if (!path3) {
      return res.status(404).json({ message: "Learning path not found" });
    }
    res.json(path3);
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/client"),
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server }
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const clientDistPath = path2.resolve(import.meta.dirname, "..", "dist", "client");
  if (!fs.existsSync(clientDistPath)) {
    throw new Error(
      `Could not find the client build directory: ${clientDistPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(clientDistPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(clientDistPath, "index.html"));
  });
}

// server/index.ts
import "dotenv/config";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
