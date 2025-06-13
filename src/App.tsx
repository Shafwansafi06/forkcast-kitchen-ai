import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
console.log('App.tsx loaded');
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ color: 'green', fontSize: 32, padding: 32 }}>Hello World - QueryClientProvider Works!</div>
    </QueryClientProvider>
  );
};
export default App;
