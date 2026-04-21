import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { initializePageLoadTimer, prefersReducedMotion } from '@/lib/utils';

import LoadingAnimation from '@/components/shared/LoadingAnimation';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FloatingDock from '@/components/layout/FloatingDock';
import MobileMenu from '@/components/layout/MobileMenu';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';

// Lazy load below-the-fold components
const AboutBento = lazy(() => import('@/components/sections/AboutBento'));
const SkillsMarquee = lazy(() => import('@/components/sections/SkillsMarquee'));
const ProjectsShowcase = lazy(() => import('@/components/sections/ProjectsShowcase'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Detect if user prefers reduced motion
    setReduceMotion(prefersReducedMotion());

    // Listen for changes to prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Reset scroll to top on mount
    window.scrollTo(0, 0);
    
    // Initialize page load timer for protection mechanisms
    initializePageLoadTimer();
    
    // Standard approach: lock body scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Adjust loading time based on motion preference
    const loadDuration = reduceMotion ? 300 : 600;
    const heroDelay = reduceMotion ? 0 : 150;

    // Simulate loading time to show the initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scroll after loader disappears
      document.body.style.overflow = 'unset';
      
      // Delay Hero render to ensure smooth transition
      if (!reduceMotion) {
        setTimeout(() => setHeroReady(true), heroDelay);
      } else {
        setHeroReady(true);
      }
    }, loadDuration);

    // Handle back/forward cache restoration
    const handlePageShow = (event) => {
      if (event.persisted) {
        setIsLoading(false);
        document.body.style.overflow = 'unset';
        window.scrollTo(0, 0);
        setHeroReady(true);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [reduceMotion]);

  return (
    <>
      <a 
        href="#main-content" 
        className="fixed top-0 left-0 -translate-y-full focus:translate-y-0 z-[999] bg-white text-black px-4 py-2 font-medium transition-transform duration-200"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <main id="main-content" className={`smooth-scroll animate-in fade-in duration-1000 bg-[#0b0b0b] ${reduceMotion ? 'reduce-motion' : ''}`}>
          <Navbar />
          <MobileMenu />
          {heroReady && <Hero />}
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center"><div className="text-white/70">Loading...</div></div>}>
              <div className="flex flex-col space-y-0">
                <AboutBento />
                <SkillsMarquee />
                <ProjectsShowcase />
                <ServicesSection />
                <CTASection />
              </div>
              <Footer />
            </Suspense>
          </ErrorBoundary>
          <FloatingDock />
        </main>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <HomePage />
      <Toaster />
    </>
  );
}

export default App;