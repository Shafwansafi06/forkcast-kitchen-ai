import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
// import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
// import Settings from "@/components/Settings";
import RecipeMaker from "@/components/RecipeMaker";
import { Helmet } from "react-helmet";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar activeTab="dashboard" onTabChange={() => {}} />
      <div style={{ flex: 1 }}>
        <div style={{ color: 'blue', fontSize: 32, padding: 32 }}>
          Minimal Dashboard Render Test: If you see this, Index.tsx and Sidebar are working.
        </div>
        <ErrorBoundary>
          {/* <Dashboard /> */}
          <div style={{ color: 'orange', fontSize: 24, padding: 16 }}>
            Dashboard would render here. If you uncomment it and see an error, check the error boundary output.
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
