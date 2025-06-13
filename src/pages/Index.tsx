import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
// import Settings from "@/components/Settings";
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
      // case 'settings':
      //   return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div style={{ flex: 1 }}>
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
