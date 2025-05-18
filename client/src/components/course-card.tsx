import { Clock, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Course } from "@/lib/types";
import { useState, useEffect } from "react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if course is bookmarked on component mount
    const bookmarkedCourses = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');
    setIsBookmarked(bookmarkedCourses.some((c: Course) => c.title === course.title));
  }, [course.title]);

  const toggleBookmark = () => {
    const bookmarkedCourses = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');
    
    if (isBookmarked) {
      // Remove course from bookmarks
      const updatedBookmarks = bookmarkedCourses.filter((c: Course) => c.title !== course.title);
      localStorage.setItem('bookmarkedCourses', JSON.stringify(updatedBookmarks));
    } else {
      // Add course to bookmarks
      bookmarkedCourses.push(course);
      localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarkedCourses));
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const difficultyColors = {
    "Beginner": "success",
    "Intermediate": "warning",
    "Advanced": "danger"
  } as const;

  const difficultyVariant = difficultyColors[course.difficulty as keyof typeof difficultyColors] || "default";

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <Badge variant={difficultyVariant}>
              {course.difficulty}
            </Badge>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> 
              {course.durationText}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {course.topics.map((topic, index) => (
              <Badge key={index} variant={topic.name.toLowerCase() as any}>
                {topic.emoji} {topic.name}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {course.description}
          </p>
          
          <div className="flex justify-between items-center">
            <Button 
              onClick={() => window.open(course.url, '_blank')}
              variant="outline"
              size="sm"
              className="rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              View Course
            </Button>
            <Button
              onClick={toggleBookmark}
              variant="ghost"
              size="icon"
              className={`${isBookmarked ? 'text-primary' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-primary`}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
