"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const smoothX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.7 });
  const smoothY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.7 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-16 w-16 rounded-full border border-white/20 bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_rgba(255,255,255,0.08)_38%,_rgba(255,255,255,0)_70%)] shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur-2xl md:block"
      style={{ x: smoothX, y: smoothY, opacity: isVisible ? 1 : 0 }}
      animate={{ scale: isVisible ? 1 : 0.82, boxShadow: "0 0 45px rgba(255,255,255,0.16)" }}
      transition={{ type: "spring", stiffness: 250, damping: 24 }}
    />
  );
}
