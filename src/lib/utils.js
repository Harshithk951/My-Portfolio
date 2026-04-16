import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Global loading flag to prevent scroll during initial load window
let pageLoadStartTime = null; // Initialize as null, will be set on page load
const LOAD_PROTECTION_WINDOW = 800; // 0.8 seconds (Reduced for better UX)

/**
 * Initialize/reset page load timer on every page load
 * Must be called from App.jsx when component mounts
 */
export function initializePageLoadTimer() {
  pageLoadStartTime = Date.now();
}

/**
 * Check if we're within the protection window
 */
export function isInLoadProtectionWindow() {
  if (!pageLoadStartTime) return true; // Default to protected if not initialized
  const elapsed = Date.now() - pageLoadStartTime;
  return elapsed < LOAD_PROTECTION_WINDOW;
}

/**
 * Smoothly scrolls to a specific element by ID.
 * Uses native smooth scrolling for best performance.
 * Respects page load window - won't scroll during initial 4 seconds.
 * @param {string} id - The ID of the element to scroll to (e.g., '#contact').
 */
export function smoothScrollTo(id) {
  // Don't allow scrolling during initial page load window
  if (isInLoadProtectionWindow()) {
    return; // Silently ignore scroll requests during loading
  }

  const element = document.querySelector(id);
  if (element) {
    // Check if the browser supports native smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback for older browsers (though minimal in modern envs)
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}