"use client";

import { useRef, useState } from "react";

const CASE_STUDIES = [
  {
    title: "The 72-Hour Blind",
    quote: "Sometimes the best tool isn't the lens, but the ability to become a statue.",
    body: "To capture the elusive Asian Openbill Stork, we spent three days in silence, moving only when necessary. The bird appeared on day three.",
    stat: "18 Days Total · Trip Duration",
    tags: ["Himalayan Corridor", "Asian Openbill Stork", "Patience"],
    src: "/Images/bird2.jpeg",
    alt: "Wildlife photography in high altitude",
  },
  {
    title: "Depths of the Wild",
    quote: "Light is a stranger in the deep; we must bring it with reverence.",
    body: "Photographing apex predators requires a delicate balance between distance and trust. We positioned along the natural corridor where survival is silent.",
    stat: "120 Hours · Field Mentorship",
    tags: ["Apex Predators", "Wild Habitat", "Natural Light"],
    src: "/Images/cat1.jpeg",
    alt: "Apex predator in wild habitat",
  },
  {
    title: "The Ghost Hour",
    quote: "Between 4 and 6 AM, the world belongs entirely to wildlife.",
    body: "In ancient peatland forests, I spent 11 mornings hidden before the first light found the blossoms and the bird found the perfect moment.",
    stat: "11 Mornings · Consecutive Days",
    tags: ["Borneo", "Pre-dawn", "Corridors"],
    src: "/Images/bird1.jpeg",
    alt: "Misty forest at pre-dawn blue hour",
  },
  {
    title: "Blossom & Flight",
    quote: "Precision timing captures moments invisible to the naked eye.",
    body: "High in the canopy, patience rewarded us with a fleeting interaction between wild flora and migrating fauna.",
    stat: "5 Days · Canopy Station",
    tags: ["Canopy", "Flora & Fauna", "High Speed"],
    src: "/Images/flower1.jpeg",
    alt: "Bird interacting with wild blossoms",
  },
];

export default function BehindTheShot() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollTo(i: number) {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[i] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setActive(i);
    }
  }

  return (
    <section id="process" className="bg-black w-full py-16 sm:py-24 overflow-hidden border-t border-white/10">
      <div className="w-full">
        {/* Header & Horizontal Scroll Navigation */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-8 flex items-center justify-between">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
              Expeditions & Masterclasses
            </p>
            <h2 className="font-sans text-[24px] sm:text-[32px] font-extralight text-white uppercase tracking-tight">
              Behind The Shot
            </h2>
          </div>

          {/* Navigation dots/counter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30 hidden sm:inline">
              0{active + 1} / 0{CASE_STUDIES.length}
            </span>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-6 sm:px-12 scroll-smooth pb-6"
          onScroll={(e) => {
            const el = e.currentTarget;
            const card = el.children[0] as HTMLElement | undefined;
            if (!card) return;
            const index = Math.round(el.scrollLeft / (card.offsetWidth + 24));
            setActive(Math.min(Math.max(index, 0), CASE_STUDIES.length - 1));
          }}
        >
          {CASE_STUDIES.map(({ title, quote, body, stat, tags, src, alt }) => (
            <div
              key={title}
              className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32rem] bg-black border border-white/10 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Image */}
              <div className="relative h-[240px] sm:h-[280px] w-full overflow-hidden bg-black">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={alt}
                  src={src}
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10 z-10">
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/70">
                    {stat}
                  </p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-sans text-[18px] sm:text-[20px] font-extralight text-white uppercase tracking-tight">
                    {title}
                  </h3>

                  <blockquote className="font-serif italic text-[14px] text-white/80 border-l border-white/20 pl-3 py-0.5">
                    &ldquo;{quote}&rdquo;
                  </blockquote>

                  <p className="font-sans text-[12px] text-white/40 leading-relaxed font-light line-clamp-3">
                    {body}
                  </p>
                </div>

                {/* Card Tags */}
                <div className="pt-4 border-t border-white/5 flex items-center flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span key={tag} className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em] text-white/40">
                      {tag}
                      {idx < tags.length - 1 && <span className="opacity-30">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
