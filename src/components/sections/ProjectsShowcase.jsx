import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { ExternalLink, Trophy, ShieldCheck, Users, FileSearch, Plane, Bot } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { Marquee } from '@/components/ui/marquee';

// ── Project Data ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'RecoveryOS',
    description: 'AI-driven revenue-recovery system where AI suggestions pass through a rule-based safety layer — risk limits, retry budgets, cooldowns and a kill-switch — before any action. Idempotent webhooks, an execution ledger with reconciliation, and an append-only audit trail. Across 135 failed-payment test cases the AI lane recovered ₹20,726 extra with zero unsafe actions and zero duplicate executions. 232/232 unit tests and 36/36 validation checks passing.',
    tech: ['TypeScript', 'Node.js', 'SQLite', 'REST APIs', 'Docker'],
    color: 'glow-pink',
    badge: 'AI Safety Layer',
    icon: ShieldCheck,
    repoUrl: 'https://github.com/Harshithk951/Ai-Revenue-Recovery'
  },
  {
    title: 'Smart Sales Intelligence Agent',
    description: 'Modular 4-stage AI workflow (Orchestrator → Research → Analysis → Outreach) with per-stage latency, error and usage tracking, plus a Next.js 15 dashboard with real-time execution timelines.',
    tech: ['Python', 'FastAPI', 'Next.js', 'React'],
    color: 'glow-blue',
    badge: 'AI Agent',
    icon: Bot,
    repoUrl: 'https://github.com/Harshithk951/sales-intelligence-agent'
  },
  {
    title: 'ResumeOptima',
    description: 'AI-powered ATS resume analyzer that scores resumes against a job description using an LLM and a deterministic hybrid scoring engine — glassmorphism UI with a JD matcher.',
    tech: ['React 19', 'TypeScript', 'Gemini 3 Pro', 'Tailwind CSS'],
    color: 'glow-pink',
    badge: 'AI Powered 🤖',
    icon: FileSearch,
    repoUrl: 'https://github.com/Harshithk951/ResumeOptima',
    liveUrl: 'https://ats.harshithkumar.in/'
  },
  {
    title: 'Aviation Crew Wellness',
    description: 'SaaS platform for crew fatigue management with an AI assistant, RBAC portals, real-time wellness tracking, smart rostering, and regulatory compliance.',
    tech: ['React 18', 'TypeScript', 'Gemini AI', 'Tailwind CSS'],
    color: 'glow-blue',
    badge: 'AI Powered 🤖',
    icon: Plane,
    repoUrl: 'https://github.com/Harshithk951/Aviation-crew-fatigue---wellness-app',
    liveUrl: 'https://aviation-crew-fatigue-wellness-app.vercel.app/'
  },
  {
    title: 'Uni-Connect Hub',
    description: 'Student-alumni networking platform with role-based access for 200+ users. PostgreSQL joins and indexes tuned from 2.3s to 0.6s (74% faster).',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    color: 'glow-green',
    badge: 'SIH Internal Round',
    icon: Users,
    repoUrl: 'https://github.com/Harshithk951/Uni-Connect-Hub-',
    liveUrl: 'https://alumni-connect-nu.vercel.app/'
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
      className={`glow-card ${project.color} p-6 sm:p-7 md:p-8 flex flex-col w-[320px] sm:w-[380px] md:w-[420px] h-[320px] sm:h-[350px] md:h-[370px] shrink-0 cursor-default select-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
      aria-describedby={`project-desc-${project.title.replaceAll(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex justify-between items-start mb-5">
        <div className="p-3 bg-white/10 rounded-xl">
          {project.badge ? <Trophy size={22} className="text-yellow-400" /> : <Icon size={22} className="text-white" />}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleGitHub(project.repoUrl)}
            className="p-3 hover:bg-white/10 rounded-full transition-colors text-white flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label={`View ${project.title} source code on GitHub`}
            title={`View ${project.title} on GitHub`}
          >
            <FaGithub size={20} />
          </button>
          {project.liveUrl && (
            <button
              onClick={() => handleLive(project.liveUrl)}
              className="px-4 py-2.5 hover:bg-white/10 rounded-full transition-all text-green-400 hover:text-green-300 flex items-center gap-2 min-w-[44px] min-h-[44px] bg-white/5 active:scale-95"
              aria-label={`View ${project.title} live site`}
              title={`Open ${project.title} live site`}
            >
              <ExternalLink size={18} />
              <span className="text-xs font-bold tracking-wider uppercase">Live</span>
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

      <p 
        id={`project-desc-${project.title.replaceAll(/\s+/g, '-').toLowerCase()}`}
        className="text-white/65 text-sm sm:text-[15px] mb-5 flex-grow leading-[1.7] line-clamp-3"
      >
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
        {project.tech.map((tag) => (
          <li
            key={tag}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/75 list-none"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
    badge: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    repoUrl: PropTypes.string.isRequired,
    liveUrl: PropTypes.string
  }).isRequired,
  handleGitHub: PropTypes.func.isRequired,
  handleLive: PropTypes.func.isRequired
};

// ── Main Component ────────────────────────────────────────────────────
const ProjectsShowcase = memo(() => {
  const handleGitHub = useCallback((repoUrl) => {
    sendAnalyticsEvent('github_click', { url: repoUrl });
    globalThis.open(repoUrl || 'https://github.com/Harshithk951', '_blank', 'noopener,noreferrer');
  }, []);

  const handleLive = useCallback((liveUrl) => {
    sendAnalyticsEvent('project_open', { url: liveUrl });
    globalThis.open(liveUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black/50 backdrop-blur-xl">
      {/* Schema.org JSON-LD for Projects */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": PROJECTS.map((project, index) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": project.title,
            "description": project.description,
            "url": project.liveUrl || project.repoUrl,
            "codeRepository": project.repoUrl,
            "keywords": project.tech.join(", ")
          }))
        })}
      </script>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            My Creations
          </h2>
          <p className="text-xl text-white/60 font-light">Built with Code & Passion</p>
        </div>
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
});

ProjectsShowcase.displayName = 'ProjectsShowcase';

export default ProjectsShowcase;