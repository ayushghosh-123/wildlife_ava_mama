"use client";

import { FaEnvelope, FaWhatsapp, FaArrowRight, FaInstagram, FaPinterest } from "react-icons/fa6";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:anuvabde@gmail.com",
    icon: <FaEnvelope className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pxl_alpha",
    icon: <FaInstagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />,
  },
  {
    label: "pinterest",
    href: "https://in.pinterest.com/anuvabde/",
    icon: <FaPinterest className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919531769585",
    icon: <FaWhatsapp className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />,
  },
];

export default function Newsletter() {
  return (
    <section className="relative py-20 sm:py-28 px-4 overflow-hidden bg-[#080808]">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,600px)] h-[min(100vw,600px)] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
        {/* Main Header */}
        <h2 className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
          Let's Work Together
        </h2>

        {/* Profile / Exchange Graphic */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2">
          {/* Avatar Card */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-white/15 bg-white/[0.02] p-1.5 backdrop-blur-sm shadow-xl flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="./Images/avamama.jpg"
              alt="Profile Avatar"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Exchange Arrows Icon */}
          <div className="text-white/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M20 17H4M4 17l4-4M4 17l4 4M4 7h16M20 7l-4-4M20 7l-4 4" />
            </svg>
          </div>

          {/* Target / Placeholder Card */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5 backdrop-blur-sm shadow-xl flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-white/15" />
            </div>
          </div>
        </div>

        {/* Suggestion / Idea / Thought Subheading */}
        <div className="space-y-3 pt-2">
          <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Suggestion/Idea/Thought?
          </h3>
          <div className="flex justify-center pt-2">
            {/* Green Teardrop Accent Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-emerald-400 animate-pulse"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
          </div>
        </div>

        {/* Links List */}
        <div className="max-w-2xl mx-auto w-full pt-6">
          <div className="border-t border-b border-white/10 divide-y divide-white/10 text-left">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5 px-3 sm:px-6 group transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4">
                  {link.icon}
                  <span className="font-syne text-lg sm:text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </div>
                <FaArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
