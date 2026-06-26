"use client";

import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="collections" className="py-40 px-6 md:px-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="font-syne text-[10px] tracking-[0.4em] text-brand-accent uppercase font-bold mb-4">
              Fine Art Prints
            </p>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">Collections</h2>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/5 hidden md:block mx-12" />
          <a
            href="#"
            className="font-syne text-[10px] tracking-widest uppercase text-white/40 hover:text-brand-accent transition-colors duration-300 border-b border-white/10 hover:border-brand-accent pb-2 self-start flex items-center gap-2"
          >
            All Collections
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {COLLECTIONS.map(({ title, count, description, src, alt, tag }, i) => (
            <div
              key={title}
              className={`group relative aspect-[3/4] overflow-hidden cursor-pointer transition-all duration-1000 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={alt}
                src={src}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

              {/* Tag badge */}
              {tag && (
                <div className="absolute top-5 right-5 bg-brand-accent text-black font-syne text-[9px] tracking-widest uppercase font-bold px-3 py-1">
                  {tag}
                </div>
              )}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="font-syne text-[9px] tracking-[0.3em] uppercase text-brand-accent font-bold mb-2">
                    {count}
                  </p>
                  <h3 className="font-syne text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
                  <p className="font-syne text-xs text-white/0 group-hover:text-white/60 transition-all duration-500 leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-500">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 font-syne text-[9px] tracking-widest uppercase text-brand-accent font-bold"
                  >
                    Explore Series
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-syne text-[9px] tracking-widest uppercase text-white/20 mt-12">
          All prints are archival pigment on Hahnemühle Photo Rag · Signed & numbered by the artist
        </p>
      </div>
    </section>
  );
}
