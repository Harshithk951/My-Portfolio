import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy, Heart, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProjectsShowcase = () => {
  const { toast } = useToast();

  const projects = [
    {
      title: 'Uni-Connect Hub',
      description: 'A comprehensive platform connecting university students with resources, events, and collaboration opportunities. Hackathon Winner 🏆',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      color: 'glow-pink',
      badge: 'Hackathon Winner 🏆',
      icon: Github
    },
    {
      title: 'Smart Health Care',
      description: 'Complete clinic management system with patient records, appointment scheduling, and billing integration using modern stack.',
      tech: ['React', 'Express', 'MongoDB', 'Firebase'],
      color: 'glow-yellow',
      icon: Heart
    },
    {
      title: 'Smart Sales Agent',
      description: 'AI-powered sales assistant using machine learning to optimize customer interactions and improve conversion rates.',
      tech: ['React', 'Python', 'AI/ML', 'Node.js'],
      color: 'glow-blue',
      icon: TrendingUp
    }
  ];

  const handleGitHub = () => {
    setTimeout(() => {
      window.open('https://github.com/Harshithk951', '_blank');
    }, 0);
  };

  const handleAction = (action) => {
    toast({
      title: "Coming Soon",
      description: `The ${action} link will be available shortly! 🚀`
    });
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-[#0b0b0b]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`glow-card ${project.color} p-6 sm:p-7 md:p-8 flex flex-col h-full`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  {project.badge ? <Trophy size={24} className="text-yellow-400" /> : <project.icon size={24} className="text-white" />}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleGitHub}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    title="View on GitHub"
                    aria-label="View project on GitHub"
                  >
                    <Github size={20} />
                  </button>
                  <button
                    onClick={() => handleAction('demo')}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    aria-label="View live demo"
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {project.title}
              </h3>

              <p className="text-white/70 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;