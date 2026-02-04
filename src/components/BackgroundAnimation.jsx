import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 left-0 w-full transform -rotate-6 scale-110 opacity-5">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="whitespace-nowrap flex"
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-8 px-4">
              <span className="text-9xl font-bold tracking-[0.2em] text-white">
                INNOVATE CREATE BUILD DESIGN DEVELOP DEPLOY
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;