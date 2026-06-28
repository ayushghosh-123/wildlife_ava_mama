"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel, LineRevealHeading, WordRevealText, ClipRevealText, FadeReveal } from "@/component/ui/TextAnimations";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({
  target,
  suffix = "",
  compact = false,
}: {
  target: number;
  suffix?: string;
  compact?: boolean;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display =
    compact && count >= 1000 ? `${Math.floor(count / 1000)}k` : count.toLocaleString();

  return (
    <div ref={ref}>
      <span className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold text-brand-accent tabular-nums">
        {display}
        {suffix}
      </span>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-pad bg-surface relative overflow-hidden border-y border-white/5"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.07] grayscale pointer-events-none hidden md:block">
        <img
          className="w-full h-full object-cover object-center"
          alt="Photographer hands artistic portrait"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjLvk7xuD2zErHH9TOsj-Q930C-HcVN9GgtIQ2gfUUQJCGrhSFVB8ThmTAN9N7IvZGeBQtSZ-n88Kb7ynaw0HAP1XfbwnOOYtctwbJH2MCLy3ClDcy4VjWx11__CHl5SV58-dX92jM3N47i7MA7QYYS5MytZeQ6qowZTzm-mtokw8nH0hcQ-9G0zeO_1_WQvkpWaZiZva3AompventQBQP0qAPdanjqrzXI3ZDjEeTiOlubJ7TM-Fw__cKFgUHgCIz9m67X2-K8BDn"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-transparent to-surface/50" />
      </div>

      <div className="page-container relative z-10">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-16 lg:gap-24 items-center">
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div>
              <SectionLabel className="font-syne text-[10px] md:text-xs tracking-[0.4em] text-brand-accent uppercase font-bold mb-4 sm:mb-6">
                The Eye Behind the Lens
              </SectionLabel>
              <LineRevealHeading
                lines={["Witness to the wild", "for over 8 years."]}
                className="font-syne text-[clamp(1.75rem,6vw,3.75rem)] font-bold leading-tight text-white"
                lineClasses={["", "text-white/40"]}
                stagger={0.14}
              />
            </div>

            <WordRevealText
              className="text-sm sm:text-base text-white/60 leading-relaxed"
              delay={0.2}
            >
            For over 8 years, I've dedicated my life to documenting the untamed beauty of the natural world. I don't just capture wildlife-I tell stories of survival, resilience, and the delicate balance of nature. Through patience, respect, and countless hours in the field, my work aims to connect people with the wild, inspiring a deeper appreciation for the ecosystems we are privileged to witness and responsible for protecting. Every photograph is a reminder that nature's greatest stories deserve to be seen, remembered, and preserved.
            </WordRevealText>

            <blockquote className="border-l-2 border-brand-accent pl-4 sm:pl-6 py-2">
              <ClipRevealText
                as="p"
                className="font-syne text-base sm:text-lg italic text-white/70 leading-relaxed"
                delay={0.3}
              >
                &ldquo;The wild doesn&apos;t owe us beauty. We earn it by showing up, by being
                still, by learning to become part of the silence.&rdquo;
              </ClipRevealText>
            </blockquote>

            <FadeReveal delay={0.35} className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
              {["National Geographic", "BBC Wildlife", "Sony World Photography"].map((award) => (
                <span
                  key={award}
                  className="border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 font-syne text-[9px] tracking-widest uppercase text-white/40 hover:border-brand-accent hover:text-brand-accent transition-colors duration-300 cursor-default"
                >
                  {award}
                </span>
              ))}
            </FadeReveal>
          </div>

          {/* make it a round image wherere the protfolio owner saw her image in the public folder Image folder present . There avamama image is owner this part */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border border-white/10 shadow-2xl shrink-0">
            <img
              src="/Images/avamama.jpg"
              alt="Profile Avatar"
              className="w-full h-full object-cover scale-115 transition-transform duration-500 hover:scale-105"
              style={{ objectPosition: "center 75%" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
