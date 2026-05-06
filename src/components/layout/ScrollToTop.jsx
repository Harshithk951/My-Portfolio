import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
  // Reset scroll on component mount (backup to App.jsx scroll protection)
  useLayoutEffect(() => {
    globalThis.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;