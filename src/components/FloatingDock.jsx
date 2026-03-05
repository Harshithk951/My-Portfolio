import { useRef, useMemo, memo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Github, Linkedin } from 'lucide-react';

/* ─── Config ─── */
const DEFAULT_SIZE = 40;
const MAGNIFIED_SIZE = 64;
const MAGNIFY_DISTANCE = 140;

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: User, label: 'About', href: '#about' },
  { icon: Briefcase, label: 'Projects', href: '#projects' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

const socialItems = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Harshithk951', isExternal: true },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshith-kumar-dev', isExternal: true },
];

/* ─── Memoized Dock Icon ─── */
const DockIcon = memo(({ icon: Icon, label, href, isExternal, mouseX }) => {
  const ref = useRef(null);

  // Optimized distance calculation with debounced bounds caching
  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return Infinity;
    const bounds = el.getBoundingClientRect();
    return val - (bounds.x + bounds.width / 2);
  });

  // Single spring-driven size animation
  const size = useSpring(
    useTransform(
      distance,
      [-MAGNIFY_DISTANCE, 0, MAGNIFY_DISTANCE],
      [DEFAULT_SIZE, MAGNIFIED_SIZE, DEFAULT_SIZE]
    ),
    {
      mass: 0.1,
      stiffness: 180,
      damping: 20,
      velocity: 0,
    }
  );

  // Icon size derived from parent size
  const iconSize = useTransform(size, (s) => s * 0.45);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [href, isExternal]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      style={{
        width: size,
        height: size,
        WebkitFontSmoothing: 'antialiased',
        willChange: 'width, height, transform',
        transform: 'translateZ(0)',
      }}
      className="relative flex items-center justify-center rounded-xl flex-shrink-0 group outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      aria-label={label}
    >
      {/* Unified glass background - no repeat blur */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-200"
        style={{
          width: iconSize,
          height: iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon className="w-full h-full" />
      </motion.div>

      {/* Tooltip - minimal paint */}
      <div
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none"
        style={{
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transform: 'translateZ(0)',
        }}
      >
        {label}
      </div>
    </motion.button>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if mouseX reference changes
  return prevProps.mouseX === nextProps.mouseX;
});

DockIcon.displayName = 'DockIcon';

/* ─── Dock ─── */
const FloatingDock = () => {
  const mouseX = useMotionValue(Infinity);
  const allItems = useMemo(() => [...navItems, ...socialItems], []);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.pageX);
  }, [mouseX]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(Infinity);
  }, [mouseX]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-3 px-4 py-2.5 pointer-events-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          willChange: 'filter',
          transform: 'translateZ(0)',
        }}
      >
        {navItems.map((item) => (
          <DockIcon key={item.label} mouseX={mouseX} {...item} />
        ))}

        {/* Separator */}
        <div className="w-px self-stretch my-1.5 bg-white/15 mx-1 flex-shrink-0" />

        {socialItems.map((item) => (
          <DockIcon key={item.label} mouseX={mouseX} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

export default FloatingDock;
