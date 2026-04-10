import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Global loading flag to prevent scroll during initial load window
let pageLoadStartTime = Date.now();
const LOAD_PROTECTION_WINDOW = 4000; // 4 seconds

/**
 * Smoothly scrolls to a specific element by ID.
 * Uses native smooth scrolling for best performance.
 * Respects page load window - won't scroll during initial 4 seconds.
 * @param {string} id - The ID of the element to scroll to (e.g., '#contact').
 */
export function smoothScrollTo(id) {
  // Don't allow scrolling during initial page load window
  const elapsed = Date.now() - pageLoadStartTime;
  if (elapsed < LOAD_PROTECTION_WINDOW) {
    return; // Silently ignore scroll requests during loading
  }

  const element = document.querySelector(id);
  if (element) {
    // Check if the browser supports native smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback for older browsers (though minimal in modern envs)
      const top = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}