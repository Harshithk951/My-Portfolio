import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/lib/utils';
import { useScrollDetection } from '@/hooks/useScrollDetection';

export function TubeLightNavbar({ items, className }) {
  const isHeroVisible = useScrollDetection();

  const handleItemClick = (item) => {
    smoothScrollTo(item.href);
  };

  return (
    <motion.div
      className={cn(
        'hidden lg:flex fixed lg:top-6 inset-x-0 z-[210] h-max pointer-events-none justify-center',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : -20 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ pointerEvents: isHeroVisible ? 'auto' : 'none' }}
    >
      <div className="pointer-events-auto flex items-center gap-2 bg-white/5 border border-white/20 backdrop-blur-2xl py-1.5 px-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              aria-label={`Scroll to ${item.name}`}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-all duration-300',
                'text-white/60 hover:text-white hover:bg-white/10 focus:outline-none active:scale-95 group'
              )}
              title={item.name}
            >
              <span className="hidden sm:inline relative z-10">{item.name}</span>
              <span className="sm:hidden relative z-10">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TubeLightNavbar;
