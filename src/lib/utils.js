import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ─────────────────────────────────────────────────────────────────────
// Class Name Utilities
// ─────────────────────────────────────────────────────────────────────

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// ─────────────────────────────────────────────────────────────────────
// Device Detection Utilities (Centralized)
// ─────────────────────────────────────────────────────────────────────

/**
 * Detect device capabilities for performance optimization
 * Called once on app mount; memoize result in components
 * 
 * @returns {Object} Device info object with properties:
 *   - isMobile: boolean
 *   - isTablet: boolean
 *   - isLowEnd: boolean (mobile with ≤2GB RAM or slow connection)
 *   - hasTouch: boolean
 *   - pixelRatio: number (1-2, capped for performance)
 *   - networkType: string ('4g', '3g', 'slow-2g', 'unknown')
 */
export function detectDeviceCapabilities() {
  if (typeof globalThis === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isLowEnd: false,
      hasTouch: false,
      pixelRatio: 1,
      networkType: 'unknown',
    };
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isTablet = /iPad|Android|Windows Phone/.test(navigator.userAgent);
  
  const hasTouch = () => {
    return (
      'ontouchstart' in globalThis ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };

  const deviceMemory = navigator.deviceMemory || 4;
  const networkType = navigator.connection?.effectiveType || 'unknown';
  const isSlow = networkType === '3g' || networkType === '4g';
  const isLowEnd = isMobile && (deviceMemory <= 2 || isSlow);

  return {
    isMobile,
    isTablet,
    isLowEnd,
    hasTouch: hasTouch(),
    pixelRatio: Math.min(globalThis.devicePixelRatio || 1, 2),
    networkType,
  };
}

/**
 * Check if browser prefers reduced motion
 * Used for respecting user's motion preferences
 * 
 * @returns {boolean} True if prefers-reduced-motion is set
 */
export function prefersReducedMotion() {
  if (typeof globalThis === 'undefined') return false;
  return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}



// ─────────────────────────────────────────────────────────────────────
// Page Load Protection Window
// ─────────────────────────────────────────────────────────────────────

let pageLoadStartTime = null;
const LOAD_PROTECTION_WINDOW = 800; // 0.8 seconds

/**
 * Initialize/reset page load timer on every page load
 * Must be called from App.jsx when component mounts
 */
export function initializePageLoadTimer() {
  pageLoadStartTime = Date.now();
}

/**
 * Check if we're within the protection globalThis
 */
function isInLoadProtectionWindow() {
  if (!pageLoadStartTime) return true;
  const elapsed = Date.now() - pageLoadStartTime;
  return elapsed < LOAD_PROTECTION_WINDOW;
}

// ─────────────────────────────────────────────────────────────────────
// Scroll Utilities
// ─────────────────────────────────────────────────────────────────────

/**
 * Smoothly scrolls to a specific element by ID.
 * Uses native smooth scrolling for best performance.
 * Respects page load globalThis - won't scroll during initial 0.8 seconds.
 * @param {string} id - The ID of the element to scroll to (e.g., '#contact').
 */
export function smoothScrollTo(id) {
  // Don't allow scrolling during initial page load globalThis
  if (isInLoadProtectionWindow()) {
    return; // Silently ignore scroll requests during loading
  }

  const element = document.querySelector(id);
  if (element) {
    const navbarOffset = 40; // Pixels to offset from top
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + globalThis.scrollY - navbarOffset;

    globalThis.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}