import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' }, // Replaces Skills, scrolls to "What I Build" (assuming ID is #services)
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href) => {
    // If the link is for Services, we might want to target the specific section ID
    // Assuming the "What I Build" section is wrapped in ServicesSection which likely has id="services" or similar
    // Based on previous code, ServicesSection didn't have an ID, but let's assume standard practice or target by query if needed.
    // The previous ServicesSection code didn't export an ID, let's fix that by assuming the user wants to scroll to the component.
    // However, I can't modify ServicesSection here. I will try to scroll to #services assuming it exists or will exist, 
    // or fallback to a query selector if I had access to other files. 
    // Since I can only modify Navbar, Hero, Footer, let's stick to the IDs.
    // Note: The previous ServicesSection file wasn't editable in this prompt but was in context. 
    // I will use smoothScrollTo.
    
    // Check if the href matches a section
    smoothScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold header-text cursor-pointer text-white"
            onClick={() => handleNavClick('#home')}
          >
            H
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-white/80 hover:text-white transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;