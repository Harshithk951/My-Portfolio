/**
 * Analytics helper — pushes custom events to the GTM dataLayer.
 *
 * @param {string} eventName  GTM event name (e.g. "hire_me_click")
 * @param {object} [payload]  Optional key/value pairs sent with the event
 */
export function sendAnalyticsEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;      // SSR-safe
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

/**
 * Send Web Vitals to analytics
 */
export function sendToAnalytics({ id, name, value, delta }) {
  sendAnalyticsEvent('web_vitals', {
    event_category: 'Web Vitals',
    event_action: name,
    event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_label: id,
    non_interaction: true,
  });
}

/**
 * Report Web Vitals using standard Observer API
 */
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
      onINP(onPerfEntry);
    }).catch(err => {
      console.warn('Could not load web-vitals', err);
    });
  }
}
