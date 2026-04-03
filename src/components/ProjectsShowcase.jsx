import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy, Heart, TrendingUp, Users, FileSearch, Palette, Plane, CheckSquare } from 'lucide-react';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { Marquee } from '@/components/ui/marquee';

// ── Project Data ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'ResumeOptima',
    description: 'AI-powered ATS Resume Analyzer with ultra-strict MNC scoring using Google Gemini 3 Pro — glassmorphism UI, JD matcher, and deterministic hybrid scoring engine.',
    tech: ['React 19', 'TypeScript', 'Gemini 3 Pro', 'Tailwind CSS'],
    color: 'glow-pink',
    badge: 'AI Powered 🤖',
    icon: FileSearch,
    repoUrl: 'https://github.com/Harshithk951/ResumeOptima',
    liveUrl: 'https://ats.harshithkumar.in/'
  },
  {
    title: 'Aviation Crew Wellness',
    description: 'Next-gen SaaS platform for crew fatigue management with AI assistant, RBAC portals, real-time wellness tracking, smart rostering, and regulatory compliance.',
    tech: ['React 18', 'TypeScript', 'Gemini AI', 'Tailwind CSS'],
    color: 'glow-blue',
    badge: 'AI Powered 🤖',
    icon: Plane,
    repoUrl: 'https://github.com/Harshithk951/Aviation-crew-fatigue---wellness-app',
    liveUrl: 'https://aviation-crew-fatigue-wellness-app.vercel.app/'
  },
  {
    title: 'Uni-Connect Hub',
    description: 'A comprehensive platform connecting university students with resources, events, and collaboration opportunities. Hackathon Winner 🏆',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    color: 'glow-blue',
    badge: 'Hackathon Winner 🏆',
    icon: Github,
    repoUrl: 'https://github.com/Harshithk951/Uni-Connect-Hub',
    liveUrl: 'https://alumni-connect-nu.vercel.app/'
  },
  {
    title: 'Smart Health Care',
    description: 'Complete clinic management system with patient records, appointment scheduling, and billing integration using modern stack.',
    tech: ['React', 'Express', 'MongoDB', 'Firebase'],
    color: 'glow-green',
    icon: Heart,
    repoUrl: 'https://github.com/Harshithk951/Smart-Health-Care',
    liveUrl: 'https://ramu-clinic.vercel.app/'
  },
  {
    title: 'Smart Sales Agent',
    description: 'AI-powered sales assistant using machine learning to optimize customer interactions and improve conversion rates.',
    tech: ['React', 'Python', 'AI/ML', 'Node.js'],
    color: 'glow-blue',
    icon: TrendingUp,
    repoUrl: 'https://github.com/Harshithk951/sales-intelligence-agent'
  },
  {
    title: 'Achievers Club',
    description: 'An elite community ecosystem for ambitious business leaders — premium dark-themed interface with 3D card tilts, parallax hero, and Supabase-powered contact forms.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    color: 'glow-yellow',
    icon: Users,
    repoUrl: 'https://github.com/Harshithk951/Forever-Achievers-Club-',
    liveUrl: 'https://forever-achievers-club-1.vercel.app/'
  },
  {
    title: 'AuraSpace Interiors',
    description: 'Premium interior design studio website with cinematic parallax effects and Aura — a context-aware AI Design Consultant powered by Google Gemini.',
    tech: ['React 18', 'Tailwind CSS', 'Gemini API', 'Vite'],
    color: 'glow-pink',
    icon: Palette,
    repoUrl: 'https://github.com/Harshithk951/AuraSpace-Interiors',
    liveUrl: 'https://interioir-designs.vercel.app/'
  },
  {
    title: 'To-Do Full Stack',
    description: 'Complete full-stack task management app with JWT authentication, protected routes, MySQL database, and RESTful API — deployed on Vercel + Render.',
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    color: 'glow-green',
    badge: 'Full Stack 🚀',
    icon: CheckSquare,
    repoUrl: 'https://github.com/Harshithk951/To-Do-Full-Stack',
    liveUrl: 'https://to-do-full-stack-tudm.vercel.app'
  }
];

// Split into two rows
const firstRow = PROJECTS.slice(0, Math.ceil(PROJECTS.length / 2));
const secondRow = PROJECTS.slice(Math.ceil(PROJECTS.length / 2));

// ── Single Project Card (memoized) ────────────────────────────────────
const ProjectCard = React.memo(({ project, handleGitHub, handleLive }) => {
  const Icon = project.icon;
  return (
    <div
      className={`glow-card ${project.color} p-6 sm:p-7 md:p-8 flex flex-col w-[320px] sm:w-[380px] md:w-[420px] h-[320px] sm:h-[350px] md:h-[370px] shrink-0 cursor-default select-none`}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="p-3 bg-white/10 rounded-xl">
          {project.badge ? <Trophy size={22} className="text-yellow-400" /> : <Icon size={22} className="text-white" />}
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => handleGitHub(project.repoUrl)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={18} />
          </button>
          {project.liveUrl && (
            <button
              onClick={() => handleLive(project.liveUrl)}
              className="px-2.5 py-2.5 hover:bg-white/10 rounded-full transition-colors text-green-400 hover:text-green-300 flex items-center gap-1.5"
              aria-label={`View ${project.title} live site`}
              title={`Open ${project.title} live site`}
            >
              <ExternalLink size={18} />
              <span className="text-xs font-semibold tracking-wide uppercase">Live</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
        {project.badge && (
          <span className="px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[11px] font-semibold text-yellow-400 whitespace-nowrap">
            {project.badge}
          </span>
        )}
      </div>

      <p className="text-white/65 text-sm sm:text-[15px] mb-5 flex-grow leading-[1.7] line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/75"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// ── Main Component ────────────────────────────────────────────────────
const ProjectsShowcase = () => {
  const handleGitHub = useCallback((repoUrl) => {
    sendAnalyticsEvent('github_click', { url: repoUrl });
    window.open(repoUrl || 'https://github.com/Harshithk951', '_blank', 'noopener,noreferrer');
  }, []);

  const handleLive = useCallback((liveUrl) => {
    sendAnalyticsEvent('project_open', { url: liveUrl });
    window.open(liveUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black/50 backdrop-blur-xl">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            My Creations
          </h2>
          <p className="text-xl text-white/60 font-light">Built with Code & Passion</p>
        </motion.div>
      </div>

      {/* Two-row Marquee */}
      <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden">
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.5rem]">
          {firstRow.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              handleGitHub={handleGitHub}
              handleLive={handleLive}
            />
          ))}
        </Marquee>

        {/* Row 2 — scrolls right (reverse) */}
        <Marquee reverse pauseOnHover className="[--duration:45s] [--gap:1.5rem]">
          {secondRow.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              handleGitHub={handleGitHub}
              handleLive={handleLive}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default ProjectsShowcase;