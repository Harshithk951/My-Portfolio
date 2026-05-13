import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { reportWebVitals, sendToAnalytics } from '@/lib/analytics';
// Disable automatic scroll restoration by browser
// This prevents the browser from automatically scrolling to previously visited sections
if ('scrollRestoration' in globalThis.history) {
  globalThis.history.scrollRestoration = 'manual';
}

// Initialize performance monitoring
reportWebVitals(sendToAnalytics);

// Store performance start mark for later calculations
if (globalThis.performance?.mark) {
  globalThis.performance.mark('app-init-start');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

// Mark when React finishes rendering
if (globalThis.performance?.mark) {
  globalThis.performance.mark('app-init-end');
}

// Register service worker for offline support and faster loads
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  globalThis.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
      })
      .catch(registrationError => {
        console.error('SW registration failed:', registrationError);
      });
  });
}
if (globalThis.performance?.mark) {
  globalThis.performance.mark('app-init-end');
  globalThis.performance.measure('app-init', 'app-init-start', 'app-init-end');
}
