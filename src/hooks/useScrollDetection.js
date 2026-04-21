import { useState, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

/**
 * useScrollDetection Hook
 * 
 * Detects if Hero section is in viewport
 * Respects prefers-reduced-motion user preference
 * 
 * @returns {boolean} True if Hero section is visible in viewport
 * 
 * @example
 * const isHeroVisible = useScrollDetection();
 */
export const useScrollDetection = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [reduceMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    // If user prefers reduced motion, skip intersection observation
    if (reduceMotion) {
      setIsHeroVisible(true);
      return;
    }

    let observer = null;
    let timeoutId = null;

    const setupObserver = () => {
      const heroElement = document.getElementById('home');
      
      if (!heroElement) {
        // Element doesn't exist yet, retry after 50ms
        // This handles the case where Hero is conditionally rendered
        timeoutId = setTimeout(setupObserver, 50);
        return;
      }

      // Create an IntersectionObserver to detect if Hero is in viewport
      observer = new IntersectionObserver(
        ([entry]) => {
          // Set visibility based on whether Hero is intersecting the viewport
          // Hero is considered visible if at least 20% is in viewport
          setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.2);
        },
        {
          threshold: [0, 0.2, 0.5, 1], // Multiple thresholds for smooth transition
        }
      );

      observer.observe(heroElement);
    };

    setupObserver();

    // Cleanup observer on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [reduceMotion]);

  return isHeroVisible;
};
