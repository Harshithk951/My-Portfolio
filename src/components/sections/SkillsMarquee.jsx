import React, { useMemo } from 'react';
import LogoLoop from '@/components/ui/logo-loop';
import {
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import { Sparkles, Bot, TestTube } from 'lucide-react';

const SKILL_LOGOS = [
  { icon: SiPython, name: 'Python' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiReact, name: 'React' },
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiNodedotjs, name: 'Node.js' },
  { icon: SiFastapi, name: 'FastAPI' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiSqlite, name: 'SQLite' },
  { icon: SiDocker, name: 'Docker' },
  { icon: SiKubernetes, name: 'Kubernetes' },
  { icon: SiGit, name: 'Git' },
  { icon: SiGithub, name: 'GitHub' },
  { icon: FaAws, name: 'AWS' },
  { icon: FaMicrosoft, name: 'Azure' },
  { icon: Sparkles, name: 'LLM APIs' },
  { icon: Bot, name: 'AI Agents' },
  { icon: TestTube, name: 'Model Evaluation' },
];

const SkillsMarquee = () => {
  const logos = useMemo(() => 
    SKILL_LOGOS.map(skill => ({
      node: React.createElement(skill.icon, {
        key: skill.name,
        className: 'text-3xl sm:text-4xl md:text-5xl',
      }),
      title: skill.name,
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
