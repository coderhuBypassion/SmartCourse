import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema remains the same as the template provided
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Course schema - represents available courses in the catalog
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // duration in minutes
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  topics: text("topics").array().notNull(), // array of topic tags
  emoji: text("emoji").notNull(), // emoji icon for the course
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

// Learning plans schema - represents AI-generated or user-created learning plans
export const learningPlans = pgTable("learning_plans", {
  id: serial("id").primaryKey(),
  goal: text("goal").notNull(),
  timePerDay: integer("time_per_day").notNull(), // in minutes
  deadlineDays: integer("deadline_days").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPublic: boolean("is_public").default(false),
  createdBy: integer("created_by"), // can be null for AI-generated plans
  upvotes: integer("upvotes").default(0),
  planData: text("plan_data").notNull(), // JSON string with plan details
});

export const insertLearningPlanSchema = createInsertSchema(learningPlans).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type LearningPlan = typeof learningPlans.$inferSelect;
export type InsertLearningPlan = z.infer<typeof insertLearningPlanSchema>;
