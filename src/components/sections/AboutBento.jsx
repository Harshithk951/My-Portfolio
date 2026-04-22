import { useRef } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Zap, ArrowRight, Code, Rocket } from 'lucide-react';

const AboutBento = () => {
  const sectionRef = useRef(null);

  const cards = [
    {
      icon: User,
      title: 'Who I Am',
      description: "Hey, I'm Harshith Kumar Mannepally, an AI/ML Student at Uttaranchal University. I'm a passionate developer who loves turning ideas into reality.",
      color: 'glow-pink',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: MapPin,
      title: 'My Roots',
      description: "Growing up in Hyderabad and adapting to new environments shaped my resilience. It taught me to embrace change and find opportunity in every challenge.",
      color: 'glow-yellow',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: Zap,
      title: 'The Spark',
      description: "My journey began at Dilsukhnagar Public School, where curiosity met discipline. Early exposure to computers ignited a lifelong passion for technology.",
      color: 'glow-yellow',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: ArrowRight,
      title: 'The Transition',
      description: "Sri Chaitanya Jr College helped me mature, stay disciplined, and focus on my goals. It was a period of rigorous preparation and mental fortitude.",
      color: 'glow-green',
      colSpan: 'md:col-span-2 lg:col-span-1'
    },
    {
      icon: Code,
      title: 'The Pivot',
      description: "Uttaranchal University was the turning point where I dove deep into AI/ML and Full Stack Dev. Here, I started building real-world projects.",
      color: 'glow-blue',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      icon: Rocket,
      title: 'The Mission',
      description: "Growing as a Developer, Creator & Entrepreneur. My mission is to build solutions that impact lives and drive innovation in the tech ecosystem.",
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
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article
                key={index}
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