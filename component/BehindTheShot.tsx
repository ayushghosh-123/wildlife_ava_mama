"use client";

import { useRef, useState } from "react";
import { SectionIntro, WordRevealHeading, WordRevealText, ClipRevealText, FadeReveal, SectionLabel } from "@/component/ui/TextAnimations";

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
    <section id="process" className="section-pad bg-[#0a0a0a] overflow-hidden">
      <div className="page-container">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <SectionIntro
            label="Process & Ethics"
            title="Behind The Shot"
            headingClassName="font-syne text-[clamp(1.35rem,4.2vw,2.4rem)] font-bold text-white"
          />

          <FadeReveal delay={0.15} className="flex items-center gap-2 sm:gap-3">
            {CASE_STUDIES.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center -m-2 ${i === active
                    ? "[&>span]:w-7 [&>span]:bg-brand-accent"
                    : "[&>span]:w-2 [&>span]:bg-white/20 hover:[&>span]:bg-white/50"
                  }`}
              >
                <span className="block h-0.5 transition-all duration-300" />
              </button>
            ))}
            <span className="font-syne text-[9px] tracking-widest uppercase text-white/20 ml-1 sm:ml-2">
              {active + 1} / {CASE_STUDIES.length}
            </span>
          </FadeReveal>
        </div>

        <SectionLabel className="font-syne text-[8px] tracking-[0.35em] uppercase text-white/20 mb-3 md:hidden">
          Swipe to explore →
        </SectionLabel>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-6 scroll-pl-6 scroll-smooth pb-6"
          onScroll={(e) => {
            const el = e.currentTarget;
            const card = el.children[0] as HTMLElement | undefined;
            if (!card) return;
            const index = Math.round(el.scrollLeft / (card.offsetWidth + 12));
            setActive(Math.min(Math.max(index, 0), CASE_STUDIES.length - 1));
          }}
        >
          {CASE_STUDIES.map(({ title, quote, body, stat, statLabel, icon, tags, src, alt }) => (
            <div
              key={title}
              className="snap-center shrink-0 w-[88%] sm:w-[72%] md:w-[55%] lg:w-[420px] "
            >
              <div className="flex h-full flex-col bg-[#050505] border border-white/5 overflow-hidden group">
                <div className="relative overflow-hidden h-70 sm:h-64 md:h-68">
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={alt}
                    src={src}
                  />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-brand-accent text-black px-3 py-1.5 sm:px-3.5 sm:py-2">
                    <div className="font-syne text-sm sm:text-base font-extrabold">{stat}</div>
                    <div className="font-syne text-[8px] tracking-widest uppercase font-bold">
                      {statLabel}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-3 sm:space-y-4">
                    <FadeReveal delay={0.05}>
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-brand-accent text-sm">
                          {icon}
                        </span>
                        <span className="font-syne text-[9px] tracking-widest uppercase text-white/30 font-semibold">
                          Field Journal
                        </span>
                      </div>
                    </FadeReveal>

                    <WordRevealHeading
                      className="font-syne text-lg sm:text-xl md:text-2xl font-bold text-white"
                      start="top 92%"
                    >
                      {title}
                    </WordRevealHeading>

                    <blockquote className="border-l-2 border-brand-accent/50 pl-3">
                      <ClipRevealText
                        as="p"
                        className="text-xs sm:text-sm text-white/60 italic leading-relaxed"
                        start="top 92%"
                      >
                        &ldquo;{quote}&rdquo;
                      </ClipRevealText>
                    </blockquote>

                    <WordRevealText
                      className="text-xs sm:text-sm text-white/45 leading-relaxed"
                      start="top 92%"
                      delay={0.12}
                    >
                      {body}
                    </WordRevealText>
                  </div>

                  <div className="space-y-3">
                    <FadeReveal delay={0.2} className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-syne text-[8px] tracking-widest uppercase text-white/30 border border-white/10 px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </FadeReveal>
                    <FadeReveal delay={0.28}>
                      <a
                        href="/portfolio"
                        className="inline-flex items-center gap-2 font-syne text-[9px] tracking-widest uppercase text-white/40 hover:text-brand-accent transition-colors duration-300 border-b border-white/10 hover:border-brand-accent pb-1.5"
                      >
                        Read Full Story
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </a>
                    </FadeReveal>
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
