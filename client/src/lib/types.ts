// Type definitions for the application

// Course types
export interface Topic {
  name: string;
  emoji: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  duration: number; // in minutes
  durationText: string; // human-readable format (e.g., "1.5 hours")
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: Topic[];
}

// AI Planner types
export interface PlannerFormData {
  goal: string;
  timePerDay: number; // in hours, will be converted to minutes when sent to API
  deadlineDays: number;
  visualLearning?: boolean;
  handsOnLearning?: boolean;
  readingMaterials?: boolean;
}

export interface LearningActivity {
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
}

export interface DailySchedule {
  title: string;
  activities: LearningActivity[];
}

export interface LearningPlan {
  id?: number;
  goal: string;
  timePerDay: number; // in minutes
  deadlineDays: number;
  createdAt?: string;
  isPublic?: boolean;
  createdBy?: number;
  upvotes?: number;
  dailySchedule: DailySchedule[];
}

// Peer paths types
export interface PeerPath {
  id: number;
  title: string;
  url: string;
  author: string;
  timePerDay: number;
  description: string;
  progress: number;
  upvotes: number;
  tags: string[];
}
