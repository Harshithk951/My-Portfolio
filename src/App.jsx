import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { initializePageLoadTimer } from '@/lib/utils';

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

    // Simulate loading time to show the initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scroll after loader disappears
      document.body.style.overflow = 'unset';
      
      // Delay Hero render to ensure smooth transition
      setTimeout(() => setHeroReady(true), 150);
    }, 600); // 600ms is a nice balance for the start animation

    // Handle back/forward cache restoration
    const handlePageShow = (event) => {
      if (event.persisted) {
        setIsLoading(false);
        document.body.style.overflow = 'unset';
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('pageshow', handlePageShow);
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