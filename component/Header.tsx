"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/aboutsection" },
  { label: "Collections", href: "/collections" },
  { label: "Ethics", href: "/ethics" },
  { label: "Inquire", href: "/inquire" },
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://500px.com",
    label: "500px",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M9.974 12.008c0 1.12.91 2.03 2.03 2.03 1.12 0 2.03-.91 2.03-2.03 0-1.12-.91-2.03-2.03-2.03-1.12 0-2.03.91-2.03 2.03zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 17.5c-3.037 0-5.5-2.463-5.5-5.5S8.963 6.5 12 6.5s5.5 2.463 5.5 5.5-2.463 5.5-5.5 5.5z" />
      </svg>
    ),
  },
  {
    href: "https://behance.net",
    label: "Behance",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.688 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Capsule wrapper ─────────────────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center safe-top transition-all duration-500 ${
          scrolled ? "pt-3 sm:pt-4 px-3 sm:px-4" : "pt-4 sm:pt-6 px-4 sm:px-6"
        }`}
      >
        <header
          className={`
            w-full max-w-4xl flex items-center justify-between
            px-3 sm:px-5 md:px-6
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled
              ? "py-2 sm:py-2.5 md:py-3 rounded-full bg-[#0c0c0c]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
              : "py-2.5 sm:py-3 md:py-4 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.06]"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="font-syne text-xs sm:text-sm md:text-lg tracking-[0.12em] sm:tracking-[0.18em] uppercase font-extrabold italic text-white shrink-0 pl-0.5 sm:pl-1">
            PXL
            <span className="text-brand-accent">ALPHA</span>
          </Link> 

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  relative px-4 py-1.5 font-syne text-[10px] uppercase tracking-widest font-semibold
                  rounded-full transition-all duration-300
                  ${i === 0
                    ? "bg-white/10 text-white"
                    : "text-white/45 hover:text-white hover:bg-white/[0.07]"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden md:flex items-center gap-3 pr-1">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-brand-accent transition-colors duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-4 bg-white/10" />

            {/* CTA pill */}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px] cursor-pointer"
            >
              <span
                className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
              />
              <span
                className={`block w-3.5 h-[1.5px] bg-white rounded-full transition-all duration-300 self-end ${menuOpen ? "opacity-0 w-0" : ""
                  }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
              />
            </button>
          </div>
        </header>
        {/* Outer wrapper shrinks top offset on very small screens */}
      </div>

      {/* ── Mobile full-screen drawer ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center safe-top safe-bottom
          bg-[#070707]/97 backdrop-blur-2xl
          transition-all duration-500
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Close hint */}
        <p className="font-syne text-[9px] tracking-[0.5em] uppercase text-white/20 mb-10 sm:mb-16">
          Navigation
        </p>

        <nav className="flex flex-col items-center gap-5 sm:gap-8 mb-10 sm:mb-16">
          {NAV_LINKS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`font-syne text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white hover:text-brand-accent transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-white/10 mb-8 sm:mb-10" />

        {/* Socials */}
        <div className="flex items-center gap-6 sm:gap-8">
          {SOCIAL_LINKS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/30 hover:text-brand-accent transition-colors duration-300"
            >
              <span className="scale-150 block">{s.icon}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
