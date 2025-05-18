import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PeerPath } from "@/lib/types";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PeerPathCardProps {
  path: PeerPath;
  setActiveTab: (tab: string) => void;
}

export default function PeerPathCard({ path, setActiveTab }: PeerPathCardProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClone = () => {
    setActiveTab("ai-planner");
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{path.title}</h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center cursor-help">
                    <ArrowUp className="text-green-500 mr-1 h-4 w-4" />
                    <span>{path.upvotes}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of learners who found this path helpful</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <User className="h-4 w-4 mr-1" />
              <span>{path.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{path.timePerDay}h/day</span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {path.description}
          </p>
          
          <div className="mb-4">
            <div className="flex items-center mb-1 justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Path Progress</span>
              <span className="text-xs font-medium">{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-1.5" />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {path.tags.map((tag, index) => (
              <Badge key={index} variant={tag.toLowerCase() as any}>
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm" 
              className="text-primary border-primary/30 hover:bg-primary/10"
              onClick={ () => window.open(path.url, '_blank') }
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current"></div>
                  Loading...
                </>
              ) : (
                "View Path"
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-secondary border-secondary/30 hover:bg-secondary/10"
              onClick={handleClone}
            >
              Clone & Modify
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
