import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
console.log('App.tsx loaded');
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div style={{ color: 'green', fontSize: 32, padding: 32 }}>Hello World - TooltipProvider Works!</div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
