import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
import Settings from "@/components/Settings";
import RecipeMaker from "@/components/RecipeMaker";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle URL tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['dashboard', 'meal-plan', 'grocery-list', 'settings', 'recipe-maker'].includes(tab)) {
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
      case 'recipe-maker':
        return <RecipeMaker />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 min-h-screen overflow-y-auto">
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
