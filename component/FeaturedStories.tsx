"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    id: "spiti",
    imageSrc: "./Images/bird1.jpeg",
    imageAlt: "bird show thier flying",
    location: "Spiti Valley, India",
    edition: "Limited — 12 prints",
    title: "The Ghost of the Spiti",
    description:
      "Seven days of waiting in sub-zero temperatures. At 4,000 meters, patience isn't a virtue — it's a requirement for survival. This Ibis appeared the second the 'Ghost' acknowledged my lens.",
  },
  {
    id: "arctic",
    imageSrc: "./Images/cat2.jpeg",
    imageAlt: "street cat photo",
    location: "Svalbard, Norway",
    edition: "Open — 40 prints left",
    title: "Arctic Monoliths",
    description:
      "Exploring the urban wildness where survival is silent and the strength unseen. This street cat rules his concrete kingdom with the same instinct as any wild predator in the farthest tundra.",
  },
];

function StoryCard({ story, index }: { story: (typeof STORIES)[0]; index: number }) {
  const panelRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (!panelRef.current || !imageRef.current || !contentRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: -16,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 90%",
          end: "bottom 15%",
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: 8,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 85%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      ref={panelRef}
      className="group relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(216,163,92,0.18),_transparent_35%)] shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[42rem]">
        <div ref={imageRef} className="absolute inset-0">
          <img
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            alt={story.imageAlt}
            src={story.imageSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(6,6,6,0.82)_0%,_rgba(6,6,6,0.3)_45%,_rgba(6,6,6,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.18),_transparent_30%)]" />
        </div>

        <div ref={contentRef} className="relative z-10 flex h-full items-end justify-start p-6 sm:p-10 lg:p-14">
          <div className="max-w-xl rounded-[1.5rem] border border-white/10 bg-black/35 p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/60">
              {story.location}
            </p>
            <h2 className="text-3xl font-light uppercase tracking-[0.16em] text-white sm:text-4xl lg:text-5xl">
              {story.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
              {story.description}
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.3em] text-white/60">
              <span>{story.edition}</span>
              <span>0{index + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedStories() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8" id="stories">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-10 lg:gap-12">
        {STORIES.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
