import type { Transition, Variants } from "framer-motion";

/** Luxury editorial easing — slow deceleration, no bounce */
export const easeLuxury: Transition["ease"] = [0.16, 1, 0.3, 1];

// duration of animation - 
export const duration = {
  fast: 0.45,
  base: 0.85,
  slow: 1.2,
  cinematic: 1.6,
} as const;

// fade up animation - used for most of the animations
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeLuxury },
  },
};


// fade in animation - used for most of the animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.cinematic, ease: easeLuxury },
  },
};

// stagger container animation - used for most of the animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};


// stagger fast animation - used for most of the animations
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

// line reveal animation - used for most of the animations
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: duration.cinematic, ease: easeLuxury },
  },
};


// scale in animation - used for most of the animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easeLuxury },
  },
};

// nav item animation - used for most of the animations
export const navItem: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeLuxury },
  },
};

export const statItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeLuxury },
  },
};
