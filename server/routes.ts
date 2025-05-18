import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { courses, peerPaths } from "../client/src/lib/course-data";
import { generateAiLearningPlan } from "./api/ai-planner";
import { generateDeepDivePlan } from "./api/deep-dive";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for the SmartCourse application
  
  // Courses API
  app.get("/api/courses", (_req, res) => {
    res.json(courses);
  });
  
  app.get("/api/courses/:id", (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.json(course);
  });
  
  // Learning Paths API
  app.get("/api/learning-paths/public", (_req, res) => {
    res.json(peerPaths);
  });
  
  // AI Planner API - Generates personalized learning paths
  app.post("/api/ai-planner", async (req, res) => {
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
        error: (error as Error).message 
      });
    }
  });
  
  // Deep Dive API - Generates specialized learning paths
  app.post("/api/deep-dive", async (req, res) => {
    try {
      const { planType, timePerDay, deadlineDays } = req.body;
      
      if (!planType || !['frontend', 'backend', 'fullstack'].includes(planType.toLowerCase())) {
        return res.status(400).json({ 
          message: "Invalid plan type. Must be one of: frontend, backend, fullstack" 
        });
      }
      
      const plan = await generateDeepDivePlan({
        planType,
        timePerDay: timePerDay || 120, // Default to 2 hours per day
        deadlineDays: deadlineDays || 31 // Default to 30 days
      });
      
      res.json(plan);
    } catch (error) {
      console.error("Error generating deep dive plan:", error);
      res.status(500).json({ 
        message: "Failed to generate deep dive plan",
        error: (error as Error).message 
      });
    }
  });
  
  // Get specific peer path details
  app.get("/api/learning-paths/:id", (req, res) => {
    const pathId = parseInt(req.params.id);
    const path = peerPaths.find(p => p.id === pathId);
    
    if (!path) {
      return res.status(404).json({ message: "Learning path not found" });
    }
    
    res.json(path);
  });

  const httpServer = createServer(app);
  return httpServer;
}
