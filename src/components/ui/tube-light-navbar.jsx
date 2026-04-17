import React, { useEffect, useState } from 'react';
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
      <div className="pointer-events-auto flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-xl py-1 px-2 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              aria-label={`Scroll to ${item.name}`}
              className={cn(
                'relative cursor-pointer text-sm font-medium px-4 sm:px-6 py-2 rounded-full transition-colors',
                'text-white/70 hover:text-white focus:outline-none'
              )}
              title={item.name}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">
                <Icon size={20} strokeWidth={2} />
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TubeLightNavbar;
