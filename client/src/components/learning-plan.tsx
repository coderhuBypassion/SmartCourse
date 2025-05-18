import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PrinterIcon, Share2Icon, PencilIcon, SaveIcon, Check, CheckCircle, Link as LinkIcon, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { LearningPlan, DailySchedule } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface LearningPlanViewProps {
  plan: LearningPlan;
  onEditClick: () => void;
}

interface DayScheduleProps {
  day: DailySchedule;
  dayNumber: number;
}

interface Resource {
  title: string;
  url: string;
}

function getResourcesByPlanType(goal: string): Resource[] {
  const goalLower = goal.toLowerCase();
  
  if (goalLower.includes('backend') || goalLower.includes('server') || goalLower.includes('api')) {
    return [
      { title: 'Node.js Documentation', url: 'https://nodejs.org/docs/latest' },
      { title: 'Backend Developer Roadmap 2024', url: 'https://roadmap.sh/backend' },
      { title: 'GitHub: Backend Project Ideas', url: 'https://github.com/search?q=Backend%20Project%20Ideas&type=repositories' },
      { title: 'Backend Weekly Newsletter', url: 'https://newsletter.masteringbackend.com/' }
    ];
  } else if (goalLower.includes('fullstack') || goalLower.includes('full stack') || 
            (goalLower.includes('frontend') && goalLower.includes('backend'))) {
    return [
      { title: 'Full Stack Open 2024', url: 'https://fullstackopen.com/' },
      { title: 'MERN Stack Guide', url: 'https://roadmap.sh/full-stack' },
      { title: 'GitHub: Full Stack Projects', url: 'https://github.com/search?q=Full%20Stack%20Projects&type=repositories' },
      { title: 'Full Stack Weekly', url: 'https://fullstackbulletin.com' }
    ];
  } else {
    // Default to frontend resources
    return [
      { title: 'MDN Web Docs: Frontend Basics', url: 'https://developer.mozilla.org/docs/Web' },
      { title: 'Frontend Developer Roadmap 2024', url: 'https://roadmap.sh/frontend' },
      { title: 'GitHub: Frontend Project Ideas', url: 'https://github.com/search?q=frontend%20Project%20Ideas&type=repositories' },
      { title: 'Frontend Weekly Newsletter', url: 'https://www.frontendweekly.co' }
    ];
  }
}

