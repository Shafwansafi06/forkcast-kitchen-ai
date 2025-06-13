import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ color: 'green', fontSize: 32, padding: 32 }}>
        QueryClientProvider: If you see this, React Query is working.
      </div>
    </QueryClientProvider>
  );
};
export default App;
