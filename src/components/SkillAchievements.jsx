import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Brain, Sparkles } from 'lucide-react';

const SkillsAchievements = () => {
  const skills = [
    {
      title: 'Full Stack Development',
      description: 'Building scalable web applications with modern frameworks',
      icon: Code,
      color: 'glow-pink'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Developing intelligent systems and ML models',
      icon: Brain,
      color: 'glow-yellow'
    },
    {
      title: 'Web Development',
      description: 'Creating responsive and performant web experiences',
      icon: Sparkles,
      color: 'glow-green'
    }
  ];

  const achievements = [
    {
      title: 'Oracle Gen AI Certified',
      description: 'Certified in Oracle Generative AI Professional',
      color: 'glow-blue'
    },
    {
      title: 'SHL Scorer - 89%',
      description: 'Achieved 89% in SHL Assessment',
      color: 'glow-pink'
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl header-text mb-4">Skills & Achievements</h2>
          <p className="text-white/70 font-light text-lg">Expertise and recognitions</p>
        </motion.div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={`glow-card ${skill.color} p-8 text-center`}
                >
                  <div className="flex justify-center mb-4">
                    <Icon size={48} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                  <p className="text-white/70 font-light">{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`glow-card ${achievement.color} p-8 text-center`}
              >
                <div className="flex justify-center mb-4">
                  <Award size={48} />
                </div>
                <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                <p className="text-white/70 font-light">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAchievements;