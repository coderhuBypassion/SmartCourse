import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course, LearningPlan } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { ZapIcon, BookIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface VisualExplorerProps {
  courses: Course[];
  setActiveTab: (tab: string) => void;
}

type CoursePosition = {
  course: Course;
  x: number;
  y: number;
};

export default function VisualExplorer({ courses, setActiveTab }: VisualExplorerProps) {
  const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { toast } = useToast();
  
  // Add ref for the plan section
  const planRef = useRef<HTMLDivElement>(null);
  
  // Calculate positions for each course based on topic (x) and duration (y)
  const positions = calculatePositions(courses);
  
  const topics = ['Frontend', 'Backend', 'Data Science', 'AI', 'Design'];
  const durations = ['15h+', '10h', '5h', '2h', 'Under 1h'];
  
  // Helper function to scroll to plan
  const scrollToPlan = () => {
    if (planRef.current) {
      planRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Mutations for plan generation
  const fastTrackMutation = useMutation({
    mutationFn: () => {
      // Create a hardcoded frontend learning plan
      const frontendPlan = {
        title: "Fast Track: Frontend Skills",
        courses: [
          {
            id: 1,
            title: "HTML5 Fundamentals",
            duration: 90, // 1.5 hours
            durationText: "1.5 hours",
            description: "Master semantic HTML5 elements, forms, tables, multimedia, and best practices for SEO and accessibility.",
            topics: [{ name: "Frontend" }, { name: "Basics" }],
            outlineTopics: [
              "Semantic Elements (header, nav, main, footer)",
              "Forms & Input Validation",
              "Tables & Lists",
              "Audio & Video Elements",
              "SEO Best Practices"
            ],
            progress: 0
          },
          {
            id: 2,
            title: "Modern CSS & Flexbox/Grid",
            duration: 180, // 3 hours
            durationText: "3 hours",
            description: "Learn modern CSS layouts with Flexbox, Grid, animations, and responsive design techniques.",
            topics: [{ name: "Frontend" }, { name: "Design" }],
            outlineTopics: [
              "Flexbox Layout System",
              "CSS Grid Mastery",
              "Responsive Design & Media Queries",
              "CSS Variables & Custom Properties",
              "Animations & Transitions"
            ],
            progress: 0
          },
          {
            id: 3,
            title: "JavaScript ES6+ Core",
            duration: 120, // 2 hours
            durationText: "2 hours",
            description: "Modern JavaScript features including ES6+ syntax, async programming, and DOM manipulation.",
            topics: [{ name: "Frontend" }, { name: "Interactive" }],
            outlineTopics: [
              "Arrow Functions & Template Literals",
              "Destructuring & Spread Operator",
              "Promises & Async/Await",
              "DOM Manipulation & Events",
              "Local Storage & JSON"
            ],
            progress: 0
          },
          {
            id: 4,
            title: "React.js & Hooks",
            duration: 300, // 5 hours
            durationText: "5 hours",
            description: "Build modern web applications with React.js, focusing on hooks, state management, and routing.",
            topics: [{ name: "Frontend" }, { name: "Framework" }],
            outlineTopics: [
              "Components & JSX",
              "useState & useEffect Hooks",
              "Context API & Custom Hooks",
              "React Router Navigation",
              "Form Handling & Validation"
            ],
            progress: 0
          },
          {
            id: 5,
            title: "Frontend Projects & Portfolio",
            duration: 600, // 10 hours
            durationText: "10 hours",
            description: "Build modern frontend applications focusing on UI/UX, state management, and responsive design.",
            topics: [{ name: "Frontend" }, { name: "Project" }],
            outlineTopics: [
              "Task Management App (React, Local Storage, Drag-n-Drop)",
              "Recipe Finder (API Integration, Search, Filtering)",
              "Weather Dashboard (Geolocation, API, Charts)",
              "Portfolio Website (Animations, Responsive Design)",
              "Blog Platform Frontend (CMS Integration, Markdown)"
            ],
            projectDetails: [
              {
                name: "Task Management App",
                features: [
                  "Drag and drop task organization",
                  "Local storage persistence",
                  "Task categories & priorities",
                  "Due date & reminder system",
                  "Responsive mobile design"
                ]
              },
              {
                name: "Recipe Finder",
                features: [
                  "Recipe search & filtering",
                  "Ingredient-based search",
                  "Favorite recipes system",
                  "Nutrition information display",
                  "Print-friendly recipe cards"
                ]
              },
              {
                name: "Weather Dashboard",
                features: [
                  "Current weather display",
                  "5-day weather forecast",
                  "Location-based weather",
                  "Weather alerts system",
                  "Temperature trend charts"
                ]
              },
              {
                name: "Portfolio Website",
                features: [
                  "Animated page transitions",
                  "Project showcase gallery",
                  "Contact form integration",
                  "Dark/light theme switch",
                  "Responsive grid layout"
                ]
              },
              {
                name: "Blog Platform Frontend",
                features: [
                  "Article preview system",
                  "Markdown editor integration",
                  "Category & tag system",
                  "Social sharing buttons",
                  "Comment section UI"
                ]
              }
            ],
            progress: 0
          }
        ],
        totalDuration: 1290, // 21.5 hours
        timePerDay: 120, // 2 hours per day
        estimatedDays: 11
      };

      return Promise.resolve(frontendPlan);
    },
    onSuccess: (data) => {
      toast({
        title: "Fast Track Plan Created",
        description: "Your personalized frontend learning path is ready."
      });
      setSelectedPlan(data);
      // Add slight delay to ensure the plan is rendered before scrolling
      setTimeout(scrollToPlan, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Plan",
        description: error.message || "Failed to generate learning plan. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const deepDiveMutation = useMutation({
    mutationFn: () => {
      // Create a hardcoded full-stack learning plan
      const fullStackPlan = {
        title: "Deep Dive: Full Stack Development",
        courses: [
          {
            id: 1,
            title: "Advanced HTML5 & Semantics",
            duration: 90, // 1.5 hours
            durationText: "1.5 hours",
            description: "Master modern HTML5 features, accessibility patterns, and SEO best practices.",
            topics: [{ name: "Frontend" }, { name: "Basics" }],
            outlineTopics: [
              "HTML5 Semantic Elements & Best Practices",
              "Web Components & Shadow DOM",
              "ARIA Roles & Accessibility",
              "SEO Optimization Techniques",
              "Browser Storage & Caching"
            ],
            progress: 0
          },
          {
            id: 2,
            title: "Advanced CSS & Animations",
            duration: 180, // 3 hours
            durationText: "3 hours",
            description: "Deep dive into advanced CSS features, animations, and modern layout systems.",
            topics: [{ name: "Frontend" }, { name: "Design" }],
            outlineTopics: [
              "CSS Grid & Subgrid",
              "CSS Custom Properties & Functions",
              "Advanced Animations & Keyframes",
              "CSS Architecture (BEM, SMACSS)",
              "CSS-in-JS & Styled Components"
            ],
            progress: 0
          },
          {
            id: 3,
            title: "JavaScript & TypeScript Mastery",
            duration: 120, // 2 hours
            durationText: "2 hours",
            description: "Advanced JavaScript concepts and TypeScript integration for robust applications.",
            topics: [{ name: "Frontend" }, { name: "Backend" }],
            outlineTopics: [
              "Advanced ES6+ Features",
              "TypeScript Types & Generics",
              "Design Patterns in JS/TS",
              "Memory Management & Performance",
              "Testing with Jest & Cypress"
            ],
            progress: 0
          },
          {
            id: 4,
            title: "React & Next.js Development",
            duration: 300, // 5 hours
            durationText: "5 hours",
            description: "Build scalable applications with React and Next.js framework.",
            topics: [{ name: "Frontend" }, { name: "Framework" }],
            outlineTopics: [
              "Advanced React Patterns",
              "Next.js App Router & SSR",
              "State Management (Redux Toolkit)",
              "Performance Optimization",
              "Server Components & Streaming"
            ],
            progress: 0
          },
          {
            id: 5,
            title: "Node.js & Express Backend",
            duration: 360, // 6 hours
            durationText: "6 hours",
            description: "Build robust backend services with Node.js and Express framework.",
            topics: [{ name: "Backend" }],
            outlineTopics: [
              "RESTful API Design",
              "Authentication & Authorization",
              "Database Integration (SQL/NoSQL)",
              "Error Handling & Logging",
              "API Security Best Practices"
            ],
            progress: 0
          },
          {
            id: 6,
            title: "Database Design & ORM",
            duration: 360, // 6 hours
            durationText: "6 hours",
            description: "Master database design, SQL, and ORM frameworks for data management.",
            topics: [{ name: "Backend" }, { name: "Database" }],
            outlineTopics: [
              "Database Schema Design",
              "SQL Query Optimization",
              "Prisma ORM Integration",
              "Data Migration & Versioning",
              "Caching Strategies"
            ],
            progress: 0
          },
          {
            id: 7,
            title: "DevOps & Deployment",
            duration: 360, // 6 hours
            durationText: "6 hours",
            description: "Learn deployment, CI/CD, and DevOps practices for production applications.",
            topics: [{ name: "DevOps" }],
            outlineTopics: [
              "Docker & Containerization",
              "CI/CD Pipeline Setup",
              "Cloud Deployment (AWS/Vercel)",
              "Monitoring & Logging",
              "Performance Optimization"
            ],
            progress: 0
          },
          {
            id: 8,
            title: "Full-Stack Advanced Projects",
            duration: 360, // 6 hours
            durationText: "6 hours",
            description: "Build complex full-stack applications with advanced features, real-time capabilities, and scalable architecture.",
            topics: [{ name: "Frontend" }, { name: "Backend" }, { name: "Project" }],
            outlineTopics: [
              "Real-time Code Collaboration Platform",
              "E-commerce Platform with Payment",
              "Social Network with Real-time Features",
              "Analytics Dashboard with Data Processing",
              "Multi-user Design Tool"
            ],
            projectDetails: [
              {
                name: "Real-time Code Collaboration Platform",
                features: [
                  "Multi-user code editing (Operational Transform)",
                  "WebSocket-based collaboration",
                  "Code execution in sandboxed environment",
                  "Git integration & version control",
                  "User authentication & project permissions",
                  "Backend code compilation & testing",
                  "Real-time chat & annotations"
                ]
              },
              {
                name: "E-commerce Platform",
                features: [
                  "Product inventory management system",
                  "Stripe payment processing & webhooks",
                  "Order fulfillment workflow",
                  "Admin dashboard with analytics",
                  "User authentication & roles",
                  "Product recommendation engine",
                  "Email notification system"
                ]
              },
              {
                name: "Social Network Platform",
                features: [
                  "Real-time feed & notifications",
                  "Media processing & storage",
                  "Friend/Follow system",
                  "Direct messaging with WebSocket",
                  "Content moderation system",
                  "Activity tracking & analytics",
                  "OAuth & social login"
                ]
              },
              {
                name: "Analytics Dashboard",
                features: [
                  "Real-time data processing pipeline",
                  "Custom visualization engine",
                  "Data export & reporting system",
                  "Multi-tenant architecture",
                  "Role-based access control",
                  "Automated report generation",
                  "Data aggregation & caching"
                ]
              },
              {
                name: "Multi-user Design Tool",
                features: [
                  "Real-time collaborative canvas",
                  "Vector graphics rendering",
                  "Asset management system",
                  "Version control for designs",
                  "Export in multiple formats",
                  "Team collaboration features",
                  "Design template system"
                ]
              }
            ],
            progress: 0
          }
        ],
        totalDuration: 2130, // 35.5 hours
        timePerDay: 150, // 2.5 hours per day
        estimatedDays: 15
      };

      return Promise.resolve(fullStackPlan);
    },
    onSuccess: (data) => {
      toast({
        title: "Deep Dive Plan Created",
        description: "Your comprehensive full-stack learning path is ready."
      });
      setSelectedPlan(data);
      // Add slight delay to ensure the plan is rendered before scrolling
      setTimeout(scrollToPlan, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Plan",
        description: error.message || "Failed to generate learning plan. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Course Explorer</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover courses based on topic and time commitment
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 mb-6">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-5 gap-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-r border-gray-200 dark:border-gray-700 last:border-0" />
              ))}
            </div>
            <div className="absolute inset-0 grid grid-rows-5 gap-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-0" />
              ))}
            </div>
            
            {/* Axes */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
            
            {/* Axis Labels */}
            <div className="absolute bottom-[-40px] left-0 w-full flex justify-between px-4">
              {topics.map((topic, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic}</span>
                  <div className="h-4 w-0.5 bg-gray-300 dark:bg-gray-600 mt-1"></div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-[-48px] h-full flex flex-col justify-between py-4">
              {durations.map((duration, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{duration}</span>
                  <div className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                </div>
              ))}
            </div>
            
            {/* Course Dots */}
            {positions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  bottom: `${pos.y}%`,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onMouseEnter={() => setHoveredCourse(pos.course)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div 
                  className="relative group"
                  style={{ transform: 'translate(-50%, 50%)' }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg transition-all duration-200 group-hover:shadow-xl`}
                    style={{ backgroundColor: getCourseColor(pos.course) }}
                  >
                    {pos.course.title.substring(0, 2)}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 whitespace-nowrap">
                      <p className="font-medium text-sm">{pos.course.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{pos.course.durationText}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Tooltip for hovered course */}
            <AnimatePresence>
              {hoveredCourse && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 z-10 w-64"
                >
                  <h4 className="font-medium text-base mb-1">{hoveredCourse.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {hoveredCourse.durationText} • {hoveredCourse.difficulty}
                  </p>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {hoveredCourse.description}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hoveredCourse.topics.map((topic, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {generateLegendItems().map((item, index) => (
              <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div 
                  className="w-6 h-6 rounded-full mr-2 shadow-sm" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        {/* Course Selection Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6">
          {/* Fast Track Suggestion */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Fast Track: Frontend Skills</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Complete these courses in sequence for essential frontend development skills in just 16.5 hours.
              </p>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                {getFastTrackCourses(courses).map((course, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{course.title} ({course.durationText})</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="text-primary flex items-center"
                  onClick={() => fastTrackMutation.mutate()}
                  disabled={fastTrackMutation.isPending}
                >
                  {fastTrackMutation.isPending ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></div>
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <ZapIcon className="h-4 w-4 mr-2" />
                      Create Fast Track Plan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Deep Dive Suggestion */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Deep Dive: Full Stack Development</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A more comprehensive learning path that covers both frontend and backend skills (29.5 hours total).
              </p>
              <ol className="space-y-3 text-gray-700 dark:text-gray-300">
                {getDeepDiveCourses(courses).map((course, index) => (
                  <li key={index} className="flex items-center">
                    <span className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{course.title} ({course.durationText})</span>
                  </li>
                ))}
                <li className="flex items-center opacity-50">
                  <span className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                    +
                  </span>
                  <span>2 more courses (12h)</span>
                </li>
              </ol>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="text-primary flex items-center"
                  onClick={() => deepDiveMutation.mutate()}
                  disabled={deepDiveMutation.isPending}
                >
                  {deepDiveMutation.isPending ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></div>
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <BookIcon className="h-4 w-4 mr-2" />
                      Create Deep Dive Plan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Message about future paths */}
        <h3 className="text-center pt-2 pb-4 text-gray-600 dark:text-gray-400 mt-6 italic">
          More paths are coming in next updates, stay connected!
        </h3>
      </Card>

      {selectedPlan && (
        <Card className="mt-8" ref={planRef}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{selectedPlan.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Total Duration: {selectedPlan.totalDuration / 60} hours • {selectedPlan.timePerDay / 60} hours per day • {selectedPlan.estimatedDays} days
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                Close Plan
              </Button>
            </div>

            <div className="space-y-6">
              {selectedPlan.courses.map((course: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">
                      {index + 1}. {course.title}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.durationText}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {course.description}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                    <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {course.outlineTopics.map((topic: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {course.projectDetails && (
                    <div className="mt-4 space-y-4">
                      <h4 className="text-sm font-medium">Project Details:</h4>
                      {course.projectDetails.map((project: any, i: number) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                          <h5 className="text-sm font-medium mb-2">{project.name}</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {project.features.map((feature: string, j: number) => (
                              <li key={j} className="text-sm text-gray-600 dark:text-gray-400">
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    {course.topics.map((topic: any, i: number) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

// Helper functions
function calculatePositions(courses: Course[]): CoursePosition[] {
  const topicPositions: { [key: string]: number } = {
    'Frontend': 10,
    'Backend': 30,
    'Data Science': 50, 
    'AI': 80,
    'Design': 70
  };
  
  return courses.map(course => {
    // Find primary topic
    const primaryTopic = course.topics[0].name;
    
    // Calculate x position based on topic
    const x = topicPositions[primaryTopic] || 50;
    
    // Calculate y position based on duration (in minutes)
    // Map duration to position: longer courses are higher (lower y value)
    let y = 10; // default for very long courses
    if (course.duration <= 60) y = 10; // under 1h
    else if (course.duration <= 120) y = 20; // under 2h
    else if (course.duration <= 300) y = 40; // under 5h
    else if (course.duration <= 600) y = 60; // under 10h
    else y = 80; // 10h+
    
    return { course, x, y };
  });
}

function getCourseColor(course: Course): string {
  // Color based on primary topic
  const topicColors: { [key: string]: string } = {
    'HTML': '#3B82F6', // blue
    'CSS': '#8B5CF6', // purple
    'JavaScript': '#F59E0B', // yellow
    'React': '#EC4899', // pink
    'Node.js': '#10B981', // emerald
    'Python': '#06B6D4', // cyan
    'AI': '#6366F1', // indigo
    // Default colors for other topics
    'Frontend': '#3B82F6',
    'Backend': '#10B981',
    'Data Science': '#06B6D4',
    'Design': '#8B5CF6' // purple
  };
  
  // Try to match by title first
  for (const [keyword, color] of Object.entries(topicColors)) {
    if (course.title.includes(keyword)) {
      return color;
    }
  }
  
  // Fall back to primary topic
  const primaryTopic = course.topics[0].name;
  return topicColors[primaryTopic] || '#6366F1';
}

function generateLegendItems() {
  return [
    { color: '#3B82F6', label: 'HTML' },
    { color: '#8B5CF6', label: 'CSS' },
    { color: '#F59E0B', label: 'JavaScript' },
    { color: '#EC4899', label: 'React' },
    { color: '#10B981', label: 'Projects' },
    { color: '#6366F1', label: 'AI' },
    { color: '#10B981', label: 'Backend' },
    { color: '#06B6D4', label: 'Data Science' }
  ];
}

function getFastTrackCourses(courses: Course[]): Course[] {
  // Filter frontend-related courses and sort by a logical learning sequence
  const frontendTitles = [
    'HTML Crash Course',
    'CSS in Depth',
    'JavaScript Basics',
    'React for Beginners',
    'Project-based Frontend Dev'
  ];
  
  return frontendTitles
    .map(title => courses.find(course => course.title === title))
    .filter((course): course is Course => course !== undefined);
}

function getDeepDiveCourses(courses: Course[]): Course[] {
  // Get both frontend and backend courses for a full stack path
  const fullStackTitles = [
    'HTML Crash Course',
    'CSS in Depth',
    'JavaScript Basics',
    'React for Beginners',
    'Node.js Essentials'
  ];
  
  return fullStackTitles
    .map(title => courses.find(course => course.title === title))
    .filter((course): course is Course => course !== undefined);
}
