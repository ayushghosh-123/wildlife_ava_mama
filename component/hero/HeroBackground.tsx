"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useFinePointer, useReducedMotion } from "@/lib/useReducedMotion";

const HERO_VIDEO = "/hero_video.mp4";

export default function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    if (!bg) return;

    let removeMouse: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(
          bg,
          { scale: 1.18 },
          { scale: 1.06, duration: 9, ease: "power2.out" }
        );

        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.88,
            duration: 5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }
    }, bg);

    if (finePointer && !reducedMotion) {
      const quickX = gsap.quickTo(bg, "x", { duration: 1.4, ease: "power3.out" });
      const quickY = gsap.quickTo(bg, "y", { duration: 1.4, ease: "power3.out" });

      function onMove(e: MouseEvent) {
        quickX((e.clientX / window.innerWidth - 0.5) * -36);
        quickY((e.clientY / window.innerHeight - 0.5) * -24);
      }

      window.addEventListener("mousemove", onMove);
      removeMouse = () => window.removeEventListener("mousemove", onMove);
    }

    return () => {
      removeMouse?.();
      ctx.revert();
    };
  }, [reducedMotion, finePointer]);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-[-8%] will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <video
            src={HERO_VIDEO}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Cinematic grade + vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/25 to-[#050505]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-transparent to-black/30" />
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Animated light sweep */}
      <div className="hero-light-sweep absolute inset-0 z-[2] pointer-events-none" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setIsMuted((prev) => !prev)}
        className="absolute bottom-4 right-4 z-[3] rounded-full border border-white/20 bg-black/35 p-3 text-sm text-white backdrop-blur-md transition hover:bg-black/55"
        aria-label={isMuted ? "Enable background sound" : "Mute background sound"}
      >
        {isMuted ? "🔈" : "🔊"}
      </button>
    </>
  );
}
