import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
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
        const locomotive = new LocomotiveScroll({
          lenisOptions: {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        });

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

        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          const direction = index % 2 === 0 ? -120 : 120;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: direction,
              scale: 0.96,
              filter: "blur(14px)",
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              ease: "power3.out",
              duration: 1.1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 40%",
                scrub: 0.8,
              },
            }
          );
        });

        return () => {
          locomotive.destroy();
        };
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cards.length, prefersReducedMotion]);

  return { sectionRef, trackRef, cardRefs, prefersReducedMotion };
}
