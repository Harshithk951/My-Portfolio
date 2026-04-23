/**
 * Animation Configuration Constants
 * 
 * Centralized spring configurations and animation timings used throughout the portfolio.
 * This avoids duplication and makes it easy to adjust animations globally.
 */

// ─────────────────────────────────────────────────────────────────────
// Spring Configurations (Framer Motion)
// ─────────────────────────────────────────────────────────────────────

/**
 * Smooth, responsive spring for general UI animations
 * Used for: card hovers, transitions, modal opens
 */
export const SPRING_SMOOTH = {
  damping: 40,
  stiffness: 80,
  mass: 2.5,
};

/**
 * Snappy spring for quick interactions
 * Used for: button clicks, fast toggles
 */
export const SPRING_SNAPPY = {
  damping: 30,
  stiffness: 150,
  mass: 1,
};

/**
 * Stiff spring for immediate response (no lag)
 * Used for: drag operations, real-time tracking
 */
export const SPRING_STIFF = {
  damping: 25,
  stiffness: 200,
  mass: 0.5,
};

/**
 * Bouncy spring for playful animations
 * Used for: entrance animations, celebratory effects
 */
export const SPRING_BOUNCY = {
  damping: 15,
  stiffness: 100,
  mass: 1.5,
};

/**
 * Gentle spring for subtle animations
 * Used for: hover effects, fade transitions
 */
export const SPRING_GENTLE = {
  damping: 60,
  stiffness: 40,
  mass: 3,
};

// ─────────────────────────────────────────────────────────────────────
// Transition Timings (seconds)
// ─────────────────────────────────────────────────────────────────────

export const TRANSITION_TIMINGS = {
  // Micro interactions (< 300ms)
  INSTANT: 0.1,
  QUICK: 0.2,
  FAST: 0.3,

  // Standard transitions (300-500ms)
  NORMAL: 0.4,
  MEDIUM: 0.5,

  // Longer transitions (500ms+)
  SLOW: 0.8,
  SLOWER: 1.0,
  SLOWEST: 1.5,
};

// ─────────────────────────────────────────────────────────────────────
// Easing Functions
// ─────────────────────────────────────────────────────────────────────

export const EASING = {
  // Standard easings
  IN_OUT: [0.4, 0, 0.2, 1],     // Default React Spring
  IN_OUT_CUBIC: [0.645, 0.045, 0.355, 1],
  IN_OUT_QUAD: [0.455, 0.03, 0.515, 0.955],
  
  // Emphasis
  OUT_CUBIC: [0.215, 0.61, 0.355, 1],
  OUT_QUAD: [0.25, 0.46, 0.45, 0.94],
  
  // Entrance
  OUT_QUART: [0.165, 0.84, 0.44, 1],
  OUT_EXPO: [0.19, 1, 0.22, 1],
};

// ─────────────────────────────────────────────────────────────────────
// Animation Preset Combinations
// ─────────────────────────────────────────────────────────────────────

/**
 * Ready-to-use animation presets combining spring + timing
 */
export const ANIMATION_PRESETS = {
  /**
   * Smooth entrance for modals, overlays
   */
  MODAL_ENTER: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      duration: TRANSITION_TIMINGS.NORMAL,
      ...SPRING_SMOOTH,
    },
  },

  /**
   * Quick button feedback
   */
  BUTTON_PRESS: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 },
    transition: {
      duration: TRANSITION_TIMINGS.QUICK,
      ...SPRING_SNAPPY,
    },
  },

  /**
   * Fade in for lazy-loaded sections
   */
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: TRANSITION_TIMINGS.MEDIUM,
      ...SPRING_GENTLE,
    },
  },

  /**
   * Slide up for page sections
   */
  SLIDE_UP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: TRANSITION_TIMINGS.NORMAL,
      ...SPRING_SMOOTH,
    },
  },

  /**
   * Slide in from right for notifications/panels
   */
  SLIDE_RIGHT: {
    hidden: { opacity: 0, x: 400 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: TRANSITION_TIMINGS.FAST,
        ...SPRING_SMOOTH,
      },
    },
    exit: { 
      opacity: 0, 
      x: 400, 
      transition: { duration: TRANSITION_TIMINGS.QUICK } 
    },
  },

  /**
   * Staggered list items
   */
  STAGGER_CONTAINER: {
    initial: 'hidden',
    animate: 'visible',
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  },

  STAGGER_ITEM: {
    variants: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ...SPRING_SMOOTH,
        },
      },
    },
  },

  /**
   * Hover lift effect for cards
   */
  CARD_HOVER: {
    initial: { y: 0 },
    whileHover: { y: -8 },
    transition: {
      duration: TRANSITION_TIMINGS.FAST,
      ...SPRING_BOUNCY,
    },
  },

  /**
   * Smooth page transition
   */
  PAGE_TRANSITION: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: TRANSITION_TIMINGS.SLOW,
      ease: 'easeInOut',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────
// Layout Animation Constants
// ─────────────────────────────────────────────────────────────────────

export const LAYOUT_ANIMATION = {
  /**
   * Framer Motion layout animation with proper cleanup
   * Use: layoutId="section-1" layoutScroll
   */
  SHARED_LAYOUT_ID: 'layout-container',

  /**
   * Stagger delay for list items (seconds)
   */
  STAGGER_DELAY: 0.05,

  /**
   * Max stagger delay to prevent excessive wait times
   */
  MAX_STAGGER_DELAY: 0.5,
};

// ─────────────────────────────────────────────────────────────────────
// Reduced Motion Overrides
// ─────────────────────────────────────────────────────────────────────

/**
 * Animation configuration respecting prefers-reduced-motion
 * Use inside components that check prefersReducedMotion()
 */
export const REDUCED_MOTION_PRESET = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
    ease: 'linear',
  },
};

// ─────────────────────────────────────────────────────────────────────
// Helper: Get Spring Config based on Performance
// ─────────────────────────────────────────────────────────────────────

/**
 * Adjust spring stiffness based on device capability
 * Low-end devices get simpler animations
 * 
 * @param {boolean} isLowEnd - Is this a low-end device?
 * @param {string} preset - Preset name ('smooth', 'snappy', 'bouncy', etc.)
 * @returns {Object} Adjusted spring config
 * 
 * @example
 * const spring = getAdaptiveSpring(isLowEnd, 'smooth');
 */
export function getAdaptiveSpring(isLowEnd = false, preset = 'smooth') {
  const baseConfig = {
    smooth: SPRING_SMOOTH,
    snappy: SPRING_SNAPPY,
    stiff: SPRING_STIFF,
    bouncy: SPRING_BOUNCY,
    gentle: SPRING_GENTLE,
  }[preset] || SPRING_SMOOTH;

  if (!isLowEnd) {
    return baseConfig;
  }

  // Reduce stiffness on low-end devices for smoother 60fps animations
  return {
    ...baseConfig,
    damping: baseConfig.damping + 10, // Slightly dampen
    stiffness: baseConfig.stiffness * 0.8, // Reduce stiffness
  };
}

export default {
  SPRING_SMOOTH,
  SPRING_SNAPPY,
  SPRING_STIFF,
  SPRING_BOUNCY,
  SPRING_GENTLE,
  TRANSITION_TIMINGS,
  EASING,
  ANIMATION_PRESETS,
  LAYOUT_ANIMATION,
  REDUCED_MOTION_PRESET,
  getAdaptiveSpring,
};
