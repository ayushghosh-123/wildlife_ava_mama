"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#stories"
      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center focus-visible:outline-none"
      aria-label="Scroll down"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/40">
        Scroll ↓
      </span>
    </motion.a>
  );
}
