"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, lineReveal, easeLuxury, duration } from "@/lib/motion";
import HeroStats from "./HeroStats";

const HEADING_LINES = ["10,000 HOURS IN THE HIDE.", "EVERY FRAME EARNED."] as const;

export default function HeroContent() {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-start text-left w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-16 sm:pb-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* 9px caps, dot separators, 50% white directly above headline */}
      <motion.p
        variants={fadeUp}
        className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 mb-3 sm:mb-4"
      >
        10+ Cities <span className="mx-1.5 opacity-40">·</span> 300+ Species <span className="mx-1.5 opacity-40">·</span> 8 Years
      </motion.p>

      <h1 className="font-sans font-extralight text-white uppercase tracking-tight mb-6 sm:mb-8 w-full">
        {HEADING_LINES.map((line) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block text-4xl sm:text-6xl md:text-8xl lg:text-[96px] leading-[0.85] text-white font-extralight"
              variants={lineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        variants={fadeUp}
        className="text-sm sm:text-base md:text-lg text-white/55 max-w-md sm:max-w-xl md:max-w-2xl leading-relaxed font-light mb-8 sm:mb-12"
      >
        Eight years in the Indian wild - offering field mentorship and photography expeditions across tiger reserves and Himalayan corridors.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mb-10"
      >
        <motion.a
          href="/collections"
          className="group relative bg-white text-black px-8 sm:px-12 py-4 sm:py-[1.125rem] font-sans text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden milled-edge text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easeLuxury }}
        >
          <span className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
          <span className="relative z-10">Explore Gallery</span>
        </motion.a>

        <motion.a
          href="/ethics"
          className="inline-flex items-center justify-center gap-2 border border-white/15 px-8 sm:px-12 py-4 sm:py-[1.125rem] font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-white/80 hover:border-brand-accent hover:text-brand-accent backdrop-blur-sm transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easeLuxury }}
        >
          Watch Documentary
        </motion.a>
      </motion.div>

      <HeroStats />
    </motion.div>
  );
}
