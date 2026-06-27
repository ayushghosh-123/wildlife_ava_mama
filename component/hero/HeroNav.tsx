"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItem, staggerFast, easeLuxury, duration } from "@/lib/motion";

export const HERO_NAV_LINKS = [
  { label: "Work", href: "#collections" },
  { label: "Stories", href: "#stories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function HeroNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center safe-top px-4 sm:px-6 pt-4 sm:pt-6"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.cinematic, ease: easeLuxury, delay: 0.1 }}
      >
        <header
          className={`
            w-full max-w-6xl flex items-center justify-between
            px-4 sm:px-6 md:px-8
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled
              ? "py-3 rounded-full bg-[#0a0a0a]/72 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_48px_rgba(0,0,0,0.55)]"
              : "py-3.5 sm:py-4 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.07]"
            }
          `}
          role="banner"
        >
          <a
            href="/"
            className="font-syne text-sm sm:text-base tracking-[0.2em] uppercase font-extrabold italic text-white shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            aria-label="Wild Lens — Home"
          >
            WILD<span className="text-brand-accent">LENS</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {HERO_NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 font-syne text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent rounded-full"
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-3.5 h-px bg-white transition-all duration-300 self-end ${
                menuOpen ? "opacity-0 w-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </header>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col justify-center items-center bg-[#070707]/96 backdrop-blur-2xl safe-top safe-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLuxury }}
          >
            <motion.nav
              className="flex flex-col items-center gap-8"
              aria-label="Mobile primary"
              variants={staggerFast}
              initial="hidden"
              animate="visible"
            >
              {HERO_NAV_LINKS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  variants={navItem}
                  className="font-syne text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white hover:text-brand-accent transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
