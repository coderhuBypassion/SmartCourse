import { Course } from './types';

// Initial course data for the application
export const courses: Course[] = [
  {
    id: 1,
    title: 'HTML Crash Course',
    description: 'Learn the fundamentals of HTML to build the structure of web pages. Perfect for absolute beginners.',
    duration: 90, // 1.5 hours in minutes
    durationText: '1.5 hours',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
    topics: [
      { name: 'Frontend', emoji: '🖥️' },
      { name: 'Basics', emoji: '🔰' }
    ]
  },
  {
    id: 2,
    title: 'CSS in Depth',
    description: 'Master CSS with advanced styling techniques, flexbox, grid, and responsive design patterns.',
    duration: 180, // 3 hours in minutes
    durationText: '3 hours',
    difficulty: 'Intermediate',
    url: 'https://youtu.be/r1xBCi5SOjw?si=bd77esq029FHMslS',
    topics: [
      { name: 'Frontend', emoji: '🖥️' },
      { name: 'Design', emoji: '🎨' }
    ]
  },
  {
    id: 3,
    title: 'JavaScript Basics',
    description: 'Introduction to JavaScript programming with hands-on exercises to build interactive websites.',
    duration: 120, // 2 hours in minutes
    durationText: '2 hours',
    difficulty: 'Beginner',
    url: 'https://youtu.be/PkZNo7MFNFg?si=vS6EBNH6-g3TvWQF',
    topics: [
      { name: 'Frontend', emoji: '🖥️' },
      { name: 'Interactive', emoji: '⚡' }
    ]
  },
  {
    id: 4,
    title: 'React for Beginners',
    description: 'Learn to build modern web applications with React.js. Includes state management and routing.',
    duration: 300, // 5 hours in minutes
    durationText: '5 hours',
    difficulty: 'Intermediate',
    url: 'https://youtu.be/DLX62G4lc44?si=J1szKCIg9qVMv6td',
    topics: [
      { name: 'Frontend', emoji: '🖥️' },
      { name: 'Framework', emoji: '⚛️' }
    ]
  },
  {
    id: 5,
    title: 'Project-based Frontend Dev',
    description: 'Build real-world projects from scratch using modern frontend technologies like React, Redux, and CSS-in-JS.',
    duration: 600, // 10 hours in minutes
    durationText: '10 hours',
    difficulty: 'Advanced',
    url: 'https://www.youtube.com/playlist?list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR',
    topics: [
      { name: 'Frontend', emoji: '🖥️' },
      { name: 'Project', emoji: '🚀' }
    ]
  },
  {
    id: 6,
    title: 'AI Fundamentals',
    description: 'Introduction to artificial intelligence concepts, machine learning basics, and neural networks.',
    duration: 480, // 8 hours in minutes
    durationText: '8 hours',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/playlist?list=PLOspHqNVtKADfxkuDuHduUkDExBpEt3DF',
    topics: [
      { name: 'AI', emoji: '🤖' },
      { name: 'Data Science', emoji: '📊' }
    ]
  },
  {
    id: 7,
    title: 'Node.js Essentials',
    description: 'Learn server-side JavaScript with Node.js to build scalable backend services and APIs.',
    duration: 360, // 6 hours in minutes
    durationText: '6 hours',
    difficulty: 'Intermediate',
    url: 'https://www.youtube.com/playlist?list=PLpc_YvcwbxaRl8WOTamrAD78jnsuNqM1C',
    topics: [
      { name: 'Backend', emoji: '🖧' },
      { name: 'JavaScript', emoji: '⚡' }
    ]
  },
  {
    id: 8,
    title: 'Python Data Science',
    description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
    duration: 240, // 4 hours in minutes
    durationText: '4 hours',
    difficulty: 'Intermediate',
    url: 'https://youtu.be/LHBE6Q9XlzI?si=xRjovhYLNwQ2IKih',
    topics: [
      { name: 'Data Science', emoji: '📊' },
      { name: 'Python', emoji: '🐍' }
    ]
  },
  {
    id: 9,
    title: 'UX/UI Design Principles',
    description: 'Master the fundamentals of user experience and interface design with practical examples.',
    duration: 150, // 2.5 hours in minutes
    durationText: '2.5 hours',
    difficulty: 'Beginner',
    url: 'https://www.youtube.com/live/BU_afT-aIn0?si=we5MuDZKsrENOLqP',
    topics: [
      { name: 'Design', emoji: '🎨' },
      { name: 'UI', emoji: '🖌️' }
    ]
  }
];

// Sample peer paths for the application
export const peerPaths = [
  {
    id: 1,
    title: 'Frontend in 4 Weeks',
    author: '@webdev_jane',
    timePerDay: 1.5,
    description: 'A practical path focusing on modern frontend technologies with mini-projects along the way. Perfect for visual learners.',
    progress: 87,
    upvotes: 243,
    url: 'https://roadmap.sh/frontend',
    tags: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: 2,
    title: 'AI Developer Roadmap',
    author: '@ai_enthusiast',
    timePerDay: 2,
    description: 'From Python basics to advanced machine learning concepts. This path was created by an AI researcher with beginners in mind.',
    progress: 65,
    upvotes: 187,
    url: 'https://roadmap.sh/ai-engineer',
    tags: ['Python', 'Data Science', 'Machine Learning']
  },
  {
    id: 3,
    title: 'Fullstack Bootcamp Alternative',
    author: '@code_master',
    timePerDay: 3,
    description: 'Save $15,000 and learn the same content as a bootcamp. This 12-week path covers frontend, backend, and deployment.',
    progress: 42,
    upvotes: 156,
    url: 'https://roadmap.sh/full-stack',
    tags: ['Frontend', 'Backend', 'Project', 'Career']
  },
  {
    id: 4,
    title: 'UX/UI Designer in 60 Days',
    author: '@design_guru',
    timePerDay: 2,
    description: 'Start with fundamentals and progress to advanced UX/UI concepts. Includes practical exercises and portfolio-building projects.',
    progress: 74,
    upvotes: 129,
    url: 'https://roadmap.sh/ux-design',
    tags: ['UX Design', 'UI Design', 'Figma', 'Portfolio']
  }
];
