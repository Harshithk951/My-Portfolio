import { useCallback } from 'react';
import { Home, User, Briefcase, Brain, Mail, Github, Linkedin } from 'lucide-react';
import MacOSDock from './ui/mac-os-dock';

const FloatingDock = () => {
  const dockItems = [
    { id: 'home', name: 'Home', icon: Home, href: '#home' },
    { id: 'about', name: 'About', icon: User, href: '#about' },
    { id: 'projects', name: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'skills', name: 'Skills', icon: Brain, href: '#skills' },
    { id: 'contact', name: 'Contact', icon: Mail, href: '#contact' },
    { id: 'github', name: 'GitHub', icon: Github, href: 'https://github.com/Harshithk951', isExternal: true },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/harshith-kumar-dev', isExternal: true },
  ];

  const handleAppClick = useCallback((appId) => {
    const app = dockItems.find(item => item.id === appId);
    if (!app) return;

    if (app.isExternal) {
      window.open(app.href, '_blank', 'noopener,noreferrer');
    } else {
      const element = document.querySelector(app.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex pointer-events-none">
      <div className="pointer-events-auto">
        <MacOSDock 
          apps={dockItems}
          onAppClick={handleAppClick}
          openApps={[]}
        />
      </div>
    </div>
  );
};

export default FloatingDock;
