import { useState } from "react";
import AiPlannerForm from "@/components/ai-planner-form";
import LearningPlanView from "@/components/learning-plan";
import { LearningPlan } from "@/lib/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function AiPlanner() {
  const [showLearningPlan, setShowLearningPlan] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<LearningPlan | null>(null);
  
  const handlePlanGenerated = (plan: LearningPlan) => {
    setCurrentPlan(plan);
    setShowLearningPlan(true);
  };
  
  const handleEditClick = () => {
    setShowLearningPlan(false);
  };

  const handleRefresh = () => {
    setShowLearningPlan(false);
    setCurrentPlan(null);
  };
  
  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Learning Path Planner (All plans are hardcoded for now)
          </h1>
          {showLearningPlan && (
            <Button
              onClick={handleRefresh}
              className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Generate new plan
            </Button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Let our AI build a personalized learning plan based on your goals, available time, and deadline.
        </p>
      </header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showLearningPlan ? (
          <AiPlannerForm onPlanGenerated={handlePlanGenerated} />
        ) : (
          currentPlan && <LearningPlanView plan={currentPlan} onEditClick={handleEditClick} />
        )}
      </motion.div>
    </>
  );
}
