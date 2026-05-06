import { memo, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MacOSDock from '@/components/ui/mac-os-dock';

const FloatingDock = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const dockItems = [
    { id: 'home', name: 'Home', icon: Home, href: '#home' },
    { id: 'about', name: 'About', icon: User, href: '#about' },
    { id: 'projects', name: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'skills', name: 'Skills', icon: Code, href: '#skills' },
    { id: 'contact', name: 'Contact', icon: Mail, href: '#contact' },
    { id: 'github', name: 'GitHub', icon: FaGithub, href: 'https://github.com/Harshithk951', isExternal: true },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/harshith-kumar-dev', isExternal: true },
  ];

  // Show dock when user scrolls past the Hero section
  useEffect(() => {
    const onScroll = () => {
      // Trigger when scrolled past ~60% of viewport height (past Hero)
      setIsVisible(globalThis.scrollY > globalThis.innerHeight * 0.6);
    };

    globalThis.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check on mount

    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  const handleAppClick = useCallback((appId) => {
    const app = dockItems.find(item => item.id === appId);
    if (!app) return;

    if (app.isExternal) {
      globalThis.open(app.href, '_blank', 'noopener,noreferrer');
    } else {
      smoothScrollTo(app.href);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          key="floating-dock"
          aria-label="Quick Navigation Dock"
          className="hidden lg:flex"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          initial={{ y: 80, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 80, x: '-50%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <MacOSDock
              apps={dockItems}
              onAppClick={handleAppClick}
              openApps={[]}
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
});

FloatingDock.displayName = 'FloatingDock';

export default FloatingDock;
