import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

import { Home, User, Briefcase, Code, Mail, Github, Linkedin } from 'lucide-react';

const FloatingDock = () => {
  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Projects', href: '#projects' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: Mail, label: 'Contact', href: '#contact' }
  ];

const socialItems = [
  { icon: Github, label: 'GitHub', href: 'https://github.com', isExternal: true },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', isExternal: true },
  
];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20"
      >
        {navItems.map((item) => (
          <DockIcon key={item.label} {...item} />
        ))}
        <div className="w-px h-8 bg-white/20 mx-2" />
        {socialItems.map((item) => (
          <DockIcon key={item.label} {...item} isExternal />
        ))}
      </motion.div>
    </div>
  );
};

const DockIcon = ({ icon: Icon, label, href, isExternal }) => {
  const mouseX = useMotionValue(0);
  const distance = useTransform(mouseX, [-100, 0, 100], [40, 70, 40]);
  const size = useSpring(distance, { stiffness: 300, damping: 20 });

  const handleClick = (e, href, isExternal) => {
    e.preventDefault(); // 🔒 prevents page reload

    if (isExternal) {
      window.open(href, '_blank');
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      type="button" // 🔒 critical fix
      onClick={(e) => handleClick(e, href, isExternal)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
      }}
      onMouseLeave={() => mouseX.set(0)}
      style={{ width: size, height: size }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center text-white/80 hover:text-white transition-colors rounded-xl relative group"
      aria-label={label}
    >
      <Icon size={20} />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </motion.button>
  );
};

DockIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isExternal: PropTypes.bool
};

export default FloatingDock;
