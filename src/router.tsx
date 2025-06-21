import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/components/Dashboard";
import MealPlan from "@/components/MealPlan";
import GroceryList from "@/components/GroceryList";
import RecipeMaker from "@/components/RecipeMaker";
import Settings from "@/components/Settings";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <DashboardLayout><></></DashboardLayout>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/meal-plan", element: <MealPlan /> },
      { path: "/grocery-list", element: <GroceryList /> },
      { path: "/recipe-maker", element: <RecipeMaker /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 