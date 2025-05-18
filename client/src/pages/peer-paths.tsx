import { lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import PeerPathCard from "@/components/peer-path-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, Share2Icon } from "lucide-react";
import { PeerPath } from "@/lib/types";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const AiPlanner = lazy(() => import("@/pages/ai-planner"));

interface PeerPathsProps {
  setActiveTab: (tab: string) => void;
}

export default function PeerPaths({ setActiveTab }: PeerPathsProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Fetch peer paths from the API
  const { data: peerPaths = [], isLoading, error } = useQuery({
    queryKey: ["/api/learning-paths/public"],
    staleTime: 60 * 1000, // 1 minute
  });
  
  const handleCreateNewPath = () => {
    setActiveTab("ai-planner");
  };
  
  const handleSharePath = () => {
    toast({
      title: "Coming Soon",
      description: "The ability to share your personal learning paths will be available soon!",
    });
  };

  // Animation variants for the list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  // Animation variants for individual items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl text-red-500 mb-2">Error loading peer paths</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {(error as Error).message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Peer-Picked Learning Paths
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Discover learning paths created and upvoted by other learners in the community.
        </p>
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(peerPaths as PeerPath[]).map((path) => (
          <motion.div key={path.id} variants={itemVariants}>
            <PeerPathCard path={path} setActiveTab={setActiveTab} />
          </motion.div>
        ))}
      </motion.div>

      {/* Create and Share Your Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Group of students collaborating */}
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Group of students collaborating on learning paths" 
                className="rounded-xl shadow-md w-full md:w-1/3 h-auto object-cover"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Share Your Learning Journey</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Created a learning path that worked for you? Share it with the community to help others achieve their goals faster.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="flex items-center"
                    onClick={handleCreateNewPath}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create New Path
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="flex items-center"
                    onClick={handleSharePath}
                  >
                    <Share2Icon className="mr-2 h-4 w-4" />
                    Share My Path
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
