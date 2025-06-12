import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

// Manual event for testing
posthog.capture('my event', { property: 'value' });

createRoot(document.getElementById("root")!).render(
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={options}
  >
    <App />
  </PostHogProvider>
);
