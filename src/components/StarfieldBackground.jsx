import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Detect device tier for adaptive performance:
 * - "low"  : mobile phones & low-end tablets  (≤ 768px or ≤ 4 cores)
 * - "mid"  : standard tablets / older laptops  (≤ 1024px or ≤ 6 cores)
 * - "high" : desktops & powerful devices
 */
function getDeviceTier() {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 2;
  if (w <= 768 || cores <= 4) return "low";
  if (w <= 1024 || cores <= 6) return "mid";
  return "high";
}

/** Adaptive defaults per device tier */
const TIER_CONFIG = {
  low:  { stars: 120, dpr: 1,   streaks: false, maxSize: 2   },
  mid:  { stars: 250, dpr: 1.5, streaks: true,  maxSize: 2.5 },
  high: { stars: 400, dpr: 2,   streaks: true,  maxSize: 3   },
};

export function StarfieldBackground({
  className,
  children,
  count = 400,
  speed = 0.5,
  starColor = "#ffffff",
  twinkle = true,
  startDelay = 0,
  initialStarMultiplier = 0.6,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const tierRef = useRef(getDeviceTier());
  const cleanupRef = useRef(null);

  useEffect(() => {
    let initTimer = null;
    let animationCleanup = null;

    function initializeAnimation() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // --- Adaptive config based on device tier ---
      const tier = tierRef.current;
      const config = TIER_CONFIG[tier];
      const effectiveCount = Math.min(count, config.stars);
      // Start with reduced star count for faster initialization
      const initialCount = Math.max(30, Math.ceil(effectiveCount * initialStarMultiplier));
      let currentStarCount = initialCount;
      const dpr = Math.min(window.devicePixelRatio || 1, config.dpr);
      const enableStreaks = config.streaks;
      const maxStarSize = config.maxSize;

      const rect = container.getBoundingClientRect();
      let width = rect.width;
      let height = rect.height;

      // Set canvas dimensions accounting for device pixel ratio
      const setCanvasSize = (w, h) => {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      setCanvasSize(width, height);

      let animationId;
      let tick = 0;
      let isVisible = true;
      const maxDepth = 1500;

      // Create a star with random position and depth
      const createStar = (initialZ) => ({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: initialZ ?? Math.random() * maxDepth,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });

      const stars = Array.from({ length: initialCount }, () => createStar());

      // Expand star count after 1.5s for smooth transition
      let expandTimer = setTimeout(() => {
        const newStars = Array.from(
          { length: effectiveCount - initialCount },
          () => createStar(maxDepth * 0.8) // Start far away for smooth entrance
        );
        stars.push(...newStars);
        currentStarCount = effectiveCount;
      }, 1500);

      // --- Resize handler (debounced) ---
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const r = container.getBoundingClientRect();
          width = r.width;
          height = r.height;
          setCanvasSize(width, height);
          // Re-check tier on resize (e.g. orientation change)
          tierRef.current = getDeviceTier();
        }, 150);
      };

      // Defer ResizeObserver to idle callback
      const setupResizeObserver = () => {
        const ro = new ResizeObserver(handleResize);
        ro.observe(container);
        return ro;
      };

      let ro;
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          ro = setupResizeObserver();
        });
      } else {
        ro = setupResizeObserver();
      }

      // --- Visibility handler: pause when tab is hidden ---
      const handleVisibility = () => {
        if (document.hidden) {
          isVisible = false;
          cancelAnimationFrame(animationId);
        } else {
          isVisible = true;
          animationId = requestAnimationFrame(animate);
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);

      // --- Precompute TWO_PI ---
      const TWO_PI = Math.PI * 2;

      // Animation loop
      const animate = () => {
        if (!isVisible) return;
        tick++;

        // Fade effect for motion trails
        ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
        ctx.fillRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        // Batch: set fill style once for all stars
        ctx.fillStyle = starColor;

        for (let i = 0; i < currentStarCount; i++) {
          const star = stars[i];
          if (!star) continue; // Skip undefined stars during expansion

          // Move star toward camera
          star.z -= speed * 2;

          // Reset if passed camera
          if (star.z <= 0) {
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
            star.z = maxDepth;
          }

          // Project to 2D
          const scale = 400 / star.z;
          const x = cx + star.x * scale;
          const y = cy + star.y * scale;

          // Skip if off screen
          if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

          // Depth ratio (0 = far, 1 = close)
          const depthRatio = 1 - star.z / maxDepth;

          // Size based on depth (closer = bigger)
          const size = Math.max(0.5, depthRatio * maxStarSize);

          // Opacity based on depth (closer = brighter)
          let opacity = depthRatio * 0.9 + 0.1;

          // Twinkle effect
          if (twinkle && star.twinkleSpeed > 0.015) {
            opacity *= 0.7 + 0.3 * Math.sin(tick * star.twinkleSpeed + star.twinkleOffset);
          }

          // Draw star
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, TWO_PI);
          ctx.fill();

          // Draw subtle streak for fast/close stars (disabled on low-end devices)
          if (enableStreaks && star.z < maxDepth * 0.3 && speed > 0.3) {
            const streakLength = depthRatio * speed * 8;
            const angle = Math.atan2(star.y, star.x);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - Math.cos(angle) * streakLength, y - Math.sin(angle) * streakLength);
            ctx.strokeStyle = starColor;
            ctx.globalAlpha = opacity * 0.3;
            ctx.lineWidth = size * 0.5;
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(animate);
      };

      // Initial clear
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(animate);

      // Store cleanup function in ref for proper lifecycle management
      const cleanup = () => {
        cancelAnimationFrame(animationId);
        clearTimeout(resizeTimer);
        clearTimeout(expandTimer);
        if (ro) ro.disconnect();
        document.removeEventListener("visibilitychange", handleVisibility);
      };
      
      cleanupRef.current = cleanup;

      return cleanup;
    }

    // Schedule initialization (deferred or immediate)
    if (startDelay > 0) {
      initTimer = setTimeout(initializeAnimation, startDelay);
    } else {
      animationCleanup = initializeAnimation();
    }

    // Return cleanup that handles both timer and animation cleanup
    return () => {
      if (initTimer) clearTimeout(initTimer);
      // Use cleanupRef to capture cleanup function from deferred initialization
      if (cleanupRef.current) cleanupRef.current();
      // Or direct cleanup from immediate initialization
      if (animationCleanup) animationCleanup();
    };
  }, [count, speed, starColor, twinkle, startDelay, initialStarMultiplier]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle blue nebula glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 sm:opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(56, 100, 180, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100, 60, 150, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5,5,10,0.9) 100%)",
        }}
      />

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default StarfieldBackground;
