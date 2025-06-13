import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div style={{ color: 'green', fontSize: 32, padding: 32 }}>
            AuthProvider: If you see this, AuthProvider is working.
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
