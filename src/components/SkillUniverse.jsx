import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconCloud } from '@/components/ui/icon-cloud';

// Same skill set — mapped to Simple Icons CDN for colored SVGs
const SKILLS = [
  'react', 'nodedotjs', 'python', 'tensorflow', 'mongodb',
  'postgresql', 'docker', 'git', 'javascript', 'typescript',
  'nextdotjs', 'express', 'tailwindcss', 'figma', 'amazonaws',
];

const SkillUniverse = () => {
  const images = useMemo(
    () => SKILLS.map((slug) => `https://cdn.simpleicons.org/${slug}`),
    []
  );

  return (
    <section id="skills" className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl header-text text-center mb-16"
        >
          Skill Universe
        </motion.h2>

        <IconCloud
          images={images}
          className="w-full h-[320px] xs:h-[360px] sm:h-[420px] md:h-[500px] lg:h-[600px]"
        />
      </div>
    </section>
  );
};

export default SkillUniverse;