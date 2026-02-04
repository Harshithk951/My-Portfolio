import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SkillUniverse = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const skills = [
    'react', 'nodejs', 'python', 'tensorflow', 'mongodb', 
    'postgresql', 'docker', 'git', 'javascript', 'typescript',
    'nextjs', 'express', 'tailwindcss', 'figma', 'aws'
  ];

  const fibonacciSphere = (samples) => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push({ x, y, z });
    }
    return points;
  };

  const [positions] = useState(() => fibonacciSphere(skills.length));

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current = {
        x: e.clientX - centerX,
        y: e.clientY - centerY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const distance = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
      const maxDistance = 400;
      const speedMultiplier = Math.min(distance / maxDistance, 1) * 2;

      rotationRef.current.y += 0.002 * (1 + speedMultiplier);
      rotationRef.current.x += 0.001 * speedMultiplier;

      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;

        const pos = positions[i];
        const rotatedX = pos.x * Math.cos(rotationRef.current.y) - pos.z * Math.sin(rotationRef.current.y);
        const rotatedZ = pos.x * Math.sin(rotationRef.current.y) + pos.z * Math.cos(rotationRef.current.y);
        const rotatedY = pos.y * Math.cos(rotationRef.current.x) - rotatedZ * Math.sin(rotationRef.current.x);
        const finalZ = pos.y * Math.sin(rotationRef.current.x) + rotatedZ * Math.cos(rotationRef.current.x);

        const scale = (finalZ + 2) / 3;
        const translateX = rotatedX * 200;
        const translateY = rotatedY * 200;

        icon.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
        icon.style.opacity = scale;
        icon.style.zIndex = Math.floor(scale * 100);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [positions]);

  return (
    <section id="skills" className="min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl lg:text-7xl header-text text-center mb-16"
        >
          Skill Universe
        </motion.h2>

        <div
          ref={containerRef}
          className="relative w-full h-[500px] flex items-center justify-center"
        >
          {skills.map((skill, i) => (
            <div
              key={skill}
              ref={(el) => (iconsRef.current[i] = el)}
              className="absolute w-16 h-16 transition-opacity duration-300"
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill}`}
                alt={skill}
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillUniverse;