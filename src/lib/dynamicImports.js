/**
 * Dynamic Import Helpers for Code Splitting & Performance
 * 
 * Utilities to conditionally load large dependencies based on device capabilities
 * Reduces initial bundle size by deferring non-critical animations and renderers
 */

/**
 * Dynamically import Framer Motion components based on device capability
 * Defers animation on low-end devices
 * 
 * @param {boolean} isLowEnd - Whether device is low-end
 * @returns {Promise<Object>} - Framer Motion AnimatePresence or fallback
 */
export async function loadFramerMotion(isLowEnd = false) {
  if (isLowEnd) {
    // Return a simple fallback that doesn't animate
    return {
      motion: { div: 'div' },
      AnimatePresence: ({ children }) => children,
    };
  }

  try {
    return await import('framer-motion');
  } catch (err) {
    console.warn('Failed to load framer-motion dynamically:', err);
    // Fallback to simple rendering
    return {
      motion: { div: 'div' },
      AnimatePresence: ({ children }) => children,
    };
  }
}

/**
 * Dynamically import OGL (WebGL) renderer
 * Only loaded when needed for 3D effects
 * 
 * @returns {Promise<Object>} - OGL library or null if not available
 */
export async function loadOGLRenderer() {
  try {
    return await import('ogl');
  } catch (err) {
    console.warn('Failed to load OGL renderer:', err);
    return null;
  }
}

/**
 * Dynamically import specific lucide icons
 * Use this to import only needed icons instead of bundling all
 * 
 * @param {string[]} iconNames - Array of icon names to import
 * @returns {Promise<Object>} - Map of icon components
 * 
 * @example
 * const icons = await importIcons(['Home', 'Menu', 'Close']);
 * const HomeIcon = icons.Home;
 */
export async function importIcons(iconNames) {
  try {
    const lucideReact = await import('lucide-react');
    const icons = {};
    
    for (const name of iconNames) {
      if (lucideReact[name]) {
        icons[name] = lucideReact[name];
      }
    }
    
    return icons;
  } catch (err) {
    console.warn('Failed to load icons:', err);
    return {};
  }
}

/**
 * Dynamically import analytics library
 * Defers analytics to avoid blocking initial load
 * 
 * @returns {Promise<Object>} - Analytics functions
 */
export async function loadAnalytics() {
  try {
    return await import('@/lib/analytics');
  } catch (err) {
    console.warn('Failed to load analytics:', err);
    return {
      sendAnalyticsEvent: () => {},
      sendToAnalytics: () => {},
      reportWebVitals: () => {},
    };
  }
}

/**
 * Conditionally load components based on device and connection speed
 * 
 * @param {Object} deviceInfo - Device capabilities
 * @returns {Object} - Loading strategy
 */
export function getLoadingStrategy(deviceInfo) {
  const { isLowEnd, isMobile, networkType } = deviceInfo;
  
  return {
    // Defer animations on low-end or slow connection
    deferAnimations: isLowEnd || networkType === 'slow-2g' || networkType === '3g',
    
    // Defer 3D effects on mobile or low-end
    defer3D: isMobile || isLowEnd,
    
    // Load critical components eagerly, rest lazily
    eagerLoad: ['Hero', 'Navbar'],
    
    // Prefetch on high-end, fast connection
    prefetchOnInteraction: isLowEnd || networkType === '3g',
  };
}

/**
 * Create an intersection observer for lazy loading
 * Better than React.lazy for components below fold
 * 
 * @param {Function} callback - Function to call when element becomes visible
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver}
 */
export function createLazyObserver(callback, options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',  // Start loading 50px before entering viewport
    threshold: 0.01,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, { ...defaultOptions, ...options });
}
