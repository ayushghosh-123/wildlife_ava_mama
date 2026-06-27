"use client";

import { useEffect, useRef, useState } from "react";
import FogShader from "./FogShades";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [canParallax, setCanParallax] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setCanParallax(!prefersReduced && hasFinePointer);

    function onMove(e: MouseEvent) {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    }

    if (!prefersReduced && hasFinePointer) {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  const parallaxX = canParallax ? (mousePos.x - 0.5) * -18 : 0;
  const parallaxY = canParallax ? (mousePos.y - 0.5) * -12 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax — desktop only */}
      <div
        className="absolute inset-[-5%] z-0 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.1)` }}
      >
        <img
          alt="Wildlife photographer in misty mountains at dawn"
          className="w-full h-full object-cover select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA1cP00H7TIYrpHWB-MXtANkMHay6awMuzy9RpkKMr0RTB1XoHQccOoVjARblpEArjWa5dFnU6uOguNGsv4wOs5AsgN8x2sfRA5n4rbFUVrN-fA-3s7uLoYdrjQLu5KRaM__-iZmDIMxn_qWxwUoxgO7jpqACUjA0ogPiqR-x75MfTszWq5wv28nTcAEy8XUVUNdN047R9kcBotEHegAQUqtwFJuFYS6IpQX6PToUdrvvPbvL0wiFS8UomCOOvVLlqfFseEzSpRLFa"
        />
      </div>

      {/* Multi-layer gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/30 to-[#050505] sm:from-black/70 sm:via-black/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-transparent to-transparent sm:from-black/40" />

      {/* WebGL fog — lighter on mobile for performance */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-10 sm:opacity-15 md:opacity-20 mix-blend-screen">
        <FogShader />
      </div>

      {/* Hero content */}
      <div
        className={`page-container relative z-20 text-center max-w-5xl pt-24 sm:pt-28 md:pt-24 pb-16 sm:pb-20 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="font-syne text-[clamp(1.75rem,9vw,6.75rem)] leading-[0.95] sm:leading-[0.92] md:leading-[0.85] mb-5 sm:mb-8 md:mb-12 italic uppercase tracking-tighter text-white break-words-all">
          Capturing Nature
          <br />
          <span className="not-italic block mt-2 sm:mt-3 md:mt-0 opacity-80 tracking-[-0.03em] sm:tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-accent/80">
            Beyond Human Eyes
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 leading-relaxed font-light px-1">
          I travel the world&apos;s wildest places to document moments few people will ever witness —
          transforming raw nature into fine art for your sanctuary.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-sm sm:max-w-none mx-auto">
          <a
            href="#portfolio"
            className="group relative bg-white text-black w-full sm:w-auto px-6 sm:px-12 md:px-14 py-3.5 sm:py-5 font-syne text-[10px] font-bold hover:bg-brand-accent transition-all duration-500 milled-edge tracking-widest uppercase cursor-pointer overflow-hidden text-center"
          >
            <span className="relative z-10">Explore Portfolio</span>
          </a>
          <a
            href="#contact"
            className="border border-white/15 w-full sm:w-auto px-6 sm:px-12 md:px-14 py-3.5 sm:py-5 font-syne text-[10px] font-bold hover:border-brand-accent hover:text-brand-accent transition-all duration-500 tracking-widest uppercase cursor-pointer backdrop-blur-sm text-center"
          >
            Inquire for Print
          </a>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 md:gap-12 mt-10 sm:mt-16 md:mt-20 pt-5 sm:pt-10 border-t border-white/5">
          {[
            { val: "48+", label: "Countries" },
            { val: "12k+", label: "Field Hours" },
            { val: "200+", label: "Species" },
            { val: "50+", label: "Awards" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center px-1">
              <div className="font-syne text-lg sm:text-2xl md:text-3xl font-extrabold text-brand-accent">{val}</div>
              <div className="font-syne text-[7px] sm:text-[9px] tracking-widest uppercase text-white/30 mt-0.5 sm:mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — hidden on very short viewports */}
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 z-20 max-[480px]:hidden">
        <div className="w-px h-10 sm:h-16 bg-gradient-to-b from-transparent to-brand-accent animate-pulse" />
        <span className="font-syne text-[8px] sm:text-[9px] tracking-[0.5em] uppercase text-white/30">
          Scroll
        </span>
      </div>

      {/* Location tag — desktop only */}
      <div className="absolute right-4 sm:right-8 bottom-6 sm:bottom-12 z-20 hidden lg:flex items-center gap-2 opacity-40">
        <span className="material-symbols-outlined text-brand-accent text-sm">location_on</span>
        <span className="font-syne text-[9px] tracking-widest uppercase text-white">
          Currently: Spiti Valley, India
        </span>
      </div>
    </section>
  );
}
