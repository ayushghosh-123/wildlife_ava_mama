"use client";

import {
  SectionIntro,
  WordRevealHeading,
  WordRevealText,
  ClipRevealText,
  FadeReveal,
  LineRevealHeading,
  SectionLabel,
} from "@/component/ui/TextAnimations";

const STORIES = [
  {
    id: "spiti",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6ckcx5feorINemOOrqFWGmuMNmg1FvPROWoIBz081s7MaIC5_H8T9tIgNGBzxIflwV29p4c0P2mVrbhL6o2t-GOmfgkEyLrdcMNLNZs86EpASQ0LwLvINTAzqrsfmRmXTq7cAS9HbGhaKnHN1nxcf1LMvgsyr5I0PJ4nUtnClsbyJNOEQOAGDm1p-_NlowLD7qL2Kwsct8Dn1xSNMX9v2hlu2WvG5RkY7iDb2PWriN_17k6548ecyI8oJsegzdI0Hn83AR3j9zjvq",
    imageAlt: "Snow leopard in Himalayan mist",
    species: "Snow Leopard",
    location: "Spiti Valley, India",
    gear: "600mm f/4 · ISO 800",
    edition: "Limited — 12 prints",
    title: "The Ghost of the Spiti",
    description:
      "Seven days of waiting in sub-zero temperatures. At 4,000 meters, patience isn't a virtue — it's a requirement for survival. This frame captured the exact second the 'Ghost' acknowledged my lens.",
    year: "2023",
    aspect: "aspect-[4/5]",
    layout: "normal",
  },
  {
    id: "arctic",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9l4Li64xjHn4MVOKbCmyLWvvOrMuwQfA0vlrfWZSFh-DiUHLhJq0x_jrWKodq10bzyLm_eBM5e61NLOwilrgDjTg9MiImujPUeG7OuUUmVMJK-N3cISy_MQupgQOH44QXSGH-_ldq8m6mWgxzJnC6tRoZ_V7PWhiB7sGuujRORmW9Xw5S_6ZyoXNfdakRhNK_laSyuiULFSg_0vb2Nh5N1DVprchrZ584vcXSMeBeufvkpqdC_5WwR5dmWT85Am_T1yWetXyVw91c",
    imageAlt: "Polar bear on crumbling ice floe",
    species: "Polar Bear",
    location: "Svalbard, Norway",
    gear: "400mm f/2.8 · ISO 200",
    edition: "Open — 40 prints left",
    title: "Arctic Monoliths",
    description:
      "Exploring the Svalbard archipelago where polar bears rule the ice. We found this lone male traversing a crumbling glacier — a silent witness to the changing tides of our world.",
    year: "2022",
    aspect: "aspect-[16/9]",
    layout: "reverse",
  },
];

function StoryCard({ story, index }: { story: (typeof STORIES)[0]; index: number }) {
  const isReverse = story.layout === "reverse";
  const align = isReverse ? "md:text-right md:items-end" : "";

  return (
    <FadeReveal
      as="article"
      className="grid gap-6 sm:gap-8 md:grid-cols-12 md:gap-6 items-center"
      delay={index * 0.1}
      y={48}
    >
      <div
        className={`group relative overflow-hidden cursor-pointer ${
          isReverse ? "md:col-span-7 md:col-start-5 md:order-2" : "md:col-span-7"
        }`}
      >
        <img
          className={`w-full ${story.aspect} max-h-[70vw] sm:max-h-none object-cover transition-transform duration-1000 group-hover:scale-[1.04]`}
          alt={story.imageAlt}
          src={story.imageSrc}
        />
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 font-syne text-[9px] tracking-widest uppercase text-white/50 font-bold">
          {story.year}
        </div>
        <div className="absolute bottom-0 left-0 right-0 glass-overlay p-4 sm:p-7 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-syne text-[10px] tracking-wider text-brand-accent uppercase font-semibold">
                {story.species}
              </p>
              <p className="font-syne text-[10px] tracking-wider text-white/50 uppercase mt-1">
                {story.location}
              </p>
            </div>
            <p className="font-syne text-[9px] tracking-widest text-white/30 uppercase hidden sm:block">
              {story.gear}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`space-y-4 sm:space-y-6 pt-2 md:pt-0 flex flex-col ${align} ${
          isReverse ? "md:col-span-4 md:order-1" : "md:col-span-4 md:col-start-9"
        }`}
      >
        <FadeReveal delay={0.05}>
          <div className={`flex items-center gap-3 ${isReverse ? "md:flex-row-reverse" : ""}`}>
            <span className="w-6 h-px bg-brand-accent" />
            <span className="font-syne text-[9px] tracking-widest uppercase text-brand-accent font-semibold">
              Featured Story
            </span>
          </div>
        </FadeReveal>

        <WordRevealHeading
          className={`font-syne text-[clamp(1.5rem,5vw,3rem)] font-bold leading-[1.05] text-white ${isReverse ? "md:text-right" : ""}`}
          delay={0.08}
        >
          {story.title}
        </WordRevealHeading>

        <WordRevealText
          className={`text-sm md:text-base text-white/55 leading-relaxed ${isReverse ? "md:text-right" : ""}`}
          delay={0.15}
        >
          {story.description}
        </WordRevealText>

        <FadeReveal delay={0.25} className={`flex items-center gap-4 ${isReverse ? "md:justify-end" : ""}`}>
          <span className="font-syne text-[9px] tracking-widest uppercase text-white/25 font-semibold border border-white/10 px-3 py-1.5">
            {story.edition}
          </span>
        </FadeReveal>

        <FadeReveal delay={0.32} className={`flex items-center gap-4 pt-2 ${isReverse ? "md:justify-end" : ""}`}>
          <a
            href="#"
            className="group/link inline-flex items-center gap-2 border-b border-brand-accent pb-2 font-syne text-[10px] tracking-wider uppercase font-bold text-white hover:text-brand-accent transition-colors duration-300"
          >
            View Series
            <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/link:translate-x-1">
              arrow_forward
            </span>
          </a>
        </FadeReveal>
      </div>
    </FadeReveal>
  );
}

export default function FeaturedStories() {
  return (
    <section className="section-pad bg-[#050505]" id="stories">
      <div className="page-container mb-10 sm:mb-16 md:mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
        <SectionIntro
          label="Portfolio · 2022–2024"
          title="Featured Stories"
          headingClassName="font-syne text-[clamp(1.5rem,5vw,3rem)] font-bold text-white"
        />
        <FadeReveal delay={0.2} className="self-start">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-syne text-[10px] tracking-widest uppercase text-white/40 hover:text-brand-accent transition-colors duration-300 border-b border-white/10 hover:border-brand-accent pb-2"
          >
            View Full Archive
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </FadeReveal>
      </div>

      <div className="page-container space-y-12 sm:space-y-20 md:space-y-40">
        {STORIES.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
