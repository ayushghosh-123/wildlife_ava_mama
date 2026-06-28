"use client";

import { motion } from "framer-motion";
import { statItem, staggerContainer } from "@/lib/motion";

const STATS = [
  { value: "10+", label: "Cities" },
  { value: "300+", label: "Species" },
  { value: "8", label: "Years" },
] as const;

export default function HeroStats() {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 sm:gap-10 md:gap-16 mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/[0.06] max-w-2xl mx-auto w-full"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      role="list"
      aria-label="Career statistics"
    >
      {STATS.map(({ value, label }) => (
        <motion.div key={label} variants={statItem} className="text-center" role="listitem">
          <div className="font-syne text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-accent tabular-nums">
            {value}
          </div>
          <div className="font-syne text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-white/35 mt-1.5 sm:mt-2">
            {label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
