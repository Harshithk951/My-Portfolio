import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/lib/utils';
import { useScrollDetection } from '@/hooks/useScrollDetection';

export function TubeLightNavbar({ items, className }) {
  const [isMobile, setIsMobile] = useState(false);
  const isHeroVisible = useScrollDetection();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (item) => {
    smoothScrollTo(item.href);
  };

  return (
    <motion.div
      className={cn(
        'hidden md:flex fixed md:top-6 inset-x-0 z-[210] h-max pointer-events-none justify-center',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      pointerEvents={isHeroVisible ? 'auto' : 'none'}
    >
      <div className="pointer-events-auto flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-xl py-1 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={cn(
                'relative cursor-pointer text-sm font-medium px-4 sm:px-6 py-2 rounded-full transition-colors',
                'text-white/70 hover:text-white focus:outline-none'
              )}
              title={item.name}
            >
              {/* Desktop: Show text */}
              <span className="hidden sm:inline">{item.name}</span>
              
              {/* Mobile: Show icon */}
              <span className="sm:hidden">
                <Icon size={20} strokeWidth={2} />
              </span>

              {/* Tube Light Effect - removed for performance */}
              {false && (
                <motion.div
                  layoutId="tube-light"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Top glow bar */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded-t-full">
                    {/* Glow effects */}
                    <div className="absolute w-10 h-5 bg-blue-400/25 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-6 h-5 bg-blue-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-3 h-3 bg-blue-400/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>

                  {/* Bottom glow reflection */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-400/20 rounded-b-full blur-sm" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TubeLightNavbar;
