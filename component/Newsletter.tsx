"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate async submission
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  }

  return (
    <section className="relative section-pad overflow-hidden bg-[#050505]">
      {/* BG accent glow — scales with viewport */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,600px)] h-[min(100vw,600px)] rounded-full bg-brand-accent/5 blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="page-container max-w-3xl relative z-10 text-center space-y-8 sm:space-y-10">
        <p className="font-syne text-[10px] tracking-[0.4em] text-brand-accent uppercase font-bold">
          Inner Circle
        </p>

        <h2 className="font-syne text-[clamp(2.25rem,10vw,6rem)] leading-none uppercase italic font-extrabold tracking-tighter text-white">
          Stay Wild.
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-sm sm:max-w-xl mx-auto leading-relaxed px-2">
          Join 4,200+ subscribers for exclusive early access to print releases, field dispatches,
          and behind-the-scenes journals — delivered monthly.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <span className="material-symbols-outlined text-brand-accent text-5xl">check_circle</span>
            <p className="font-syne text-xl font-bold text-white">You&apos;re in the circle.</p>
            <p className="font-syne text-sm text-white/40">First dispatch arrives next month.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto pt-6 px-2 sm:px-0 w-full">
            <input
              className="w-full bg-transparent border-b border-white/15 pb-5 pr-[4.5rem] sm:pr-24 focus:outline-none focus:border-brand-accent text-base sm:text-lg md:text-xl placeholder:text-white/15 text-white rounded-none transition-colors duration-300 min-h-[44px]"
              placeholder="Your Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-0 bottom-5 font-syne text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 cursor-pointer disabled:opacity-50 py-1 px-1"
            >
              {status === "loading" ? (
                <span className="text-white/40 animate-pulse">Sending…</span>
              ) : (
                <span className="text-brand-accent hover:text-white transition-colors">Join →</span>
              )}
            </button>
          </form>
        )}

        {/* Social proof strip */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 pt-4 border-t border-white/5">
          {[
            { icon: "verified", label: "No spam, ever" },
            { icon: "lock", label: "Private & secure" },
            { icon: "cancel", label: "Unsubscribe anytime" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/25">
              <span className="material-symbols-outlined text-sm">{icon}</span>
              <span className="font-syne text-[9px] tracking-widest uppercase font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
