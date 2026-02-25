import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LOAD_DURATION = 1000; // ms — finishes before the 1200ms unmount

const LoadingAnimation = () => {
  const [percent, setPercent] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      // Ease-out curve: fast start, slow finish — feels like real boot
      const raw = Math.min(elapsed / LOAD_DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setPercent(Math.round(eased * 100));

      if (raw < 1) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const isDone = percent >= 100;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white"
        style={{ fontFamily: "'Roboto Flex', sans-serif", fontWeight: 1000 }}
      >
        HARSHITH
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${percent}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        {/* Percentage / SYSTEM_READY */}
        <div className="flex items-center gap-3">
          {isDone ? (
            <>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                ))}
              </div>
              <span className="text-sm font-mono text-green-500 tracking-widest">SYSTEM_READY</span>
            </>
          ) : (
            <span className="text-sm font-mono text-green-500/80 tracking-widest tabular-nums">
              LOADING {percent}%
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;