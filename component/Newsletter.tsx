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
    <section className="relative py-40 px-6 md:px-20 overflow-hidden bg-[#050505]">
      {/* BG accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center space-y-10">
        <p className="font-syne text-[10px] tracking-[0.4em] text-brand-accent uppercase font-bold">
          Inner Circle
        </p>

        <h2 className="font-syne text-5xl md:text-8xl leading-none uppercase italic font-extrabold tracking-tighter text-white">
          Stay Wild.
        </h2>

        <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
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
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto pt-6">
            <input
              className="w-full bg-transparent border-b border-white/15 pb-5 pr-20 focus:outline-none focus:border-brand-accent text-lg md:text-xl placeholder:text-white/15 text-white rounded-none transition-colors duration-300"
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
              className="absolute right-0 bottom-5 font-syne text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 cursor-pointer disabled:opacity-50"
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
        <div className="flex justify-center items-center gap-6 pt-4 border-t border-white/5">
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
