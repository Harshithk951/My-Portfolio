import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Layout, Brain, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ServicesSection = () => {
  const { toast } = useToast();

  const services = [
    {
      icon: Rocket,
      title: 'MVP Development',
      description: 'Turn your startup idea into a working product in weeks. I build functional MVPs that help you validate fast and scale sooner.',
      tags: ['Startups', 'SaaS', 'Rapid Dev'],
      color: 'glow-pink'
    },
    {
      icon: Code,
      title: 'Full Stack Web Apps',
      description: 'Robust, scalable web applications using the latest tech stack. From database design to frontend interactivity, I handle it all.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      color: 'glow-yellow'
    },
    {
      icon: Layout,
      title: 'UI/UX & Frontend',
      description: 'Pixel-perfect, responsive, and animated interfaces that users love. I focus on smooth interactions and accessible design.',
      tags: ['Framer Motion', 'Tailwind', 'Design'],
      color: 'glow-green'
    },
    {
      icon: Brain,
      title: 'Automations & ML',
      description: 'Intelligent automation solutions and ML models to optimize workflows and add smart features to your applications.',
      tags: ['Python', 'AI', 'Automation'],
      color: 'glow-blue'
    }
  ];

  const handleLearnMore = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    toast({
      title: "Interested?",
      description: "Send me a message to discuss your project! 🚀"
    });
  };

  return (
    <section id="services" className="py-20 relative bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            What I Build
          </h2>
          <p className="text-xl text-white/60 font-light">
            Helping founders and businesses bring digital visions to life.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`glow-card ${service.color} p-6 sm:p-7 md:p-8 group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-white" />
                  </div>
                  <button
                    onClick={handleLearnMore}
                    className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    Learn more <ArrowRight size={16} />
                  </button>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium tracking-wide text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;