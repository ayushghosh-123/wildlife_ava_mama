"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CASE_STUDIES } from "./data";
import { StoryCard } from "./StoryCard";
import { useParallaxStory } from "./useParallaxStory";

export default function BehindTheShot() {
  const [active, setActive] = useState(0);
  const { sectionRef, trackRef, cardRefs, prefersReducedMotion } = useParallaxStory(CASE_STUDIES);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.16),_transparent_28%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-brand-accent)]/90">Expeditions & Masterclasses</p>
            <h2 className="text-3xl font-light uppercase tracking-[0.16em] text-white sm:text-4xl lg:text-5xl">
              Behind The Shot
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              A cinematic journey through the quiet discipline behind each frame — from dawn patrols to patient waits in the wild.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
            {CASE_STUDIES.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`View story ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/45"}`}
              />
            ))}
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className={`flex ${prefersReducedMotion ? "flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-2" : "flex-col gap-5 sm:gap-6 lg:w-max lg:items-stretch lg:flex-row lg:gap-5 xl:gap-6"}`}
        >
          {CASE_STUDIES.map((card, index) => (
            <div
              key={card.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <StoryCard
                data={card}
                index={index}
                active={active === index}
                onHover={() => setActive(index)}
                reducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
