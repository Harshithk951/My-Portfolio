import { Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from '@/components/shared/ContactForm';
import { sendAnalyticsEvent } from '@/lib/analytics';

const CTASection = () => {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email Me',
      value: 'mharshithkumar6@gmail.com',
      href: 'mailto:mharshithkumar6@gmail.com',
      color: 'glow-pink'
    },
    {
      icon: Phone,
      label: 'Call Me',
      value: 'Available on request',
      href: 'mailto:mharshithkumar6@gmail.com?subject=Phone%20Number%20Request',
      color: 'glow-green'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: '@Harshithk951',
      href: 'https://github.com/Harshithk951',
      color: 'glow-blue'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'Harshith Kumar',
      href: 'https://www.linkedin.com/in/harshith-kumar-dev',
      color: 'glow-yellow'
    }
  ];

  return (
    <section id="contact" className="py-20 relative bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 leading-tight text-white">
            Let&apos;s Build Something<br className="hidden sm:block" />Awesome Together 🚀
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            I&apos;m open for freelance projects, collaborations, and startup partnerships.
          </p>
        </div>

        <div className="cta-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Info Grid */}
          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => sendAnalyticsEvent(
                    item.label === 'GitHub' ? 'github_click' : 'contact_click',
                    { label: item.label, value: item.value }
                  )}
                  className={`glow-card ${item.color} p-5 sm:p-6 flex items-center gap-4 group cursor-pointer min-h-[80px]`}
                >
                  <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium text-white/90 group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 lg:col-span-2 glow-card glow-blue p-6 sm:p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl font-bold mb-8 text-white">Get in Touch</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;