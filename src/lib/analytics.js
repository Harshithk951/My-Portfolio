/**
 * Analytics helper — pushes custom events to the GTM dataLayer.
 *
 * @param {string} eventName  GTM event name (e.g. "hire_me_click")
 * @param {object} [payload]  Optional key/value pairs sent with the event
 */
export function sendAnalyticsEvent(eventName, payload = {}) {
  if (typeof globalThis === 'undefined') return;      // SSR-safe
  globalThis.dataLayer = globalThis.dataLayer || [];
  globalThis.dataLayer.push({ event: eventName, ...payload });
}

/**
 * Send Web Vitals to analytics and store in performance dashboard
 * Also dispatches custom event for real-time dashboard updates
 */
export function sendToAnalytics({ id, name, value, delta }) {
  sendAnalyticsEvent('web_vitals', {
    event_category: 'Web Vitals',
    event_action: name,
    event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_label: id,
    non_interaction: true,
  });

  // Store metrics for performance dashboard
  if (typeof globalThis !== 'undefined') {
    globalThis.__PERF_METRICS__ = globalThis.__PERF_METRICS__ || {};
    
    // Determine unit based on metric type
    let unit = 'ms';
    if (name === 'CLS') unit = '';
    
    globalThis.__PERF_METRICS__[name] = {
      value: typeof value === 'number' ? value : delta || value,
      unit,
      timestamp: Date.now(),
      id,
    };

    // Dispatch custom event for dashboard real-time updates
    const event = new CustomEvent('perf-metric-update', {
      detail: globalThis.__PERF_METRICS__,
    });
    globalThis.dispatchEvent(event);

    // Log to console in dev mode
    if (import.meta.env.DEV) {
      console.log(`[Web Vitals] ${name}: ${value.toFixed(2)}${unit}`, { id, delta });
    }
  }
}

/**
 * Report Web Vitals using standard Observer API
 */
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
      onINP(onPerfEntry);
    }).catch(err => {
      console.warn('Could not load web-vitals:', err);
    });
  }
}
