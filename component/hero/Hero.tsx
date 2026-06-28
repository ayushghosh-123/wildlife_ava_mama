"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import FloatingGradients from "./FloatingGradients";
import GrainOverlay from "./GrainOverlay";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";
import { easeLuxury} from "@/lib/motion";

export default function Hero() {
  return (
    <>
      {/* Page-load curtain — cinematic fade */}
      <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: easeLuxury, delay: 0.15 }}
        aria-hidden="true"
      />

      <section
        id="hero"
        className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#050505]"
        aria-label="Hero — Wildlife photography portfolio"
      >
        <HeroBackground />
        <FloatingGradients />
        <GrainOverlay />
        <HeroContent />
        <ScrollIndicator />
      </section>
    </>
  );
}
