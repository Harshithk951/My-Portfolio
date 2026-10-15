import React from 'react';
import { Bot, FileText, Layers, Container, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ServicesSection = () => {
  const { toast } = useToast();

  const services = [
    {
      icon: Bot,
      title: 'LLM & AI Agent Development',
      description: 'Design and ship LLM-powered applications and AI agents, with rule-based safety layers that keep automated actions within defined limits.',
      tags: ['LLM APIs', 'AI Agents', 'FastAPI'],
      color: 'glow-pink'
    },
    {
      icon: FileText,
      title: 'AI Research & Paper Writing',
      description: 'Applied AI research authored in LaTeX/Overleaf, including two IEEE conference papers on federated continual learning and cognitive-fatigue detection.',
      tags: ['IEEE', 'LaTeX', 'Overleaf'],
      color: 'glow-yellow'
    },
    {
      icon: Layers,
      title: 'Full-Stack AI Products',
      description: 'End-to-end AI products: FastAPI backends, Next.js and React frontends, backed by PostgreSQL.',
      tags: ['FastAPI', 'Next.js', 'PostgreSQL'],
      color: 'glow-green'
    },
    {
      icon: Container,
      title: 'Containerized Deployment & CI/CD',
      description: 'Containerized deployment and CI/CD pipelines with Docker, Kubernetes, GitHub Actions and Microsoft Azure.',
      tags: ['Docker', 'Kubernetes', 'Azure'],
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
    <section id="services" className="py-20 relative bg-black/50 backdrop-blur-xl" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            What I Build
          </h2>
          <p className="text-xl text-white/60 font-light">
            Helping founders and businesses bring digital visions to life.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`glow-card ${service.color} p-6 sm:p-7 md:p-8 group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <Icon size={32} className="text-white" />
                  </div>
                  <button
                    onClick={handleLearnMore}
                    className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium tracking-wide text-white/80 list-none"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;