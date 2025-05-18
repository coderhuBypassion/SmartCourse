import { useQuery } from "@tanstack/react-query";
import VisualExplorer from "@/components/visual-explorer";
import { Course } from "@/lib/types";
import { motion } from "framer-motion";

interface VisualExplorerPageProps {
  setActiveTab: (tab: string) => void;
}

export default function VisualExplorerPage({ setActiveTab }: VisualExplorerPageProps) {
  // Fetch courses from the API
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["/api/courses"],
    staleTime: 60 * 1000, // 1 minute
  });

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
        <h2 className="text-xl text-red-500 mb-2">Error loading course data</h2>
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
          Visual Course Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Discover courses based on time commitment and topics in this interactive visualization.
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VisualExplorer courses={courses as Course[]} setActiveTab={setActiveTab} />
      </motion.div>
    </>
  );
}
