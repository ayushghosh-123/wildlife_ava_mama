"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaInstagram, FaPinterest } from "react-icons/fa";

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
    icon:<FaInstagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"/>
  },
  // add pinerest and logo here only
  {
    href: "",
    label: "Pinterest",
    icon : <FaPinterest className="w-5 h-5 text-white/80 group-hover:text-white transition-colors"/>
  }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed Wrapper ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full pt-6 px-6 sm:px-12 flex justify-center">
        <header className="w-full max-w-7xl flex items-center justify-between bg-transparent border-none backdrop-blur-none shadow-none">
          {/* Logo - left-anchored */}
          <Link href="/" className="font-syne text-[10px] uppercase tracking-[0.15em] text-white/50 font-extrabold italic shrink-0">
            PXLALPHA
          </Link>

          {/* Right-anchored desktop nav & actions */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-syne text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Social icons */}
            <div className="hidden md:flex items-center gap-4">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-white transition-colors duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>

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
      </div>

      {/* ── Mobile full-screen drawer ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center safe-top safe-bottom
          bg-[#070707]/97 backdrop-blur-2xl
          transition-all duration-500
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
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

        <div className="w-12 h-[1px] bg-white/10 mb-8 sm:mb-10" />

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
