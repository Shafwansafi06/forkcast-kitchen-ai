import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <div style={{ color: 'green', fontSize: 32, padding: 32 }}>
            Toaster/Sonner: If you see this, both are working.
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
