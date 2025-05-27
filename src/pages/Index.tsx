
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
import Settings from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle URL tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['dashboard', 'meal-plan', 'grocery-list', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'meal-plan':
        return <MealPlan />;
      case 'grocery-list':
        return <GroceryList />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
