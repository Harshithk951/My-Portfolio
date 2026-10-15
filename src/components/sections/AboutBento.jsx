import { useRef } from 'react';
import { User, Bot, Microscope, GitPullRequest, Container, Target } from 'lucide-react';

const AboutBento = () => {
  const sectionRef = useRef(null);

  const cards = [
    {
      icon: User,
      title: 'Who I Am',
      description: "Hey, I'm Harshith Kumar Mannepalli, a Computer Science (AI & ML) student at Uttaranchal University in Dehradun, expected May 2027. I build full stack and AI-powered applications.",
      color: 'glow-pink',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: Bot,
      title: 'What I Build',
      description: "LLM-powered applications and AI agents. In RecoveryOS, AI suggestions pass through a rule-based safety layer — risk limits, retry budgets, cooldowns and a kill-switch — before any action runs.",
      color: 'glow-yellow',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: Microscope,
      title: 'Research',
      description: "Two IEEE conference papers: federated continual learning with EWC for IoT edge devices, and AgriCogNet, an explainable ensemble for detecting cognitive fatigue in farm workers.",
      color: 'glow-yellow',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: GitPullRequest,
      title: 'Open Source',
      description: "Five pull requests merged into Cal.com and freeCodeCamp production codebases after maintainer code review — core library logic, CI/CD workflows, automated validation and accessibility fixes.",
      color: 'glow-green',
      colSpan: 'md:col-span-2 lg:col-span-1'
    },
    {
      icon: Container,
      title: 'Engineering Practice',
      description: "Containerized deployment with Docker, Kubernetes and CI/CD, backed by unit testing, API testing, debugging and performance optimization.",
      color: 'glow-blue',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: Target,
      title: "What I'm Looking For",
      description: "An entry-level Software Engineer role focused on AI-driven products, where I can ship safe, evaluated AI systems.",
      color: 'glow-green',
      colSpan: 'md:col-span-1 lg:col-span-1'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative bg-black/50 backdrop-blur-xl" aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-16 text-center">
          <h2 id="about-title" className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            My Journey
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full" aria-hidden="true" />
        </div>

        <div className="journey-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`glow-card ${card.color} p-6 sm:p-7 md:p-8 flex flex-col justify-start group h-full hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors" aria-hidden="true">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">{card.title}</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutBento;