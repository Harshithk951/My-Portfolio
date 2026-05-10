import { useState, useCallback, memo } from 'react';
import { Menu, X, Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';
import { ANIMATION_PRESETS } from '@/lib/animationConfig';

const MobileMenu = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', name: 'Home', icon: Home, href: '#home' },
    { id: 'about', name: 'About', icon: User, href: '#about' },
    { id: 'skills', name: 'Skills', icon: Code, href: '#skills' },
    { id: 'projects', name: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'contact', name: 'Contact', icon: Mail, href: '#contact' },
  ];

  const handleItemClick = useCallback((href) => {
    smoothScrollTo(href);
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-40 md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/70 hover:text-white focus:outline-none transition-colors bg-white/5 backdrop-blur-xl rounded-lg"
        aria-label="Toggle navigation menu"
        type="button"
      >
        {isOpen ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <Menu size={24} strokeWidth={2} />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...ANIMATION_PRESETS.MODAL_ENTER}
            className="absolute top-full right-0 mt-2 bg-white/5 border border-white/15 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden"
            style={{
              width: 'max(160px, calc(100vw - 100px))',
              maxWidth: '200px'
            }}
          >
            {/* Menu Items */}
            <div className="flex flex-col">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item.href)}
                    className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all border-b border-white/5 last:border-b-0"
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop - close menu when clicking outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[-1] bg-black/20 border-none p-0 outline-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
