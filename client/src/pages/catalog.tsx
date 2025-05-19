import { useState } from "react";
import CourseCard from "@/components/course-card";
import FilterSection from "@/components/filter-section";
import { Course } from "@/lib/types";
import { motion } from "framer-motion";
import { courses } from "@/lib/course-data";

export default function Catalog() {
  const [topicFilter, setTopicFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  
  // Filter courses based on selected filters
  const filteredCourses = filterCourses(courses, topicFilter, timeFilter);
  
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
  
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Course Catalog</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Discover courses tailored to your learning needs. Filter by topic and time commitment.
        </p>
      </header>
      
      <FilterSection 
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      
      {filteredCourses.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl mb-2">No courses match your filters</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filter criteria to see more courses.
          </p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}

// Helper function to filter courses
function filterCourses(courses: Course[], topicFilter: string, timeFilter: string): Course[] {
  return courses.filter(course => {
    // Filter by topic
    if (topicFilter !== "all") {
      const hasMatchingTopic = course.topics.some(
        topic => topic.name.toLowerCase() === topicFilter
      );
      if (!hasMatchingTopic) return false;
    }
    
    // Filter by time
    if (timeFilter !== "all") {
      const duration = course.duration; // in minutes
      
      if (timeFilter === "under2" && duration > 120) return false;
      if (timeFilter === "2to5" && (duration < 120 || duration > 300)) return false;
      if (timeFilter === "5to10" && (duration < 300 || duration > 600)) return false;
      if (timeFilter === "over10" && duration < 600) return false;
    }
    
    return true;
  });
}
