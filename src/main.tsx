console.log('main.tsx loaded');
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  createRoot(document.getElementById("root")!).render(<App />);
} catch (e) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `<div style='color:red;padding:32px;'><h1>Fatal error in main.tsx</h1><pre>${e instanceof Error ? e.stack : e}</pre></div>`;
  }
  // Also log to console
  // eslint-disable-next-line no-console
  console.error('Fatal error in main.tsx:', e);
}
