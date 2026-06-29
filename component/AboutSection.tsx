"use client";

import { FadeReveal } from "@/component/ui/TextAnimations";

export default function AboutSection() {
  return (
    <section id="about" className="bg-black w-full py-20 sm:py-28 px-6 sm:px-12 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left column: Large pull quote in 32px light italic serif, left-anchored, white */}
          <FadeReveal delay={0.1}>
            <blockquote className="font-serif italic font-light text-[24px] sm:text-[28px] md:text-[32px] text-white leading-tight max-w-lg">
              &ldquo;The wild doesn&apos;t owe us beauty. We earn it by showing up, by being still, by learning to become part of the silence.&rdquo;
            </blockquote>
          </FadeReveal>

          {/* Right column: Owner picture & Bio text 13px, 40% white */}
          <FadeReveal delay={0.2} className="space-y-6">
            {/* Owner Picture Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-white/15 shrink-0 mb-4 shadow-xl">
              <img
                src="/Images/avamama.jpg"
                alt="Owner portrait"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 75%" }}
              />
            </div>

            <p className="font-sans text-[13px] text-white/40 leading-relaxed font-light">
              For over 8 years, I've dedicated my life to documenting the untamed beauty of the natural world. I don't just capture wildlife — I tell stories of survival, resilience, and the delicate balance of nature. Through patience, respect, and countless hours in the field, my work aims to connect people with the wild, inspiring a deeper appreciation for the ecosystems we are privileged to witness and responsible for protecting.
            </p>
            <p className="font-sans text-[13px] text-white/40 leading-relaxed font-light">
              Every photograph is a reminder that nature's greatest stories deserve to be seen, remembered, and preserved across tiger reserves and Himalayan corridors.
            </p>
          </FadeReveal>
        </div>

        {/* Press logos bottom row: 9px caps, muted, single row */}
        <FadeReveal delay={0.3} className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 sm:gap-8">
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/30">
            National Geographic
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/30">
            BBC Wildlife
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/30">
            Sony World Photography
          </span>
        </FadeReveal>
      </div>
    </section>
  );
}
