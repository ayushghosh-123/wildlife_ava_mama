"use client";

import {
  SectionLabel,
  LineRevealHeading,
  FadeReveal,
} from "@/component/ui/TextAnimations";

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Collections", href: "#collections" },
  { label: "The Ethics", href: "#ethics" },
  { label: "Archives", href: "#" },
  { label: "Inquire", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://500px.com",
    label: "500px",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M9.974 12.008c0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.91-2.03-2.03-2.03-1.12 0-2.03.91-2.03 2.03zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 17.5c-3.037 0-5.5-2.463-5.5-5.5S8.963 6.5 12 6.5s5.5 2.463 5.5 5.5-2.463 5.5-5.5 5.5z" />
      </svg>
    ),
  },
  {
    href: "https://behance.net",
    label: "Behance",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.688 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#050505] border-t border-white/[0.06]"
    >
      {/* Top section: CTA */}
      <div className="page-container py-14 sm:py-20 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3">
            <SectionLabel className="font-syne text-[10px] tracking-[0.4em] text-brand-accent uppercase font-bold">
              Commission a Print
            </SectionLabel>
            <LineRevealHeading
              lines={["Ready to bring the wild", "into your space?"]}
              className="font-syne text-[clamp(1.5rem,5vw,3rem)] font-bold text-white leading-tight"
              stagger={0.1}
            />
          </div>
          <FadeReveal delay={0.2}>
            <a
              href="mailto:studio@wildlife.art"
              className="group inline-flex items-center justify-center gap-4 bg-brand-accent text-black w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 font-syne text-[11px] font-extrabold tracking-widest uppercase hover:bg-white transition-colors duration-500 shrink-0"
            >
              Start a Conversation
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </FadeReveal>
        </div>
      </div>

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
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="text-white/25 hover:text-brand-accent transition-colors duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 3-col link grid on mobile, 4-col on md (brand re-appears as col 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {/* Brand — desktop only */}
            <div className="hidden md:block space-y-6">
              <div className="font-syne text-2xl tracking-[0.2em] uppercase font-extrabold italic text-white">WILDLIFE</div>
              <p className="text-sm text-white/35 leading-relaxed font-light">
                Fine art wildlife photography. Documenting the irreplaceable.
              </p>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="text-white/25 hover:text-brand-accent transition-colors duration-300 hover:scale-110 transform">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="space-y-4 sm:space-y-5">
              <h4 className="font-syne text-[9px] tracking-[0.4em] uppercase text-white/30 font-bold">Navigate</h4>
              <ul className="space-y-2 sm:space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="font-syne text-xs tracking-wider uppercase text-white/45 hover:text-white transition-colors duration-300 font-semibold">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4 sm:space-y-5">
              <h4 className="font-syne text-[9px] tracking-[0.4em] uppercase text-white/30 font-bold">Contact</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { icon: "mail", text: "studio@wildlife.art" },
                  { icon: "location_on", text: "Spiti Valley, India" },
                  { icon: "schedule", text: "Response within 48h" },
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
                  <li key={item} className="font-syne text-xs text-white/35 tracking-wide">— {item}</li>
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
