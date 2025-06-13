import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
// import Settings from "@/components/Settings";
import RecipeMaker from "@/components/RecipeMaker";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <div style={{ color: 'blue', fontSize: 32, padding: 32 }}>
      Minimal Dashboard Render Test: If you see this, Index.tsx is working.
    </div>
  );
};

export default Index;
