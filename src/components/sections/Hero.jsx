import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { smoothScrollTo } from '@/lib/utils';
import { ANIMATION_PRESETS } from '@/lib/animationConfig';
import { useDeviceInfo } from '@/hooks/useDeviceContext';
import TiltedCard from '@/components/ui/tilted-card';
import { sendAnalyticsEvent } from '@/lib/analytics';
import { useWordCycle } from '@/hooks/useWordCycle';
import Galaxy from '@/components/shared/Galaxy';

const WORDS = ['solves', 'builds', 'designs', 'creates', 'transforms'];

const Hero = memo(() => {
  const { toast } = useToast();
  const { isMobile, isLowEnd } = useDeviceInfo();
  const currentWord = useWordCycle(WORDS, 2000);

  // Memoize Galaxy settings to prevent recalculation on every render
  const galaxyConfig = useMemo(() => ({
    density: isLowEnd ? 0.3 : 0.6,
    glowIntensity: isLowEnd ? 0.05 : 0.2,
    twinkleIntensity: isLowEnd ? 0.05 : 0.15,
    saturation: 0,
    rotationSpeed: isLowEnd ? 0.02 : 0.05,
    starSpeed: isLowEnd ? 0.1 : 0.3,
    speed: isLowEnd ? 0.2 : 0.4,
  }), [isLowEnd]);

  const handleDownloadCV = async () => {
    sendAnalyticsEvent('resume_download');
    try {
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
      link.remove();

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
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0b0b0b] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Galaxy Background - WebGL-based starfield animation (adaptive for device) */}
      <Galaxy
        className="absolute inset-0 pointer-events-none z-0"
        mouseInteraction={false}
        mouseRepulsion={false}
        density={galaxyConfig.density}
        glowIntensity={galaxyConfig.glowIntensity}
        saturation={galaxyConfig.saturation}
        hueShift={140}
        twinkleIntensity={galaxyConfig.twinkleIntensity}
        rotationSpeed={galaxyConfig.rotationSpeed}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={galaxyConfig.starSpeed}
        speed={galaxyConfig.speed}
        transparent={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">

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

            <h1 className="text-[2.75rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.95] sm:leading-[0.9]">
              Hey, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                Harshith
              </span>
            </h1>

            <div 
              className="text-base xs:text-lg sm:text-2xl md:text-3xl text-white/60 font-light flex flex-wrap items-center justify-center lg:justify-start gap-2"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>I am a guy who</span>
              <span className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white text-black font-bold text-base sm:text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <motion.span
                  key={currentWord}
                  {...ANIMATION_PRESETS.FADE_IN}
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
            {/* Responsive container for profile image */}
            <div className="mobile-bounce-image w-[240px] h-[360px] sm:w-[260px] sm:h-[390px] md:w-[320px] md:h-[480px] lg:w-[380px] lg:h-[580px]">
              <TiltedCard
                imageSrc="/hero-profile-624w.jpg"
                altText="Harshith Kumar - Full Stack Developer professional headshot"
                captionText="Harshith Kumar - Full Stack Developer"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={!isMobile ? 14 : 0}
                scaleOnHover={!isMobile ? 1.1 : 1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full flex flex-col justify-end p-6 sm:p-8">
                    <div className="pb-3 sm:pb-4 -ml-1 sm:-ml-2">
                      <h2 className="text-lg sm:text-2xl font-bold text-black leading-tight">Harshith Kumar</h2>
                    </div>
                  </div>
                }
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;