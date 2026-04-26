import React from 'react';
import { Home, User, Briefcase, Brain, Mail } from 'lucide-react';
import { TubeLightNavbar } from '@/components/ui/tube-light-navbar';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Brain },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav aria-label="Main Navigation">
      <TubeLightNavbar items={navItems} />
    </nav>
  );
};

export default Navbar;