import React, { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingPageProps {
  onProgressComplete?: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onProgressComplete }) => {
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [loadingText, setLoadingText] = useState("Loading our love story");
  const [progressComplete, setProgressComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on mount and when window resizes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Animated heart beat effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.2 : 1));
      setOpacity((prev) => (prev === 1 ? 0.8 : 1));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Animated loading text with dots
  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading our love story...")
          return "Loading our love story";
        if (prev === "Loading our love story..")
          return "Loading our love story...";
        if (prev === "Loading our love story.")
          return "Loading our love story..";
        return "Loading our love story.";
      });
    }, 400);

    return () => clearInterval(textInterval);
  }, []);

  // Detect when we should complete the progress
  useEffect(() => {
    if (onProgressComplete && !progressComplete) {
      // When onProgressComplete prop is passed(when readyToHide is true(in app.tsx)), finish the progress bar
      setProgress(100);
      setProgressComplete(true);

      // Call the completion callback after a short delay to allow animation to finish
      setTimeout(onProgressComplete, 500);
    }
  }, [onProgressComplete, progressComplete]);

  // Simulate loading progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!progressComplete) {
      interval = setInterval(() => {
        setProgress((prev) => {
          // If we're close to 100%, cap it at 95% to wait for actual loading completion
          if (prev >= 95) return 95;

          const increment = Math.random() * 10;
          const newProgress = prev + increment;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [progressComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex flex-col items-center justify-end pb-8 z-50 overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/10 z-10" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: isMobile
                ? "url('/images/gallery/photo10.jpg')"
                : "url('/images/gallery/photo10.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Content container */}
        <motion.div
          className="z-20 flex flex-col items-center justify-center p-4 pt-3 pb-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl w-80 sm:w-96"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-6 -right-6 text-rose-300/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={30} />
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -left-6 text-rose-300/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={30} />
          </motion.div>

          {/* Heart container */}
          <div className="relative mb-2">
            {/* Background glow */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-16 rounded-full bg-gradient-to-tr from-rose-400 to-pink-400 filter blur-xl"
            />

            {/* Animated heart */}
            <motion.div
              className="relative z-10 transition-all duration-800 ease-in-out transform"
              style={{
                transform: `scale(${scale})`,
                opacity: opacity,
              }}
            >
              <Heart
                size={40}
                className="text-rose-500 fill-rose-400 drop-shadow-lg"
              />

              {/* Particles around heart */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x:
                      Math.random() > 0.5
                        ? [0, (i + 1) * 15]
                        : [0, -(i + 1) * 15],
                    y:
                      Math.random() > 0.5
                        ? [0, (i + 1) * 8]
                        : [0, -(i + 1) * 8],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    repeatDelay: Math.random() * 1.5,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Monogram and text */}
          <motion.div
            className="flex flex-col items-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl text-white font-medium tracking-wider drop-shadow-md">
              {progressComplete ? "Loading complete!" : loadingText}
            </h2>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-64 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm shadow-inner"
            initial={{ width: 0 }}
            animate={{ width: 260 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: progressComplete ? 0.5 : 0.3,
                ease: "easeOut",
              }}
              style={{
                boxShadow:
                  "0 0 10px rgba(244, 114, 182, 0.6), 0 0 20px rgba(244, 114, 182, 0.4)",
              }}
            />
          </motion.div>

          {/* Progress percentage */}
          <motion.p
            className="mt-1 text-lg font-medium text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      </motion.div>

      {/* CSS for additional effects */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(244, 114, 182, 0.8));
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LoadingPage;
