"use client";

import { FadeReveal } from "@/component/ui/TextAnimations";

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
  return (
    <FadeReveal
      as="article"
      className="grid grid-cols-1 md:grid-cols-2 w-full border-t border-white/10 bg-black overflow-hidden"
      delay={index * 0.1}
      y={32}
    >
      {/* Left: Full-bleed image, no border-radius */}
      <div className="relative w-full h-full min-h-[400px] md:min-h-[550px] overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-none transition-transform duration-1000 hover:scale-[1.03]"
          alt={story.imageAlt}
          src={story.imageSrc}
        />
      </div>

      {/* Right: Pure black panel with stacked metadata */}
      <div className="bg-black p-8 sm:p-12 md:p-16 flex flex-col justify-between h-full min-h-[400px] md:min-h-[550px]">
        <div className="space-y-6">
          {/* Location in 9px caps */}
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50">
            {story.location}
          </p>

          {/* Title in 48px ultra-light sans */}
          <h2 className="font-sans text-[36px] sm:text-[44px] md:text-[48px] font-extralight leading-[1.05] text-white uppercase tracking-tight">
            {story.title}
          </h2>

          {/* Body copy in 13px 40% white */}
          <p className="font-sans text-[13px] text-white/40 leading-relaxed font-light max-w-xl">
            {story.description}
          </p>
        </div>

        {/* Print count in 9px caps bottom-anchored */}
        <div className="pt-8 mt-auto">
          <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50">
            {story.edition}
          </p>
        </div>
      </div>
    </FadeReveal>
  );
}

export default function FeaturedStories() {
  return (
    <section className="bg-black py-16 sm:py-24" id="stories">
      <div className="w-full space-y-16 sm:space-y-24">
        {STORIES.map((story, i) => (
          <StoryCard key={story.id} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
