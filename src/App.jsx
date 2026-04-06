import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    // Simulate loading time to show the initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    // Handle back/forward cache restoration
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page was restored from bfcache, reset loading if needed
        setIsLoading(false);
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <main className="smooth-scroll animate-in fade-in duration-1000 bg-[#0b0b0b]">
          <Navbar />
          <MobileMenu />
          <Hero />
          <Suspense fallback={<div>Loading...</div>}>
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