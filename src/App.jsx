import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initializePageLoadTimer } from '@/lib/utils';

import LoadingAnimation from './components/LoadingAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingDock from './components/FloatingDock';
import MobileMenu from './components/MobileMenu';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

// Lazy load below-the-fold components
const AboutBento = lazy(() => import('./components/AboutBento'));
const SkillsMarquee = lazy(() => import('./components/SkillsMarquee'));
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // Aggressive scroll lock: reset immediately when component mounts
    window.scrollTo(0, 0);
    
    // Initialize page load timer for all protection mechanisms
    initializePageLoadTimer();
    
    // Store loading start time for 4-second protection window
    const loadStartTime = Date.now();
    const LOCK_DURATION = 4000; // Extended to 4 seconds for production safety
    const EXTRA_BUFFER = 500; // Additional 500ms buffer after main lock expires
    
    // Lock scroll at top during loading to prevent race conditions with lazy components
    const lockScrollInterval = setInterval(() => {
      const elapsed = Date.now() - loadStartTime;
      // Keep locking scroll for full 4 seconds + 500ms buffer for lazy components to stabilize
      if (elapsed < (LOCK_DURATION + EXTRA_BUFFER) && window.scrollY > 0) {
        window.scrollTo(0, 0);
      } else if (elapsed >= (LOCK_DURATION + EXTRA_BUFFER)) {
        clearInterval(lockScrollInterval);
      }
    }, 30);

    // Simulate loading time to show the initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Delay Hero render to ensure smooth transition
      setTimeout(() => setHeroReady(true), 100);
    }, 2300);

    // Handle back/forward cache restoration
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page was restored from bfcache, reset loading if needed
        setIsLoading(false);
        clearInterval(lockScrollInterval);
        window.scrollTo(0, 0);
      }
    };

    // Additional safety: re-lock if scroll detected after main lock expires
    const handleUnexpectedScroll = () => {
      const elapsed = Date.now() - loadStartTime;
      // If scroll happens within the protection window + buffer, immediately reset
      if (elapsed < (LOCK_DURATION + EXTRA_BUFFER) && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('scroll', handleUnexpectedScroll, true);

    return () => {
      clearTimeout(timer);
      clearInterval(lockScrollInterval);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('scroll', handleUnexpectedScroll, true);
    };
  }, [isLoading]);

  return (
    <>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <main className="smooth-scroll animate-in fade-in duration-1000 bg-[#0b0b0b]">
          <Navbar />
          <MobileMenu />
          {heroReady && <Hero />}
          <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center"><div className="text-white/30">Loading...</div></div>}>
            <div className="flex flex-col space-y-0">
              <AboutBento />
              <SkillsMarquee />
              <ProjectsShowcase />
              <ServicesSection />
              <CTASection />
            </div>
            <Footer />
          </Suspense>
          <FloatingDock />
        </main>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;