import React from 'react';
import { Github, Linkedin, Mail, Instagram, ArrowUp } from 'lucide-react';
import { smoothScrollTo } from '@/lib/utils';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    smoothScrollTo('#contact');
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tight mb-2 text-white">Let's Connect.</h3>
            <p className="text-white/50">Have an idea? Let's turn it into a reality.</p>
          </div>
          
          <button
            onClick={scrollToContact}
            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
          >
            Say Hello
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-xl mb-1 text-white">Harshith.</h4>
          </div>

          <div className="flex gap-6">
            <SocialIcon href="https://github.com/Harshithk951" icon={Github} />
            <SocialIcon href="https://www.linkedin.com/in/harshith-kumar-dev" icon={Linkedin} />
            <SocialIcon href="mailto:mharshithkumar6@gmail.com" icon={Mail} />
            <SocialIcon href="#" icon={Instagram} />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon: Icon }) => {
  const getLabel = () => {
    if (href.includes('github')) return 'GitHub';
    if (href.includes('linkedin')) return 'LinkedIn';
    if (href.includes('mailto')) return 'Email';
    if (href.includes('instagram')) return 'Instagram';
    return 'Social Link';
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/60 hover:text-white transition-colors hover:scale-110 transform"
      aria-label={getLabel()}
    >
      <Icon size={20} />
    </a>
  );
};

export default Footer;