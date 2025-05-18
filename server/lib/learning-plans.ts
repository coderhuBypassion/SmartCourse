import { LearningPlan, DailySchedule, LearningActivity } from "../../client/src/lib/types";
import { generateId } from "../../client/src/lib/utils";

// Common icons and colors for activities
const ICONS = {
  HTML: 'code',
  CSS: 'palette',
  JavaScript: 'javascript',
  React: 'code',
  Node: 'terminal',
  Database: 'smart_toy',
  API: 'design_services',
  DevOps: 'terminal',
  Testing: 'code',
  Security: 'smart_toy'
} as const;

const COLORS = {
  HTML: 'blue',
  CSS: 'purple',
  JavaScript: 'yellow',
  React: 'pink',
  Node: 'indigo',
  Database: 'emerald',
  API: 'teal',
  DevOps: 'blue',
  Testing: 'purple',
  Security: 'emerald'
} as const;

// Frontend Development Plan
const frontendPlan: LearningPlan = {
  id: generateId(),
  goal: "Master Frontend Development",
  timePerDay: 120, // 2 hours per day
  deadlineDays: 31,
  createdAt: new Date().toISOString(),
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

// Backend Development Plan
const backendPlan: LearningPlan = {
  id: generateId(),
  goal: "Master Backend Development",
  timePerDay: 120, // 2 hours per day
  deadlineDays: 31,
  createdAt: new Date().toISOString(),
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

// Full Stack Development Plan
const fullstackPlan: LearningPlan = {
  id: generateId(),
  goal: "Master Full Stack Development",
  timePerDay: 180, // 3 hours per day
  deadlineDays: 31,
  createdAt: new Date().toISOString(),
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

export const learningPlans = {
  frontend: frontendPlan,
  backend: backendPlan,
  fullstack: fullstackPlan
} as const;

export type PlanType = keyof typeof learningPlans;

export function getLearningPlan(planType: PlanType): LearningPlan {
  const plan = learningPlans[planType];
  if (!plan) {
    throw new Error(`Invalid plan type: ${planType}`);
  }
  return {
    ...plan,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
} 