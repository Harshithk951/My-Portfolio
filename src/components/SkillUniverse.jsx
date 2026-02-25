import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Skill icon SVG fallbacks — renders a styled badge if the external image fails
const SkillIcon = React.memo(({ skill }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full rounded-xl bg-white/10 border border-white/20 flex items-center justify-center select-none"
        title={skill}
      >
        <span className="text-[10px] sm:text-xs font-bold text-white/80 uppercase tracking-tight leading-none text-center px-1">
          {skill.length > 6 ? skill.slice(0, 4) : skill}
        </span>
      </div>
    );
  }

  return (
    <img
      src={`https://skillicons.dev/icons?i=${skill}&theme=dark`}
      alt={skill}
      loading="eager"
      decoding="async"
      width={48}
      height={48}
      className="w-full h-full rounded-xl"
      onError={() => setHasError(true)}
    />
  );
});

SkillIcon.displayName = 'SkillIcon';

// Hoisted outside component — no re-creation on render
const SKILLS = [
  'react', 'nodejs', 'python', 'tensorflow', 'mongodb',
  'postgresql', 'docker', 'git', 'javascript', 'typescript',
  'nextjs', 'express', 'tailwindcss', 'figma', 'aws'
];

const fibonacciSphere = (samples) => {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius
    });
  }
  return points;
};

const POSITIONS = fibonacciSphere(SKILLS.length);

const SkillUniverse = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const isVisibleRef = useRef(false);

  // Responsive sphere radius based on container size
  const getRadius = useCallback(() => {
    if (!containerRef.current) return 140;
    const width = containerRef.current.offsetWidth;
    if (width < 400) return 100;   // mobile
    if (width < 640) return 130;   // small
    if (width < 768) return 160;   // medium
    return 200;                     // desktop
  }, []);

  // Mouse tracking (desktop only — skip on touch devices)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - (rect.left + rect.width / 2),
        y: e.clientY - (rect.top + rect.height / 2)
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop + IntersectionObserver (single effect to keep `animate` in scope)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }

      const distance = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
      const speedMultiplier = Math.min(distance / 400, 1) * 1.5;

      rotationRef.current.y += 0.0015 * (1 + speedMultiplier);
      rotationRef.current.x += 0.0008 * speedMultiplier;

      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const sphereRadius = getRadius();

      for (let i = 0; i < iconsRef.current.length; i++) {
        const icon = iconsRef.current[i];
        if (!icon) continue;

        const pos = POSITIONS[i];
        const rotatedX = pos.x * cosY - pos.z * sinY;
        const rotatedZ = pos.x * sinY + pos.z * cosY;
        const rotatedY = pos.y * cosX - rotatedZ * sinX;
        const finalZ = pos.y * sinX + rotatedZ * cosX;

        const scale = (finalZ + 2) / 3;
        const tx = rotatedX * sphereRadius;
        const ty = rotatedY * sphereRadius;

        icon.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        icon.style.opacity = Math.max(scale, 0.15);
        icon.style.zIndex = Math.floor(scale * 100);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Start immediately
    isVisibleRef.current = true;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [getRadius]);

  return (
    <section id="skills" className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl header-text text-center mb-16"
        >
          Skill Universe
        </motion.h2>

        <div
          ref={containerRef}
          className="relative w-full h-[320px] xs:h-[360px] sm:h-[420px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
        >
          {SKILLS.map((skill, i) => (
            <div
              key={skill}
              ref={(el) => (iconsRef.current[i] = el)}
              className="absolute w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 will-change-transform"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <SkillIcon skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillUniverse;