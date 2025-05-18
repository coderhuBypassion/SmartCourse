import { Switch, Route } from "wouter";
import { Suspense, lazy, useState } from "react";
import Sidebar from "./components/sidebar";
import MobileHeader from "./components/mobile-header";
import MobileNav from "./components/mobile-nav";
import NotFound from "@/pages/not-found";

// Lazy load pages for better initial load performance
const Catalog = lazy(() => import("@/pages/catalog"));
const AiPlanner = lazy(() => import("@/pages/ai-planner"));
const VisualExplorer = lazy(() => import("@/pages/visual-explorer"));
const PeerPaths = lazy(() => import("@/pages/peer-paths"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("catalog");
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Loading fallback for lazy loaded components
  const Loading = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      <MobileHeader 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
      />
      
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1 p-4 md:p-6 overflow-y-auto pb-16 md:pb-6 md:h-screen">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/">
              {activeTab === "catalog" && <Catalog />}
              {activeTab === "ai-planner" && <AiPlanner />}
              {activeTab === "explorer" && <VisualExplorer setActiveTab={setActiveTab} />}
              {activeTab === "peer-paths" && <PeerPaths setActiveTab={setActiveTab} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
