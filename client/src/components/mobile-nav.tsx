import { School, Brain, Compass, Users } from "lucide-react";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md px-2 py-3 flex justify-around z-10">
      <button 
        onClick={() => setActiveTab('catalog')} 
        className={`flex flex-col items-center px-3 py-1 ${
          activeTab === 'catalog' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <School className="h-5 w-5" />
        <span className="text-xs mt-1">Catalog</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('ai-planner')} 
        className={`flex flex-col items-center px-3 py-1 ${
          activeTab === 'ai-planner' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Brain className="h-5 w-5" />
        <span className="text-xs mt-1">AI Planner</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('explorer')} 
        className={`flex flex-col items-center px-3 py-1 ${
          activeTab === 'explorer' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Compass className="h-5 w-5" />
        <span className="text-xs mt-1">Explorer</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('peer-paths')} 
        className={`flex flex-col items-center px-3 py-1 ${
          activeTab === 'peer-paths' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Users className="h-5 w-5" />
        <span className="text-xs mt-1">Paths</span>
      </button>
    </nav>
  );
}
