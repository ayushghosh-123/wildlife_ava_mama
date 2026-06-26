"use client";

import { useRef, useState } from "react";

const CASE_STUDIES = [
  {
    title: "The 72-Hour Blind",
    quote: "Sometimes the best tool isn't the lens, but the ability to become a statue.",
    body: "To capture the elusive Harpy Eagle, we spent three days in silence, moving only when necessary, eating only dry rations. The eagle appeared on day three, as if it had decided we were part of the forest.",
    stat: "18 Days Total",
    statLabel: "Trip Duration",
    icon: "timer",
    tags: ["Amazon Rainforest", "Harpy Eagle", "Long Exposure"],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADFFCrUBpqoVCiFGtKb3gNGOlezNbzYwXIks-tD9iiV7TkEGVAkgYJ-RMfBSWFbcTAbNPI10jBfsJFOPfwAyGSN444eqiUjC4wjod8FhvjaKiYJjBSshyml67vx1HGCsAMGwx7pAcu78CopOdWpgRm94RtJw9XyZI0zP8JNfV_UdCS7OJJoSXFOhQNQjo9NEOGiaAzy7QpU2pE5pSJnDJJTkz3qwol91GWLwgQMTlDAzbi4HwNmb1R1hABXK2lbkSnuR-iMtUs0_7y",
    alt: "Photographer camouflage blind in rainforest",
  },
  {
    title: "Depths of the Abyss",
    quote: "Light is a stranger in the deep; we must bring it with reverence.",
    body: "Photographing bioluminescent species requires a delicate balance between illumination and preservation. We developed a custom filter system that preserved the deep-sea ambiance without disturbing the creatures.",
    stat: "120 Meters",
    statLabel: "Operating Depth",
    icon: "water_drop",
    tags: ["Bioluminescence", "Deep Sea", "Custom Rig"],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH6m1qX353_VrqMUgb-MWY663-dfIcZQCzgrgU54vQ-K4DOXyka6eFGc2nJOqmdeSsS4Ejeggp_2uHyk94jD678WhxeOdFOYCpy77QrV1pAD1kHN6fwU0zCM8bQwz9RK8Icis6hYNPKVTTaTBFeBKoF903sFH6X5zRNFLip6YbUCydc-QMqI80mRch6-Dp_m7EHJTWEkg3dd8ygXWO9ufHD2-FpQiBGaOYhG0swN-5BhYO6VcxTLPtUMbDmb2_b6WEXqIFBx2Y69xZ",
    alt: "Underwater camera rig with custom strobes",
  },
  {
    title: "The Ghost Hour",
    quote: "Between 4 and 6 AM, the world belongs entirely to wildlife.",
    body: "In Borneo's ancient peatland forests, I spent 11 mornings hidden before a sun bear finally approached. The ambient light at pre-dawn rendered a cinematic blue-black tonal range no artificial light could replicate.",
    stat: "11 Mornings",
    statLabel: "Consecutive Days",
    icon: "dark_mode",
    tags: ["Borneo", "Sun Bear", "Pre-dawn"],
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA1cP00H7TIYrpHWB-MXtANkMHay6awMuzy9RpkKMr0RTB1XoHQccOoVjARblpEArjWa5dFnU6uOguNGsv4wOs5AsgN8x2sfRA5n4rbFUVrN-fA-3s7uLoYdrjQLu5KRaM__-iZmDIMxn_qWxwUoxgO7jpqACUjA0ogPiqR-x75MfTszWq5wv28nTcAEy8XUVUNdN047R9kcBotEHegAQUqtwFJuFYS6IpQX6PToUdrvvPbvL0wiFS8UomCOOvVLlqfFseEzSpRLFa",
    alt: "Misty forest at pre-dawn blue hour",
  },
];

export default function BehindTheShot() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollTo(i: number) {
    if (!scrollRef.current) return;
    const el = scrollRef.current.children[i] as HTMLElement;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  }

  return (
    <section
      id="ethics"
      className="py-section-gap px-6 md:px-margin-desktop bg-surface-1"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with dot nav */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-syne text-[10px] md:text-xs tracking-[0.4em] text-brand-accent mb-3 uppercase font-bold">
              Process &amp; Ethics
            </p>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
              Behind The Shot
            </h2>
          </div>

          {/* Dot pagination */}
          <div className="flex items-center gap-3">
            {CASE_STUDIES.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  i === active
                    ? "w-8 h-[2px] bg-brand-accent"
                    : "w-2 h-[2px] bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
            <span className="font-syne text-[9px] tracking-widest uppercase text-white/20 ml-2">
              {active + 1} / {CASE_STUDIES.length}
            </span>
          </div>
        </div>

        {/* Scroll strip */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-20 snap-x snap-mandatory"
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / (el.scrollWidth / CASE_STUDIES.length));
            setActive(Math.min(index, CASE_STUDIES.length - 1));
          }}
        >
          {CASE_STUDIES.map(({ title, quote, body, stat, statLabel, icon, tags, src, alt }) => (
            <div key={title} className="min-w-[90vw] md:min-w-[65vw] snap-start shrink-0">
              <div className="grid md:grid-cols-2 gap-0 bg-[#050505] border border-white/5 overflow-hidden group">
                {/* Image */}
                <div className="relative overflow-hidden aspect-square md:aspect-auto">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={alt}
                    src={src}
                  />
                  {/* Stat badge */}
                  <div className="absolute bottom-6 left-6 bg-brand-accent text-black px-4 py-2">
                    <div className="font-syne text-xl font-extrabold">{stat}</div>
                    <div className="font-syne text-[8px] tracking-widest uppercase font-bold">{statLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-10 md:p-12 space-y-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-brand-accent text-base">{icon}</span>
                      <span className="font-syne text-[9px] tracking-widest uppercase text-white/30 font-semibold">
                        Field Journal
                      </span>
                    </div>

                    <h3 className="font-syne text-2xl md:text-3xl font-bold text-white">{title}</h3>

                    <blockquote className="border-l-2 border-brand-accent/50 pl-4">
                      <p className="text-sm text-white/60 italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
                    </blockquote>

                    <p className="text-sm text-white/45 leading-relaxed">{body}</p>
                  </div>

                  {/* Tags */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-syne text-[8px] tracking-widest uppercase text-white/30 border border-white/10 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 font-syne text-[10px] tracking-widest uppercase text-white/40 hover:text-brand-accent transition-colors duration-300 border-b border-white/10 hover:border-brand-accent pb-2"
                    >
                      Read Full Story
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
