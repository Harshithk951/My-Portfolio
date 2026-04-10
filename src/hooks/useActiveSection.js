import { useState, useEffect } from 'react';
import { isInLoadProtectionWindow } from '@/lib/utils';

export const useActiveSection = (sectionIds = ['home', 'about', 'projects', 'skills', 'contact']) => {
  const [activeSection, setActiveSection] = useState('Home');
  const [canTrack, setCanTrack] = useState(false);

  // Delay observer setup by 4 seconds to avoid interference with scroll locking during load
  useEffect(() => {
    const delay = setTimeout(() => {
      setCanTrack(true);
    }, 4000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    // Skip observer setup during loading phase
    if (!canTrack) return;
    // Map section IDs to names
    const sectionMap = {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    };

    // Track intersection ratios for all sections
    const intersectionRatios = {};
    sectionIds.forEach(id => {
      intersectionRatios[id] = 0;
    });

    // Create IntersectionObserver for each section
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Don't update section tracking during load protection window
          if (isInLoadProtectionWindow()) return;
          
          intersectionRatios[id] = entry.intersectionRatio;

          // Find the section with the highest intersection ratio (most visible)
          let maxRatio = 0;
          let activeId = 'home';

          for (const [sectionId, ratio] of Object.entries(intersectionRatios)) {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeId = sectionId;
            }
          }

          // Only update if the section has meaningful visibility (>10%)
          if (maxRatio > 0.1) {
            setActiveSection(sectionMap[activeId]);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );

      observer.observe(element);
      return { observer, id };
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.disconnect();
        }
      });
    };
  }, [sectionIds, canTrack]);

  return activeSection;
};
