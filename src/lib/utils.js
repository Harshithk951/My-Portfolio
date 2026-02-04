import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a specific element by ID.
 * Uses native smooth scrolling for best performance.
 * @param {string} id - The ID of the element to scroll to (e.g., '#contact').
 */
export function smoothScrollTo(id) {
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