"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ScrollIndicator() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href="/portfolio"
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 max-[480px]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-4"
      aria-label="Scroll to stories section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-brand-accent/60 to-brand-accent"
        animate={reducedMotion ? undefined : { scaleY: [1, 0.6, 1], opacity: [0.4, 1, 0.4] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <span className="font-syne text-[8px] sm:text-[9px] tracking-[0.55em] uppercase text-white/35">
        Scroll
      </span>
    </motion.a>
  );
}
