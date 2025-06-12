import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import { capturePostHogEvent } from "@/utils/posthog";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(false);
  const sendTestEvent = async () => {
    setLoading(true);
    try {
      await capturePostHogEvent({
        event: "test_event",
        properties: {
          distinct_id: "test_user_123",
          key1: "value1",
          key2: "value2",
        },
      });
      alert("Event sent!");
    } catch (e) {
      alert("Failed to send event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}>
            <button onClick={sendTestEvent} disabled={loading} style={{ padding: 8, background: '#333', color: '#fff', borderRadius: 4 }}>
              {loading ? 'Sending...' : 'Send PostHog Test Event'}
            </button>
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
