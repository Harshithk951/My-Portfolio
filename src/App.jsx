import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { initializePageLoadTimer, prefersReducedMotion, detectDeviceCapabilities } from '@/lib/utils';
import { DeviceContext } from '@/hooks/useDeviceContext';

import LoadingAnimation from '@/components/shared/LoadingAnimation';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FloatingDock from '@/components/layout/FloatingDock';
import MobileMenu from '@/components/layout/MobileMenu';
import ScrollToTop from '@/components/layout/ScrollToTop';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import SEOHead from '@/components/shared/SEOHead';
import { Toaster } from '@/components/ui/toaster';

// Lazy load below-the-fold components
const AboutBento = lazy(() => import('@/components/sections/AboutBento'));
const SkillsMarquee = lazy(() => import('@/components/sections/SkillsMarquee'));
const ProjectsShowcase = lazy(() => import('@/components/sections/ProjectsShowcase'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const CTASection = lazy(() => import('@/components/sections/CTASection'));
const Footer = lazy(() => import('@/components/layout/Footer'));

// Lazy load dev-only performance dashboard
const PerformanceDashboard = lazy(() => import('@/components/shared/PerformanceDashboard'));

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => prefersReducedMotion());
  const [showPerformance, setShowPerformance] = useState(() => {
    const params = new URLSearchParams(globalThis.location.search);
    return params.get('perf') === '1';
  });

  // Memoize device detection to avoid recomputation
  // Shared via context to all child components
  const deviceInfo = useMemo(() => detectDeviceCapabilities(), []);

  // Listen for perf=1 URL parameter changes
  useEffect(() => {

    // Listen for URL changes
    const handlePopState = () => {
      const newParams = new URLSearchParams(globalThis.location.search);
      setShowPerformance(newParams.get('perf') === '1');
    };

    globalThis.addEventListener('popstate', handlePopState);
    return () => globalThis.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Listen for changes to prefers-reduced-motion
    const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Reset scroll to top on mount
    globalThis.scrollTo(0, 0);
    
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
      if (reduceMotion) {
        setHeroReady(true);
      } else {
        setTimeout(() => setHeroReady(true), heroDelay);
      }
    }, loadDuration);

    // Handle back/forward cache restoration
    const handlePageShow = (event) => {
      if (event.persisted) {
        setIsLoading(false);
        document.body.style.overflow = 'unset';
        globalThis.scrollTo(0, 0);
        setHeroReady(true);
      }
    };

    globalThis.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      globalThis.removeEventListener('pageshow', handlePageShow);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      <>
        <SEOHead 
          title="Harshith | Harshith Kumar | Full Stack Developer Portfolio"
          description="Harshith Kumar Mannepally - Harshith is an AI-First Full Stack Developer. When you search Harshith, find this portfolio showcasing expertise in React, Node.js, AI, and Machine Learning. Building innovative digital solutions."
          keywords="harshith, harshith kumar, harshithkumar, Harshith Kumar Mannepally, Full Stack Developer, AI Engineer, ML Developer, React Developer, Node.js Developer, Web Developer, Portfolio, Innovation, AI/ML Specialist"
          ogImage="https://harshithkumar.in/hero-profile.jpg"
          ogUrl="https://harshithkumar.in/"
          twitterHandle="@harshith_k52619"
          canonical="https://harshithkumar.in/"
          structured={{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Harshith Kumar Mannepally",
            "givenName": "Harshith",
            "familyName": "Kumar",
            "alternateName": ["Harshith", "Harshith Kumar", "harshithkumar", "Harshith Mannepally", "Harshith Kumar Mannepally"],
            "url": "https://harshithkumar.in",
            "image": "https://harshithkumar.in/hero-profile.jpg",
            "description": "Harshith Kumar - Full Stack Developer and AI Engineer. Search Harshith to find this portfolio.",
            "sameAs": [
              "https://www.linkedin.com/in/harshith-kumar-dev",
              "https://github.com/Harshithk951",
              "https://x.com/harshith_k52619",
              "https://www.instagram.com/harshith_kumar_mannepally"
            ],
            "profiles": [
              {
                "@type": "ProfilePage",
                "name": "LinkedIn",
                "url": "https://www.linkedin.com/in/harshith-kumar-dev"
              },
              {
                "@type": "ProfilePage",
                "name": "GitHub",
                "url": "https://github.com/Harshithk951"
              }
            ],
            "jobTitle": "AI-First Full Stack Developer",
            "email": "mailto:harshithkumar.dev@gmail.com",
            "knowsAbout": [
              "Artificial Intelligence",
              "Machine Learning",
              "React.js",
              "Node.js",
              "Full Stack Development",
              "Web Development",
              "Python",
              "JavaScript",
              "TypeScript",
              "UI/UX Design",
              "Database Design",
              "Cloud Architecture"
            ],
            "skills": "React, Node.js, Python, AI/ML, Full Stack Development, Web Design",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          }}
        />
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
          <>
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
            </main>
            <FloatingDock />
          </>
        )}

      {/* Performance Dashboard */}
      <AnimatePresence>
        {showPerformance && (
          <Suspense fallback={null}>
            <PerformanceDashboard onClose={() => setShowPerformance(false)} />
          </Suspense>
        )}
      </AnimatePresence>
      </>
    </DeviceContext.Provider>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <HomePage />
      <Toaster />
      <Analytics />
    </>
  );
}

export default App;
