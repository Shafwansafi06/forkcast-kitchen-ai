import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";

const NotFound = () => (
  <div style={{ color: 'red', fontSize: 32, padding: 32 }}>
    404 Not Found (from router)
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Index />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 