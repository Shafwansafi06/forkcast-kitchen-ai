import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div style={{ color: 'green', fontSize: 32, padding: 32 }}>
          TooltipProvider: If you see this, TooltipProvider is working.
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
