import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';

import LoadingAnimation from './components/LoadingAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingDock from './components/FloatingDock';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

// Lazy load below-the-fold components
const AboutBento = lazy(() => import('./components/AboutBento'));
const SkillUniverse = lazy(() => import('./components/SkillUniverse'));
const ProjectsShowcase = lazy(() => import('./components/ProjectsShowcase'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for faster initial display
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

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
      <Helmet>
        <title>Harshith | AI-First Full Stack Engineer</title>
        <meta
          name="description"
          content="Portfolio of Harshith Kumar Mannepally - AI/ML Student, Full Stack Developer, and Innovation Enthusiast. Building scalable digital solutions."
        />
      </Helmet>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <main className="smooth-scroll animate-in fade-in duration-1000 bg-[#0b0b0b]">
          <Navbar />
          <Hero />
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col space-y-0">
              <AboutBento />
              <SkillUniverse />
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