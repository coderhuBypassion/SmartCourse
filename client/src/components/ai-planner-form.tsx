import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Brain } from "lucide-react";
import { PlannerFormData } from "@/lib/types";
import { getLearningPlan, PlanType } from "../../../server/lib/learning-plans";

const plannerSchema = z.object({
  goal: z.string().min(5, "Goal must be at least 5 characters"),
  timePerDay: z.coerce.number()
    .min(0.5, "Time must be at least 0.5 hours")
    .max(12, "Time must be at most 12 hours"),
  deadlineDays: z.coerce.number()
    .min(1, "Deadline must be at least 1 day")
    .max(365, "Deadline must be at most 365 days"),
  visualLearning: z.boolean().default(false),
  handsOnLearning: z.boolean().default(false),
  readingMaterials: z.boolean().default(false)
});

interface AiPlannerFormProps {
  onPlanGenerated: (plan: any) => void;
}

export default function AiPlannerForm({ onPlanGenerated }: AiPlannerFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof plannerSchema>>({
    resolver: zodResolver(plannerSchema),
    defaultValues: {
      goal: "",
      timePerDay: 2,
      deadlineDays: 31,
      visualLearning: false,
      handsOnLearning: false,
      readingMaterials: false
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: PlannerFormData) => {
      // Map the goal to a plan type
      const goalLower = formData.goal.toLowerCase();
      let planType: PlanType = 'frontend'; // default
      
      if (goalLower.includes('backend') || goalLower.includes('server') || goalLower.includes('api')) {
        planType = 'backend';
      } else if (goalLower.includes('fullstack') || goalLower.includes('full stack') || 
                (goalLower.includes('frontend') && goalLower.includes('backend'))) {
        planType = 'fullstack';
      }
      
      // Get the hardcoded learning plan
      const plan = getLearningPlan(planType);
      
      // Update the plan with user's preferences
      return {
        ...plan,
        timePerDay: formData.timePerDay * 60, // Convert to minutes
        deadlineDays: formData.deadlineDays
      };
    },
    onSuccess: (data) => {
      onPlanGenerated(data);
    },
    onError: (error) => {
      toast({
        title: "Error generating plan",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: z.infer<typeof plannerSchema>) => {
    mutate(data);
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-md max-w-3xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">Create Your Learning Plan</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your learning goal?</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Only write Frontend / Backend / Fullstack"
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific about what you want to learn or build
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timePerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours available per day</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0.5}
                      max={12}
                      step={0.5}
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormDescription>
                    Be realistic about your availability
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadlineDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline (This is currently hardcoded to 31 days)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={1}
                      max={365}
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormDescription>
                    When do you need to achieve your goal?
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-primary text-white flex items-center hover:bg-primary/90 rounded-xl"
              >
                <Brain className="mr-2 h-4 w-4" />
                {isPending ? 'Generating...' : 'Generate AI Plan'}
              </Button>
            </div>
          </form>
        </Form>
        
        {/* Learning Style Preferences (Optional) */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
            Advanced Options
          </h3>
          <details 
            className="text-sm text-gray-700 dark:text-gray-300"
            open={showAdvanced}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <summary className="cursor-pointer hover:text-primary dark:hover:text-primary mb-2">
              Learning Style Preferences
            </summary>
            <div className="pl-4 pt-2 space-y-2">
              <FormField
                control={form.control}
                name="visualLearning"
                render={({ field }) => (
                  <div className="flex items-center">
                    <Checkbox
                      id="visual-learning"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="visual-learning" className="ml-2">
                      I learn best with visual content
                    </label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="handsOnLearning"
                render={({ field }) => (
                  <div className="flex items-center">
                    <Checkbox
                      id="hands-on"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="hands-on" className="ml-2">
                      I prefer hands-on projects
                    </label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="readingMaterials"
                render={({ field }) => (
                  <div className="flex items-center">
                    <Checkbox
                      id="reading"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="reading" className="ml-2">
                      I enjoy in-depth reading materials
                    </label>
                  </div>
                )}
              />
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
}
