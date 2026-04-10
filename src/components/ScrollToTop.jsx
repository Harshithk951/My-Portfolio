import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Aggressive initial reset on mount
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        // Also lock scroll for first 3 seconds as extra safety
        const safetyInterval = setInterval(() => {
            if (window.scrollY > 0) {
                window.scrollTo(0, 0);
            }
        }, 50);
        
        const safetyTimer = setTimeout(() => {
            clearInterval(safetyInterval);
        }, 3000);
        
        return () => {
            clearInterval(safetyInterval);
            clearTimeout(safetyTimer);
        };
    }, []);

    // Reset scroll on route change (pathname change)
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}

export default ScrollToTop;