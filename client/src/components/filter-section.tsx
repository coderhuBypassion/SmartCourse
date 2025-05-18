import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterSectionProps {
  topicFilter: string;
  setTopicFilter: (filter: string) => void;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
}

export default function FilterSection({ 
  topicFilter, 
  setTopicFilter, 
  timeFilter, 
  setTimeFilter 
}: FilterSectionProps) {
  const topics = [
    { id: 'all', label: 'All Topics' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai', label: 'AI' },
    { id: 'datascience', label: 'Data Science' },
    { id: 'design', label: 'Design' }
  ];
  
  const durations = [
    { id: 'all', label: 'All Durations' },
    { id: 'under2', label: 'Under 2h' },
    { id: '2to5', label: '2–5h' },
    { id: '5to10', label: '5–10h' },
    { id: 'over10', label: '10h+' }
  ];
  
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topic
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setTopicFilter(topic.id)}
                  className={`badge transition-all duration-200 ${
                    topicFilter === topic.id
                      ? 'badge-primary'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Time
            </label>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <button
                  key={duration.id}
                  onClick={() => setTimeFilter(duration.id)}
                  className={`badge transition-all duration-200 ${
                    timeFilter === duration.id
                      ? 'badge-secondary'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
