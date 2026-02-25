import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { ExternalLink, Github, Trophy, Heart, TrendingUp, Users, FileSearch, Palette, Plane, CheckSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// ── Project Data (hoisted — no re-creation) ──────────────────────────
const PROJECTS = [
  {
    title: 'ResumeOptima',
    description: 'AI-powered ATS Resume Analyzer with ultra-strict MNC scoring using Google Gemini 3 Pro — glassmorphism UI, JD matcher, and deterministic hybrid scoring engine.',
    tech: ['React 19', 'TypeScript', 'Gemini 3 Pro', 'Tailwind CSS'],
    color: 'glow-pink',
    badge: 'AI Powered 🤖',
    icon: FileSearch,
    repoUrl: 'https://github.com/Harshithk951/ResumeOptima',
    demoUrl: 'https://ats.harshithkumar.in/'
  },
  {
    title: 'Aviation Crew Wellness',
    description: 'Next-gen SaaS platform for crew fatigue management with AI assistant, RBAC portals, real-time wellness tracking, smart rostering, and regulatory compliance.',
    tech: ['React 18', 'TypeScript', 'Gemini AI', 'Tailwind CSS'],
    color: 'glow-blue',
    badge: 'AI Powered 🤖',
    icon: Plane,
    repoUrl: 'https://github.com/Harshithk951/Aviation-crew-fatigue---wellness-app',
    demoUrl: 'https://aviation-crew-fatigue-wellness-app.vercel.app/'
  },
  {
    title: 'Uni-Connect Hub',
    description: 'A comprehensive platform connecting university students with resources, events, and collaboration opportunities. Hackathon Winner 🏆',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    color: 'glow-blue',
    badge: 'Hackathon Winner 🏆',
    icon: Github,
    repoUrl: 'https://github.com/Harshithk951/Uni-Connect-Hub'
  },
  {
    title: 'Smart Health Care',
    description: 'Complete clinic management system with patient records, appointment scheduling, and billing integration using modern stack.',
    tech: ['React', 'Express', 'MongoDB', 'Firebase'],
    color: 'glow-green',
    icon: Heart,
    repoUrl: 'https://github.com/Harshithk951/Smart-Health-Care'
  },
  {
    title: 'Smart Sales Agent',
    description: 'AI-powered sales assistant using machine learning to optimize customer interactions and improve conversion rates.',
    tech: ['React', 'Python', 'AI/ML', 'Node.js'],
    color: 'glow-blue',
    icon: TrendingUp,
    repoUrl: 'https://github.com/Harshithk951/Smart-Sales-Agent'
  },
  {
    title: 'Achievers Club',
    description: 'An elite community ecosystem for ambitious business leaders — premium dark-themed interface with 3D card tilts, parallax hero, and Supabase-powered contact forms.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    color: 'glow-yellow',
    icon: Users,
    repoUrl: 'https://github.com/Harshithk951/Forever-Achievers-Club-',
    demoUrl: 'https://forever-achievers-club-1.vercel.app/'
  },
  {
    title: 'AuraSpace Interiors',
    description: 'Premium interior design studio website with cinematic parallax effects and Aura — a context-aware AI Design Consultant powered by Google Gemini.',
    tech: ['React 18', 'Tailwind CSS', 'Gemini API', 'Vite'],
    color: 'glow-pink',
    icon: Palette,
    repoUrl: 'https://github.com/Harshithk951/AuraSpace-Interiors',
    demoUrl: 'https://interioir-designs.vercel.app/'
  },
  {
    title: 'To-Do Full Stack',
    description: 'Complete full-stack task management app with JWT authentication, protected routes, MySQL database, and RESTful API — deployed on Vercel + Render.',
    tech: ['React', 'Node.js', 'Express', 'MySQL'],
    color: 'glow-green',
    badge: 'Full Stack 🚀',
    icon: CheckSquare,
    repoUrl: 'https://github.com/Harshithk951/To-Do-Full-Stack',
    demoUrl: 'https://to-do-full-stack-tudm.vercel.app'
  }
];

// ── Card width constants (match Tailwind classes) ─────────────────────
const CARD_WIDTH = 440;   // w-[440px]
const CARD_GAP = 36;      // gap-9
const SCROLL_SPEED = 45;  // seconds per full set

// ── Single Project Card (memoized) ────────────────────────────────────
const ProjectCard = React.memo(({ project, onHover, onLeave, handleGitHub, handleDemo }) => {
  const Icon = project.icon;
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={onLeave}
      className={`glow-card ${project.color} p-7 sm:p-8 md:p-9 flex flex-col w-[440px] min-w-[440px] h-[380px] shrink-0 cursor-default select-none`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-3.5 bg-white/10 rounded-xl">
          {project.badge ? <Trophy size={24} className="text-yellow-400" /> : <Icon size={24} className="text-white" />}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleGitHub(project.repoUrl)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-white"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={20} />
          </button>
          <button
            onClick={() => handleDemo(project.demoUrl, project.title)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-colors text-green-400 hover:text-green-300"
            aria-label={project.demoUrl ? `View ${project.title} live demo` : 'Demo coming soon'}
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        {project.badge && (
          <span className="px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[11px] font-semibold text-yellow-400 whitespace-nowrap">
            {project.badge}
          </span>
        )}
      </div>

      <p className="text-white/65 text-[15px] mb-6 flex-grow leading-[1.7] line-clamp-3">
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
  const { toast } = useToast();
  const controls = useAnimationControls();
  const trackRef = useRef(null);
  const isPausedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Duplicate array for seamless loop
  const duplicated = [...PROJECTS, ...PROJECTS];
  const singleSetWidth = PROJECTS.length * (CARD_WIDTH + CARD_GAP);

  const handleGitHub = useCallback((repoUrl) => {
    window.open(repoUrl || 'https://github.com/Harshithk951', '_blank', 'noopener,noreferrer');
  }, []);

  const handleDemo = useCallback((demoUrl, title) => {
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: 'Coming Soon', description: `The ${title} demo will be available shortly! 🚀` });
    }
  }, [toast]);

  // Start / resume the infinite scroll
  const startScroll = useCallback(() => {
    if (isPausedRef.current) return;
    controls.start({
      x: -singleSetWidth,
      transition: {
        x: { duration: SCROLL_SPEED, ease: 'linear' }
      }
    }).then(() => {
      if (!isPausedRef.current) {
        // Instantly reset to 0 and restart - no visible jump due to duplicated content
        controls.set({ x: 0 });
        startScroll();
      }
    });
  }, [controls, singleSetWidth]);

  const pauseScroll = useCallback(() => {
    isPausedRef.current = true;
    controls.stop();
  }, [controls]);

  const resumeScroll = useCallback(() => {
    isPausedRef.current = false;
    // Read current position and animate remaining distance
    const track = trackRef.current;
    if (!track) return;
    const style = getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    const currentX = matrix.m41;
    // Wrap into range [0, singleSetWidth)
    const wrapped = ((currentX % singleSetWidth) + singleSetWidth) % singleSetWidth;
    const remaining = singleSetWidth - wrapped;
    const remainingRatio = remaining / singleSetWidth;

    controls.start({
      x: [currentX, currentX - remaining],
      transition: {
        x: { duration: SCROLL_SPEED * remainingRatio, ease: 'linear' }
      }
    }).then(() => {
      if (!isPausedRef.current) {
        // Instantly reset and restart loop
        controls.set({ x: 0 });
        startScroll();
      }
    });
  }, [controls, singleSetWidth, startScroll]);

  // IntersectionObserver — only animate in viewport
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          isPausedRef.current = false;
          controls.set({ x: 0 });
          startScroll();
        } else {
          controls.stop();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [controls, startScroll]);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-[#0b0b0b]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4 text-white">
            My Creations
          </h2>
          <p className="text-xl text-white/60 font-light">Built with Code & Passion</p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        {/* Gradient fade — left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
        {/* Gradient fade — right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            animate={controls}
            className="flex gap-9 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {duplicated.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
                onHover={pauseScroll}
                onLeave={resumeScroll}
                handleGitHub={handleGitHub}
                handleDemo={handleDemo}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;