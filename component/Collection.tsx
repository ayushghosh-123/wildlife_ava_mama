"use client";

import Link from "next/link";
import { FadeReveal } from "@/component/ui/TextAnimations";

const COLLECTIONS = [
  {
    title: "Big Cats & Apex Predators",
    count: "12 Series",
    src: "/Images/cat1.jpeg",
    alt: "Apex predator in wild habitat",
  },
  {
    title: "Highland Birds & Flight",
    count: "8 Series",
    src: "/Images/bird1.jpeg",
    alt: "Asian Openbill Stork in flight",
  },
  {
    title: "Canopy & Botanical Silence",
    count: "15 Series",
    src: "/Images/flower1.jpeg",
    alt: "Wild flora and fauna interaction",
  },
];

export default function Collections() {
  return (
    <section id="collections" className="bg-black w-full overflow-hidden py-16 sm:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10 flex items-center justify-between">
        <div>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1">
            Archival Gallery
          </p>
          <h2 className="font-sans text-[24px] sm:text-[32px] font-extralight text-white uppercase tracking-tight">
            Collections
          </h2>
        </div>

        <Link
          href="/collections"
          className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
        >
          View All Prints →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full">
        {COLLECTIONS.map(({ title, count, src, alt }, i) => (
          <FadeReveal key={title} delay={i * 0.1} y={0} className="w-full">
            <Link href="/collections" className="group relative block w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden cursor-pointer bg-black">
              {/* Full-bleed image */}
              <img
                className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
                alt={alt}
                src={src}
              />

              {/* Series count top-left in 9px caps */}
              <div className="absolute top-6 left-6 z-10">
                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/70 font-medium">
                  {count}
                </p>
              </div>

              {/* Hover overlay: darkens 50% */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 pointer-events-none" />

              {/* Bottom container: Title slides up on hover in 11px caps */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
                <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-white font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {title}
                </h3>
              </div>
            </Link>
          </FadeReveal>
        ))}
      </div>

      <FadeReveal delay={0.3} className="py-12 bg-black flex flex-col items-center justify-center gap-4">
        <Link
          href="/collections"
          className="inline-block border border-white/20 px-8 py-3 font-sans text-[10px] uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Explore Full Portfolio Gallery
        </Link>
        <p className="text-center font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 px-4">
          All prints are archival pigment on Hahnemühle Photo Rag · Signed & numbered by the artist
        </p>
      </FadeReveal>
    </section>
  );
}
