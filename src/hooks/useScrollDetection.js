import { useState, useEffect } from 'react';

export const useScrollDetection = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const heroElement = document.getElementById('home');
    if (!heroElement) return;

    // Create an IntersectionObserver to detect if Hero is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether Hero is intersecting the viewport
        // Hero is considered visible if at least 30% is in viewport
        setIsHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      {
        threshold: [0, 0.2, 0.5, 1], // Multiple thresholds for smooth transition
      }
    );

    observer.observe(heroElement);

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return isHeroVisible;
};