export default function LearningPlanView({ plan, onEditClick }: LearningPlanViewProps) {
  const [expandedDays, setExpandedDays] = useState(3); // Show first 3 days by default
  const [savedPlans, setSavedPlans] = useLocalStorage<LearningPlan[]>("saved-plans", []);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const isPlanSaved = savedPlans.some(savedPlan => 
    savedPlan.goal === plan.goal && 
    savedPlan.timePerDay === plan.timePerDay &&
    savedPlan.deadlineDays === plan.deadlineDays
  );
  
  const resources = getResourcesByPlanType(plan.goal);
  
  const savePlan = () => {
    if (!isPlanSaved) {
      setSavedPlans([...savedPlans, plan]);
    }
  };
  
  const sharePlan = () => {
    // In a real app, this would generate a shareable URL
    alert("This would share your plan with a unique URL in a production app!");
  };
  
  const printPlan = () => {
    // Expand all days before printing and wait for state to update
    setExpandedDays(plan.dailySchedule.length);
    
    setTimeout(() => {
      // Add print-specific styles
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          /* Reset page settings */
          @page {
            size: A4;
            margin: 1.5cm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 10pt;
              font-family: system-ui;
              color: #666;
            }
            @top-center {
              content: "${plan.goal}";
              font-size: 10pt;
              font-family: system-ui;
              color: #666;
            }
          }

          /* Hide non-essential elements */
          button, .no-print {
            display: none !important;
          }
          
          /* Global print styles */
          body {
            font-family: system-ui, -apple-system, sans-serif !important;
            line-height: 1.5;
            color: #000 !important;
            background: #fff !important;
          }
      `;
      document.head.appendChild(style);
      
      // Create print header with more details
      const header = document.createElement('div');
      header.className = 'print-header';
      header.innerHTML = `
        <h1>${plan.goal}</h1>
        <p><strong>Daily Commitment:</strong> ${plan.timePerDay / 60} hours per day</p>
        <p><strong>Duration:</strong> ${plan.deadlineDays} days</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
      `;

      // Calculate overall progress
      const totalActivities = plan.dailySchedule.reduce((acc, day) => acc + day.activities.length, 0);
      const completedActivities = plan.dailySchedule.reduce((acc, day) => {
        return acc + day.activities.filter(activity => activity.progress > 0).length;
      }, 0);
      const overallProgress = Math.round((completedActivities / totalActivities) * 100) || 0;

      // Create level bar
      const levelBar = document.createElement('div');
      levelBar.className = 'level-bar-container';

      // Insert header and level bar
      document.body.insertBefore(header, document.body.firstChild);
      document.body.insertBefore(levelBar, header.nextSibling);

      // Add classes for print styling
      const dayCards = document.querySelectorAll('.relative.pl-14');
      dayCards.forEach((card) => {
        card.classList.add('day-card');
      });

      const activities = document.querySelectorAll('.flex.items-start.gap-3');
      activities.forEach(activity => activity.classList.add('activity'));

      const progressBars = document.querySelectorAll('.progress-container');
      progressBars.forEach(bar => {
        bar.classList.add('progress-container');
        // Enhance progress bar
        const progress = bar.querySelector('[role="progressbar"]');
        if (progress) {
          const value = progress.getAttribute('aria-valuenow') || '0';
          progress.innerHTML = `
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${value}%"></div>
            </div>
            <div class="progress-text">${value}% Complete</div>
          `;
        }
      });

      // Add resources section at the end
      const resources = document.createElement('div');
      resources.className = 'resources-section';
      resources.innerHTML = `
        <h3>Additional Learning Resources</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${getResourcesByPlanType(plan.goal).map(resource => `
            <li class="resource-link">
              <a href="${resource.url}" target="_blank">📚 ${resource.title}</a>
            </li>
          `).join('')}
        </ul>
      `;
      document.body.appendChild(resources);

      // Add footer
      const footer = document.createElement('div');
      footer.className = 'print-footer';
      footer.innerHTML = `
        <p>Access your digital learning plan at any time</p>
      `;
      document.body.appendChild(footer);
      
      // Print the document
      window.print();
      
      // Cleanup
      document.head.removeChild(style);
      document.body.removeChild(header);
      document.body.removeChild(levelBar);
      document.body.removeChild(resources);
      document.body.removeChild(footer);
      
      // Remove added classes and elements
      dayCards.forEach(card => {
        card.classList.remove('day-card');
      });
      activities.forEach(activity => activity.classList.remove('activity'));
      progressBars.forEach(bar => bar.classList.remove('progress-container'));
      
      // Reset expanded days after printing
      setTimeout(() => {
        setExpandedDays(3); // Reset to default view
      }, 500);
    }, 100); // Wait 100ms for the state to update and render all days
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero section with illustration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl shadow-md p-8 mb-8 flex flex-col md:flex-row items-center gap-8 no-print"
      >
        {/* Using a placeholder image for students collaborating */}
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
          alt="Students collaborating on a learning project" 
          className="rounded-xl shadow-lg w-full md:w-1/2 h-auto object-cover"
        />
        
        <div>
          <Badge className="mb-4">✨ Your Learning Path</Badge>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.goal}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            A personalized learning journey created just for you. Follow this path to achieve your goal efficiently.
          </p>
          <div className="mt-4 flex items-center">
            <Clock className="text-primary mr-2 h-5 w-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {plan.timePerDay / 60} hours per day · {plan.deadlineDays} days
            </span>
          </div>
        </div>
      </motion.div>
      
      {/* Learning Plan Timeline */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Your Daily Schedule</h3>
            <div className="flex gap-2 no-print">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={printPlan}
                className="flex items-center"
              >
                <PrinterIcon className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={sharePlan}
                className="flex items-center"
              >
                <Share2Icon className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 timeline-line"></div>
            
            {/* Show all days when printing or within expandedDays limit */}
            {plan.dailySchedule.map((day, index) => (
              (isPrinting || index < expandedDays) && (
                <DaySchedule key={index} day={day} dayNumber={index + 1} />
              )
            ))}
            
            {/* View More Days Button - hide in print */}
            {!isPrinting && expandedDays < plan.dailySchedule.length && (
              <div className="relative pl-14 text-center mt-4 no-print">
                <Button 
                  variant="outline"
                  onClick={() => setExpandedDays(plan.dailySchedule.length)}
                >
                  View All {plan.dailySchedule.length} Days
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Motivation and Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Motivation Tips */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Stay Motivated</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 flex-shrink-0 h-5 w-5" />
                <span>Track your progress daily for a sense of accomplishment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 flex-shrink-0 h-5 w-5" />
                <span>Join a learning community to share your journey</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 flex-shrink-0 h-5 w-5" />
                <span>Build small projects alongside your learning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary mr-2 flex-shrink-0 h-5 w-5" />
                <span>Celebrate your milestones with small rewards</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Additional Resources */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Helpful Resources</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {resources.map((resource, index) => (
                <li key={index} className="flex items-start">
                  <LinkIcon className="text-secondary mr-2 flex-shrink-0 h-5 w-5" />
                  <a href={resource.url} className="hover:text-primary dark:hover:text-primary transition">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button 
          onClick={savePlan} 
          disabled={isPlanSaved}
          className="flex items-center"
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          {isPlanSaved ? 'Plan Saved' : 'Save Learning Plan'}
        </Button>
        <Button 
          variant="secondary" 
          onClick={sharePlan}
          className="flex items-center"
        >
          <Share2Icon className="mr-2 h-4 w-4" />
          Share Plan
        </Button>
        <Button 
          variant="outline" 
          onClick={onEditClick}
          className="flex items-center"
        >
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit Goal
        </Button>
      </div>
    </div>
  );
}

// Helper Components

function DaySchedule({ day, dayNumber }: DayScheduleProps) {
  return (
    <div className="relative pl-14 pb-8">
      <div className="absolute left-0 rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center font-medium">
        {dayNumber}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        <h4 className="font-medium text-lg mb-2">Day {dayNumber}: {day.title}</h4>
        <div className="space-y-3">
          {day.activities.map((activity, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${
                index < day.activities.length - 1 ? 'pb-3 border-b border-gray-200 dark:border-gray-700' : ''
              }`}
            >
              <div 
                className={`flex-shrink-0 w-12 h-12 bg-${activity.color}-100 dark:bg-${activity.color}-900 rounded-lg flex items-center justify-center`}
              >
                <span className={`material-icons text-${activity.color}-500 dark:text-${activity.color}-300 text-2xl`}>
                  {activity.icon}
                </span>
              </div>
              <div className="flex-1">
                <h5 className="font-medium">{activity.title}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                <div className="mt-2 flex items-center">
                  <Progress value={activity.progress} className="w-24 h-2" />
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {activity.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
