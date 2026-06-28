"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, lineReveal, easeLuxury, duration } from "@/lib/motion";
import HeroStats from "./HeroStats";

const HEADING_LINES = ["10,000 HOURS IN THE HIDE.", "EVERY FRAME EARNED."] as const;

export default function HeroContent() {
  return (
    <motion.div
      className="page-container relative z-10 flex flex-col items-center text-center max-w-6xl pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={fadeUp}
        className="font-syne text-[10px] sm:text-xs tracking-[0.45em] uppercase text-brand-accent font-bold mb-6 sm:mb-8"
      >
        Bengal. Borneo. Botswana. The Field Never Stops Teaching.
      </motion.p>

      <h1 className="font-syne uppercase tracking-tighter text-white mb-6 sm:mb-10 w-full">
        {HEADING_LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className={`block text-[clamp(2.25rem,7.5vw,7.5rem)] leading-[0.92] sm:leading-[0.88] ${
                i === 1
                  ? "italic text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white to-brand-accent/90 mt-1 sm:mt-2"
                  : "font-extrabold"
              }`}
              variants={lineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        variants={fadeUp}
        className="text-sm sm:text-base md:text-lg text-white/55 max-w-md sm:max-w-xl md:max-w-2xl leading-relaxed font-light mb-10 sm:mb-14 px-2"
      >
        Eight years in the Indian wild - offering field mentorship and photography expeditions across tiger reserves and Himalayan corridors.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none"
      >
        <motion.a
          href="/collections"
          className="group relative bg-white text-black px-8 sm:px-12 py-4 sm:py-[1.125rem] font-syne text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden milled-edge text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: duration.fast, ease: easeLuxury }}
        >
          <span className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
          <span className="relative z-10">Explore Gallery</span>
        </motion.a>

        <motion.a
          href="/ethics"
          className="inline-flex items-center justify-center gap-2 border border-white/15 px-8 sm:px-12 py-4 sm:py-[1.125rem] font-syne text-[10px] font-bold tracking-[0.25em] uppercase text-white/80 hover:border-brand-accent hover:text-brand-accent backdrop-blur-sm transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
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
