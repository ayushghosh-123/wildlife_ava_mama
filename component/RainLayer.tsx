"use client";

import { useMemo } from "react";

export function RainLayer() {
  const drops = useMemo(
    () => Array.from({ length: 42 }, (_, index) => ({ id: index, left: `${(index * 7) % 100}%`, delay: `${(index % 10) * 0.18}s`, duration: `${1.6 + (index % 5) * 0.2}s` })),
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_35%)]" />
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute top-[-10%] h-20 w-[1px] rounded-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.duration, animationName: "rain-fall" }}
        />
      ))}
    </div>
  );
}
