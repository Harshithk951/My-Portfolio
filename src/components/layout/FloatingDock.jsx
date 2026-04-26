import { memo, useCallback } from 'react';
import { smoothScrollTo } from '@/lib/utils';
import { Home, User, Briefcase, Code, Mail, Github, Linkedin } from 'lucide-react';
import MacOSDock from '@/components/ui/mac-os-dock';

const FloatingDock = memo(() => {
  const dockItems = [
    { id: 'home', name: 'Home', icon: Home, href: '#home' },
    { id: 'about', name: 'About', icon: User, href: '#about' },
    { id: 'projects', name: 'Projects', icon: Briefcase, href: '#projects' },
    { id: 'skills', name: 'Skills', icon: Code, href: '#skills' },
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
      smoothScrollTo(app.href);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav aria-label="Quick Navigation Dock" className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="pointer-events-auto">
        <MacOSDock 
          apps={dockItems}
          onAppClick={handleAppClick}
          openApps={[]}
        />
      </div>
    </nav>
  );
});

FloatingDock.displayName = 'FloatingDock';

export default FloatingDock;
