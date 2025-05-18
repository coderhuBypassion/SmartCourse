import { ThemeToggle } from "./theme-toggle";
import { X, School, Brain, Compass, Users } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab 
}: SidebarProps) {
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };
  
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:sticky md:top-0 md:h-screen`}
    >
      <div className="flex flex-col h-full bg-card text-card-foreground shadow-lg md:shadow-none overflow-y-auto">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-2">
            <span className="text-primary text-2xl">📚</span>
            <h1 className="text-xl font-semibold text-foreground">SmartCourse</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handleTabClick('catalog')} 
                className={`w-full flex items-center px-4 py-2 rounded-xl font-medium transition duration-200 ${
                  activeTab === 'catalog' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <School className="mr-3 h-5 w-5" />
                Course Catalog
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabClick('ai-planner')} 
                className={`w-full flex items-center px-4 py-2 rounded-xl font-medium transition duration-200 ${
                  activeTab === 'ai-planner' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Brain className="mr-3 h-5 w-5" />
                AI Planner
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabClick('explorer')} 
                className={`w-full flex items-center px-4 py-2 rounded-xl font-medium transition duration-200 ${
                  activeTab === 'explorer' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Compass className="mr-3 h-5 w-5" />
                Visual Explorer
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTabClick('peer-paths')} 
                className={`w-full flex items-center px-4 py-2 rounded-xl font-medium transition duration-200 ${
                  activeTab === 'peer-paths' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Peer Paths
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
