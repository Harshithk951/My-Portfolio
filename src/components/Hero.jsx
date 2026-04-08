import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { smoothScrollTo } from '@/lib/utils';
import TiltedCard from '@/components/ui/tilted-card';
import { sendAnalyticsEvent } from '@/lib/analytics';
import StarfieldBackground from '@/components/StarfieldBackground';

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
    sendAnalyticsEvent('resume_download');
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
    sendAnalyticsEvent('hire_me_click');
    smoothScrollTo('#contact');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 sm:px-6 lg:px-8">
      {/* Starfield Background - starts loading during loading animation */}
      <StarfieldBackground className="pointer-events-none" count={400} speed={0.5} twinkle startDelay={50} initialStarMultiplier={0.5} />

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
                AI-First Full Stack Developer
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

          {/* Right Content - Tilted Card Profile */}
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <TiltedCard
              imageSrc="/hero-profile-624w.jpg"
              altText="Harshith Kumar - Full Stack Developer professional headshot"
              captionText="Harshith Kumar - Full Stack Developer"
              containerHeight="520px"
              containerWidth="340px"
              imageHeight="520px"
              imageWidth="340px"
              rotateAmplitude={20}
              scaleOnHover={1.3}
              showMobileWarning={true}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <div className="w-full h-full flex flex-col justify-end p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">Harshith Kumar</h2>
                </div>
              }
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;