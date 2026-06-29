"use client";

import Link from "next/link";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const ALL_WORKS = [
  {
    title: "Apex Monarch",
    category: "Big Cats",
    src: "/Images/cat1.jpeg",
    edition: "Limited 12 Prints",
    location: "Bengal Tiger Reserve"
  },
  {
    title: "Silent Guardian",
    category: "Big Cats",
    src: "/Images/cat2.jpeg",
    edition: "Open Edition",
    location: "Urban Wilds"
  },
  {
    title: "Himalayan Stork",
    category: "Avian Corridors",
    src: "/Images/bird1.jpeg",
    edition: "Limited 8 Prints",
    location: "Spiti Valley"
  },
  {
    title: "Canopy Wanderer",
    category: "Avian Corridors",
    src: "/Images/bird2.jpeg",
    edition: "Limited 15 Prints",
    location: "Borneo Peatland"
  },
  {
    title: "Botanical Silence",
    category: "Flora & Fauna",
    src: "/Images/flower1.jpeg",
    edition: "Open Edition",
    location: "Western Ghats"
  }
];

export default function CollectionsPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
        {/* Page Title Header */}
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 mb-2">
              Complete Archive
            </p>
            <h1 className="font-sans text-[36px] sm:text-[48px] font-extralight uppercase tracking-tight text-white">
              Fine Art Collections
            </h1>
          </div>
          <p className="font-sans text-[12px] text-white/40 max-w-sm font-light leading-relaxed">
            Every photograph is printed on Museum-grade Hahnemühle Photo Rag paper. Individually inspected, signed, and numbered.
          </p>
        </div>

        {/* Gallery Grid showing all uploaded pictures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_WORKS.map((work, idx) => (
            <div key={idx} className="group flex flex-col bg-black border border-white/10 overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/70">
                    {work.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3 className="font-sans text-[18px] font-extralight uppercase tracking-tight text-white">
                    {work.title}
                  </h3>
                  <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">
                    {work.location}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50">
                    {work.edition}
                  </span>
                  <Link
                    href="/inquire"
                    className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/80 hover:text-white border-b border-white/30 hover:border-white transition-colors pb-0.5"
                  >
                    Inquire Print →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
