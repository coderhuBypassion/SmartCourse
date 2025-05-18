import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface MobileHeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function MobileHeader({ toggleSidebar, sidebarOpen }: MobileHeaderProps) {
  return (
    <header className="bg-background border-b border-border shadow-sm md:hidden flex items-center justify-between p-4 sticky top-0 z-10">
      <button 
        onClick={toggleSidebar} 
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>
      
      <div className="flex items-center space-x-1">
        <span className="text-primary text-xl">📚</span>
        <h1 className="text-xl font-semibold text-foreground">SmartCourse</h1>
      </div>
      
      <div className="flex items-center">
        <ThemeToggle mobile={true} />
      </div>
    </header>
  );
}
