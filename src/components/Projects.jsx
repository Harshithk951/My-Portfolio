import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Projects = () => {
  const { toast } = useToast();

  const projects = [
    {
      title: 'Uni-Connect Hub',
      description: 'A comprehensive platform connecting university students with resources, events, and collaboration opportunities.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      color: 'glow-pink',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    },
    {
      title: 'Ramu Clinic Management',
      description: 'Complete clinic management system with patient records, appointment scheduling, and billing integration.',
      tech: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Prisma'],
      color: 'glow-yellow',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
    },
    {
      title: 'Smart Sales Agent',
      description: 'AI-powered sales assistant using machine learning to optimize customer interactions and improve conversion rates.',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      color: 'glow-blue',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    }
  ];

  const handleLinkClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet",
      description: "You can request it in your next prompt! 🚀"
    });
  };

  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl header-text mb-4">Featured Projects</h2>
          <p className="text-white/70 font-light text-lg">Building solutions that make a difference</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glow-card overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-white/70 font-light mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                  <button
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;