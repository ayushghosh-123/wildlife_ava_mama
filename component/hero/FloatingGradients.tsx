"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BLOBS = [
  {
    className: "top-[12%] -left-[8%] w-[420px] h-[420px] bg-brand-accent/10",
    animate: { x: [0, 28, -12, 0], y: [0, -20, 14, 0] },
    duration: 22,
  },
  {
    className: "bottom-[18%] -right-[6%] w-[520px] h-[520px] bg-brand-forest/20",
    animate: { x: [0, -24, 18, 0], y: [0, 16, -22, 0] },
    duration: 26,
  },
  {
    className: "top-[45%] left-[55%] w-[280px] h-[280px] bg-white/[0.03]",
    animate: { x: [0, 14, -18, 0], y: [0, 22, -10, 0] },
    duration: 18,
  },
];

export default function FloatingGradients() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {BLOBS.map(({ className, animate, duration }, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[100px] ${className}`}
          animate={reducedMotion ? undefined : animate}
          transition={
            reducedMotion
              ? undefined
              : { duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
