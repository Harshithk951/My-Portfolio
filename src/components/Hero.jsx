import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { smoothScrollTo } from '@/lib/utils';
import { CometCard } from '@/components/ui/comet-card';

const WORDS = ['solves', 'builds', 'designs', 'creates', 'transforms'];

const Hero = () => {
  const { toast } = useToast();
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = async () => {
    try {
      // Verify file exists before attempting download
      const res = await fetch('/cv.pdf', { method: 'HEAD' });
      if (!res.ok) {
        toast({
          title: "CV Unavailable",
          description: "The CV file is currently being updated. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Harshith_Kumar_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "CV Download",
        description: "Your CV download has started! 📄",
      });
    } catch {
      toast({
        title: "Download Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToContact = () => {
    smoothScrollTo('#contact');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0b0b] px-4 sm:px-6 lg:px-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#111] to-[#0b0b0b] z-10" />
        <div
          className="absolute inset-0 z-0 opacity-[0.08] hidden sm:block animate-grid-scroll"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center',
            willChange: 'background-position'
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0b0b_100%)] z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full relative z-20 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 lg:gap-16 xl:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-5 sm:space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-amber-500 animate-pulse" />
              <span className="text-[10px] sm:text-sm font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400 uppercase">
                AI-First Full Stack Engineer
              </span>
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.9]">
              Hey, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                Harshith
              </span>
            </h1>

            <div className="text-base xs:text-lg sm:text-2xl md:text-3xl text-white/60 font-light flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span>I am a guy who</span>
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white text-black font-bold text-base sm:text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {WORDS[currentWord]}
                </motion.span>
              </span>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              AI/ML Student | Full Stack Developer | Building Digital Experiences that merge creativity with engineering precision.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col xs:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 pt-3 sm:pt-5 w-full"
            >
              <button
                onClick={scrollToContact}
                className="group relative px-7 py-3.5 sm:px-10 sm:py-5 bg-white text-black rounded-full font-bold text-base sm:text-xl overflow-hidden transition-transform hover:scale-105 active:scale-95 will-change-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  Hire Me <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px] group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={handleDownloadCV}
                className="px-7 py-3.5 sm:px-10 sm:py-5 bg-transparent border border-white/20 text-white rounded-full font-medium text-base sm:text-xl hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Download CV <Download size={20} className="sm:w-[22px] sm:h-[22px]" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Comet Card Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <CometCard>
              <div
                className="flex w-[260px] xs:w-[300px] sm:w-[360px] lg:w-[340px] xl:w-[380px] cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-1.5 sm:p-2 md:p-4"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="mx-2 flex-1">
                  <div className="relative mt-2 aspect-[3/4] w-full">
                    <img
                      src="/hero-profile.jpg"
                      alt="Harshith Kumar professional headshot"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                      draggable={false}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 text-white">
                  <div>
                    <h2 className="text-xl font-bold">Harshith Kumar</h2>
                    <p className="text-sm text-white/60">Full Stack Developer</p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-colors backdrop-blur-sm"
                    aria-label="Contact Me"
                  >
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </CometCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;