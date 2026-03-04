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
