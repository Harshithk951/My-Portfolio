import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { smoothScrollTo } from '@/lib/utils';

const Hero = () => {
  const { toast } = useToast();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['solves', 'builds', 'designs', 'creates', 'transforms'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    // Create a link to download the CV
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Path to your CV file in the public folder
    link.download = 'Harshith_Kumar_CV.pdf'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CV Download",
      description: "Your CV download has started! 📄",
    });
  };

  const scrollToContact = () => {
    smoothScrollTo('#contact');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0b0b]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#111] to-[#0b0b0b] z-10" />
        <div 
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center',
            willChange: 'transform'
          }}
        >
          <motion.div 
            animate={{ y: [0, 50] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-full h-full"
          />
        </div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0b0b_100%)] z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-amber-500 animate-pulse" />
              <span className="text-xs font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400 uppercase">
                Digital Creator & Engineer
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              Hey, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                Harshith
              </span>
            </h1>

            <div className="text-xl sm:text-2xl text-white/60 font-light flex flex-wrap items-center gap-2">
              <span>I am a guy who</span>
              <motion.span 
                key={currentWord}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="px-3 py-1 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {words[currentWord]}
              </motion.span>
              <span>complex problems.</span>
            </div>

            <p className="text-lg text-white/50 max-w-lg leading-relaxed">
              AI/ML Student | Full Stack Developer | Building Digital Experiences that merge creativity with engineering precision.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={scrollToContact}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Hire Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={handleDownloadCV}
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2 active:scale-95"
              >
                Download CV <Download size={20} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-sm aspect-[3/4] group will-change-transform"
            >
              {/* Back Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-amber-600/30 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-700 opacity-60" />
              
              {/* Glass Card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#111]/80 backdrop-blur-xl shadow-2xl transition-all duration-500 group-hover:border-white/20">
                <img
                  src="/hero-profile.jpg"
                  alt="Harshith Kumar professional headshot"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-xl">Harshith Kumar</h3>
                      <p className="text-white/60 text-sm">Full Stack Developer</p>
                    </div>
                    
                    <button
                      onClick={scrollToContact}
                      className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-colors backdrop-blur-sm"
                      aria-label="Contact Me"
                    >
                      <Mail size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;