"use client";

import Link from "next/link";
import { FaInstagram , FaPinterest } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Collections", href: "/collections" },
  { label: "Ethics", href: "/ethics" },
  { label: "Archives", href: "/portfolio" },
  { label: "Inquire", href: "/inquire" },
];
export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050505] border-t border-white/[0.06]">

      {/* Mid section: columns */}
      <div className="page-container py-12 sm:py-16 border-b border-white/5">
        <div>
          {/* Brand — full width on mobile */}
          <div className="mb-8 sm:mb-10 md:mb-0 pb-8 sm:pb-10 md:pb-0 border-b md:border-b-0 border-white/5 space-y-5 sm:space-y-6 md:hidden">
            <div className="font-syne text-xl tracking-[0.2em] uppercase font-extrabold italic text-white">WILDLIFE</div>
            <p className="text-sm text-white/35 leading-relaxed font-light max-w-xs">
              Fine art wildlife photography. Documenting the irreplaceable.
            </p>
            <div className="flex items-center gap-4">
              
            </div>
          </div>

          {/* 3-col link grid on mobile, 4-col on md (brand re-appears as col 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {/* Brand — desktop only */}
            <div className="hidden md:block space-y-6">
              <div className="font-syne text-2xl tracking-[0.2em] uppercase font-extrabold italic text-white">PXLALPHA</div>
              <p className="text-sm text-white/35 leading-relaxed font-light">
                Fine art wildlife photography. Documenting the irreplaceable.
              </p>
              <div className="flex items-center gap-4">
                
              </div>
            </div>

            {/* Nav */}
            <div className="space-y-4 sm:space-y-5">
              <h4 className="font-syne text-[9px] tracking-[0.4em] uppercase text-white/30 font-bold">Navigate</h4>
              <ul className="space-y-2 sm:space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="font-syne text-xs tracking-wider uppercase text-white/45 hover:text-white transition-colors duration-300 font-semibold">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4 sm:space-y-5">
              <h4 className="font-syne text-[9px] tracking-[0.4em] uppercase text-white/30 font-bold">Contact</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { icon: "mail", text: "anuvabde@gmail.com" },
                  { icon: "location_on", text: "Kolkata, India" },
                  { icon: "schedule", text: "Response within 24h" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-brand-accent text-sm mt-0.5 shrink-0">{icon}</span>
                    <span className="font-syne text-xs text-white/40 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recognition */}
            <div className="space-y-4 sm:space-y-5 col-span-2 sm:col-span-1">
              <h4 className="font-syne text-[9px] tracking-[0.4em] uppercase text-white/30 font-bold">Recognition</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "National Geographic",
                  "BBC Wildlife Photographer",
                  "Sony World Photography",
                  "Wildlife Photographer of the Year",
                ].map((item) => (
                  <li key={item} className="font-syne text-xs text-white/35 tracking-wide">- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="page-container py-5 sm:py-6 safe-bottom">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center text-white/20 font-syne text-[8px] sm:text-[9px] tracking-widest uppercase font-semibold text-center sm:text-left">
          <span>© 2026 Pristine Wildlife Photography. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="hover:text-white/50 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
