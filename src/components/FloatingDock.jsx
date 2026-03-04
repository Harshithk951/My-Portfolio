import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, Github, Linkedin } from 'lucide-react';

/* ─── Config ─── */
const DEFAULT_SIZE = 40;       // base icon container size (px)
const MAGNIFIED_SIZE = 64;     // magnified icon container size (px)
const MAGNIFY_DISTANCE = 140;  // px range of magnetic effect

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

/* ─── Dock ─── */
const FloatingDock = () => {
  // Shared mouseX for neighbor magnification (macOS-style)
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:block">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 px-4 py-2.5"
        style={{
          // Crystal-clear glassmorphism
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
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

/* ─── Dock Icon ─── */
const DockIcon = ({ icon: Icon, label, href, isExternal, mouseX }) => {
  const ref = useRef(null);

  // Distance from mouse to this icon's center
  const distance = useTransform(mouseX, (val) => {
    const el = ref.current;
    if (!el) return Infinity;
    const bounds = el.getBoundingClientRect();
    return val - (bounds.x + bounds.width / 2);
  });

  // Map distance → size: center = magnified, edges = base
  const sizeTransform = useTransform(
    distance,
    [-MAGNIFY_DISTANCE, 0, MAGNIFY_DISTANCE],
    [DEFAULT_SIZE, MAGNIFIED_SIZE, DEFAULT_SIZE]
  );

  // Smooth spring animation
  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  // Icon inner size scales proportionally
  const iconSize = useTransform(size, (s) => s * 0.45);

  const handleClick = (e) => {
    e.preventDefault();
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.85 }}
      className="relative flex items-center justify-center rounded-xl transition-colors group"
      aria-label={label}
    >
      {/* Glass icon background */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-150"
        style={{ width: iconSize, height: iconSize }}
      >
        <Icon className="w-full h-full" />
      </motion.div>

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1 select-none"
        style={{
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        {label}
      </span>
    </motion.button>
  );
};

export default FloatingDock;
