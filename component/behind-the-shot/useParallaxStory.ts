import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import type { StoryCardData } from "./data";

gsap.registerPlugin(ScrollTrigger);

export function useParallaxStory(cards: StoryCardData[]) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!sectionRef.current || !trackRef.current || cards.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track = trackRef.current!;

      const isReduced = prefersReducedMotion;

      if (!isReduced) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          const distance = Math.max(0, track.scrollWidth - section.clientWidth + 96);

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=2800",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          });

          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=2800",
              scrub: 1,
            },
          });
        });

        mm.add("(max-width: 1023px)", () => {
          cardRefs.current.forEach((card, index) => {
            if (!card) return;

            const cardEl = card.querySelector("article") as HTMLElement | null;
            const mediaEl = card.querySelector("img") as HTMLElement | null;

            if (cardEl) {
              gsap.fromTo(
                cardEl,
                {
                  opacity: 0,
                  y: 70,
                  scale: 0.96,
                  rotate: -1.2,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  ease: "power3.out",
                  duration: 1,
                  delay: index * 0.08,
                  scrollTrigger: {
                    trigger: cardEl,
                    start: "top 88%",
                    end: "top 45%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }

            if (mediaEl) {
              gsap.to(mediaEl, {
                yPercent: -6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cards.length, prefersReducedMotion]);

  return { sectionRef, trackRef, cardRefs, prefersReducedMotion };
}
