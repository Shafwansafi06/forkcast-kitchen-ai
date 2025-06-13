import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import Index from "@/pages/Index";
import AuthCallback from "@/pages/AuthCallback";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Index />,
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