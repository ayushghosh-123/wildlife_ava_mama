"use client";

import {
  SectionIntro,
  WordRevealHeading,
  WordRevealText,
  FadeReveal,
} from "@/component/ui/TextAnimations";

const COLLECTIONS = [
  {
    title: "Big Cats",
    count: "12 Series",
    description: "Lions, leopards, cheetahs — apex predators in their domain.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxYCzQX5Cn7lVufxhn32CY1cslHi9QDKbg4nOdIz4331G1EGdzm7dY4l2kel33UEKrrf_Uzo3W4KI4aFQIP9rXz6C9VCJt0y-T0LLkKtuTmF5846m9iBDNk4-onJrCPV5kNzuCtgzyh6wJs_Vi1roNgUmB73IeeULqYlEyLeoXnIysi3RMz1y6k5FqV9vhzqzUqoxHbhaX-NcuBC7Z15XCQa4atFjC4fhPlh536_zs-vG4J8xP-aAiMNOrUKXe5ddJIsAy121zG45c",
    alt: "Lioness staring at camera",
    tag: "Popular",
  },
  {
    title: "Marine Life",
    count: "8 Series",
    description: "Below the surface, an alien world of colour and silence.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbTSD7wup3B4zKnaBbICHG6uyWGp4UC1_l8cyXVJ2k_2N9DwJtH1mRiqrr3Z225bvVigNKb0IvTAE_hKkwDsjr7Gp7o6s306DKdil3xGYv3s2Xkh_3VJzKPfYRzQp0f9b5aMnwG-I6K1J5NleAo0_Ty0Bd29UQ8UiPv7kwWZMIexc3VFO7R2wqRwNFBp_D2nvD6hhS4UiXOMWifdRALgN7nCYyAnpmHQCFyH27eoofFflfV9A_AjFHT2PajBTdUe0XxM7GXV8Im24B",
    alt: "Humpback whale underwater",
    tag: "New",
  },
  {
    title: "Avian Grace",
    count: "15 Series",
    description: "Every feather a brushstroke — birds photographed in raw flight.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLhUeVI2pMtxnOIRS4HeVTz0c8VMWOHR3K9IBGjasfxAjMEPf2j_WTu_gtcY15KYqI0jFFWFqmBBz5vUqFJGr8xYsLytdXXTqQcXbBRlxDykDMhz7MFgrRns1KcMbNXp83P2GgS_fraswnjMkcxyxzKmIqWDtoTVF2ICnS_4iH_L7dh8oqmbMDNB5kCFstcQxNI0gOpammaozIJYGNaJCvohAoCyeSMqQgyoaZiBSeGYIKrvIFJTdpml1GveWoTjLxQZ14X57Yp7aS",
    alt: "Owl in mid-flight",
    tag: null,
  },
];

export default function Collections() {
  return (
    <section id="collections" className="section-pad bg-[#050505]">
      <div className="page-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 md:mb-20">
          <SectionIntro
            label="Fine Art Prints"
            title="Collections"
            headingClassName="font-syne text-[clamp(1.5rem,5vw,3rem)] font-bold text-white"
          />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5 hidden md:block mx-12" />
          <FadeReveal delay={0.2} className="self-start">
            <a
              href="/collections"
              className="font-syne text-[10px] tracking-widest uppercase text-white/40 hover:text-brand-accent transition-colors duration-300 border-b border-white/10 hover:border-brand-accent pb-2 flex items-center gap-2"
            >
              All Collections
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </FadeReveal>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {COLLECTIONS.map(({ title, count, description, src, alt, tag }, i) => (
            <FadeReveal key={title} delay={i * 0.1} y={40}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={alt}
                  src={src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />
                {tag && (
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-brand-accent text-black font-syne text-[9px] tracking-widest uppercase font-bold px-3 py-1">
                    {tag}
                  </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <p className="font-syne text-[9px] tracking-[0.3em] uppercase text-brand-accent font-bold mb-2">
                      {count}
                    </p>
                    <WordRevealHeading
                      className="font-syne text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3"
                      stagger={0.05}
                      start="top 92%"
                    >
                      {title}
                    </WordRevealHeading>
                    <WordRevealText
                      className="font-syne text-xs text-white/50 leading-relaxed"
                      stagger={0.012}
                      start="top 92%"
                    >
                      {description}
                    </WordRevealText>
                  </div>
                  <div className="mt-3 sm:mt-4 h-8 md:h-0 md:group-hover:h-8 overflow-hidden transition-all duration-500">
                    <a
                      href="/portfolio"
                      className="inline-flex items-center gap-1 font-syne text-[9px] tracking-widest uppercase text-brand-accent font-bold"
                    >
                      Explore Series
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeReveal>
          ))}
        </div>

        <FadeReveal delay={0.15} className="mt-8 sm:mt-12">
          <p className="text-center font-syne text-[8px] sm:text-[9px] tracking-widest uppercase text-white/20 px-2 leading-relaxed">
            All prints are archival pigment on Hahnemühle Photo Rag · Signed & numbered by the artist
          </p>
        </FadeReveal>
      </div>
    </section>
  );
}
