import { Course, LearningPlan } from "../../client/src/lib/types";
import { getLearningPlan, PlanType } from "../lib/learning-plans";

interface DeepDiveRequest {
  planType: string;
  timePerDay?: number; // in minutes
  deadlineDays?: number;
}

export async function generateDeepDivePlan(request: DeepDiveRequest): Promise<LearningPlan> {
  const { planType, timePerDay = 120, deadlineDays = 30 } = request;
  
  // Map the request planType to our hardcoded plan types
  const planTypeMap: Record<string, PlanType> = {
    'frontend': 'frontend',
    'backend': 'backend',
    'fullstack': 'fullstack'
  };
  
  const mappedPlanType = planTypeMap[planType.toLowerCase()];
  if (!mappedPlanType) {
    throw new Error(`Invalid plan type. Must be one of: ${Object.keys(planTypeMap).join(', ')}`);
  }
  
  try {
    // Get the hardcoded learning plan
    const plan = getLearningPlan(mappedPlanType);
    
    // Update the plan with the requested time and deadline
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