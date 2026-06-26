"use client";

import { useEffect, useRef, useState } from "react";
import FogShader from "./FogShades";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    function onMove(e: MouseEvent) {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * -18;
  const parallaxY = (mousePos.y - 0.5) * -12;

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
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
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/20 to-[#050505]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* WebGL fog */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-20 mix-blend-screen">
        <FogShader />
      </div>

      {/* Floating social sidebar */}
      <div
        className={`absolute left-8 bottom-32 z-20 hidden lg:flex flex-col items-center gap-5 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
        style={{ transitionDelay: "1.2s" }}
      >
        {[
          { href: "https://instagram.com", label: "IG", icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          )},
          { href: "https://500px.com", label: "500px", icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M9.974 12.008c0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.91-2.03-2.03-2.03-1.12 0-2.03.91-2.03 2.03zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 17.5c-3.037 0-5.5-2.463-5.5-5.5S8.963 6.5 12 6.5s5.5 2.463 5.5 5.5-2.463 5.5-5.5 5.5z" />
            </svg>
          )},
          { href: "https://behance.net", label: "Be", icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.688 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
            </svg>
          )},
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/30 hover:text-brand-accent transition-all duration-300 hover:scale-125"
          >
            {s.icon}
          </a>
        ))}
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent mt-2" />
      </div>

      {/* Hero content */}
      <div
        className={`container mx-auto px-6 md:px-20 relative z-20 text-center max-w-5xl pt-20 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="font-syne text-[42px] md:text-[108px] leading-[0.9] md:leading-[0.85] mb-12 italic uppercase tracking-tighter text-white">
          Capturing Nature
          <br />
          <span className="not-italic block mt-4 md:mt-0 opacity-80 tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-accent/80">
            Beyond Human Eyes
          </span>
        </h1>
        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
          I travel the world&apos;s wildest places to document moments few people will ever witness —
          transforming raw nature into fine art for your sanctuary.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#portfolio"
            className="group relative bg-white text-black px-14 py-5 font-syne text-[10px] font-bold hover:bg-brand-accent transition-all duration-500 milled-edge tracking-widest uppercase cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">Explore Portfolio</span>
          </a>
          <a
            href="#contact"
            className="border border-white/15 px-14 py-5 font-syne text-[10px] font-bold hover:border-brand-accent hover:text-brand-accent transition-all duration-500 tracking-widest uppercase cursor-pointer backdrop-blur-sm"
          >
            Inquire for Print
          </a>
        </div>

        {/* Quick stats strip */}
        <div className="flex justify-center gap-12 mt-20 pt-10 border-t border-white/5">
          {[
            { val: "48+", label: "Countries" },
            { val: "12k+", label: "Field Hours" },
            { val: "200+", label: "Species" },
            { val: "50+", label: "Awards" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="font-syne text-2xl md:text-3xl font-extrabold text-brand-accent">{val}</div>
              <div className="font-syne text-[9px] tracking-widest uppercase text-white/30 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-brand-accent animate-pulse" />
        <span className="font-syne text-[9px] tracking-[0.5em] uppercase text-white/30">
          Scroll
        </span>
      </div>

      {/* Right corner: current location tag */}
      <div className="absolute right-8 bottom-12 z-20 hidden lg:flex items-center gap-2 opacity-40">
        <span className="material-symbols-outlined text-brand-accent text-sm">location_on</span>
        <span className="font-syne text-[9px] tracking-widest uppercase text-white">
          Currently: Spiti Valley, India
        </span>
      </div>
    </section>
  );
}
