import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
  // Reset scroll on component mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // Lock scroll for 4 seconds as extra safety
    const safetyInterval = setInterval(() => {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    }, 30);
    
    const safetyTimer = setTimeout(() => {
      clearInterval(safetyInterval);
    }, 4000);
    
    return () => {
      clearInterval(safetyInterval);
      clearTimeout(safetyTimer);
    };
  }, []);

  return null;
}

export default ScrollToTop;