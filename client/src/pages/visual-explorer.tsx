import VisualExplorer from "@/components/visual-explorer";
import { Course } from "@/lib/types";
import { motion } from "framer-motion";
import { courses } from "@/lib/course-data";

interface VisualExplorerPageProps {
  setActiveTab: (tab: string) => void;
}

export default function VisualExplorerPage({ setActiveTab }: VisualExplorerPageProps) {
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
        <VisualExplorer courses={courses} setActiveTab={setActiveTab} />
      </motion.div>
    </>
  );
}
