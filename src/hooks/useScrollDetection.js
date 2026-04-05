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
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% of Hero is visible
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
