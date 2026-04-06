import React, { useMemo } from 'react';
import LogoLoop from '@/components/ui/logo-loop';
import { 
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTensorflow,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const SKILL_LOGOS = [
  { icon: SiReact, name: 'React' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiPython, name: 'Python' },
  { icon: SiTensorflow, name: 'TensorFlow' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiDocker, name: 'Docker' },
  { icon: SiGit, name: 'Git' },
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiExpress, name: 'Express' },
  { icon: SiTailwindcss, name: 'Tailwind CSS' },
  { icon: SiFigma, name: 'Figma' },
  { icon: FaAws, name: 'AWS' },
];

const SkillsMarquee = () => {
  const logos = useMemo(() => 
    SKILL_LOGOS.map(skill => ({
      node: React.createElement(skill.icon, {
        key: skill.name,
        className: 'text-3xl sm:text-4xl md:text-5xl',
      }),
      title: skill.name,
      href: '#',
    })), 
    []
  );

  return (
    <section id="skills" className="py-12 flex items-center justify-center bg-black/50 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-4">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl header-text text-center mb-16">
          Skill Matrix
        </h2>

        <div className="relative">
          <LogoLoop
            logos={logos}
            speed={80}
            direction="left"
            logoHeight={80}
            gap={60}
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#0b0b0b"
            ariaLabel="Technology skills"
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
