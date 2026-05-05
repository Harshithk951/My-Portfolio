import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { reportWebVitals, sendToAnalytics } from '@/lib/analytics';
// Disable automatic scroll restoration by browser
// This prevents the browser from automatically scrolling to previously visited sections
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Initialize performance monitoring
reportWebVitals(sendToAnalytics);

// Store performance start mark for later calculations
if (window.performance?.mark) {
  window.performance.mark('app-init-start');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);

// Mark when React finishes rendering
if (window.performance?.mark) {
  window.performance.mark('app-init-end');
}

// Register service worker for offline support and faster loads
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
      })
      .catch(registrationError => {
        // SW registration failed
      });
  });
}
if (window.performance?.mark) {
  window.performance.mark('app-init-end');
  window.performance.measure('app-init', 'app-init-start', 'app-init-end');
}
