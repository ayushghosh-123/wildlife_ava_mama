import { motion } from "framer-motion";
import { forwardRef } from "react";
import type { StoryCardData } from "./data";

type StoryCardProps = {
  data: StoryCardData;
  index: number;
  active: boolean;
  onHover: () => void;
  reducedMotion: boolean;
};

export const StoryCard = forwardRef<HTMLDivElement, StoryCardProps>(function StoryCard(
  { data, index, active, onHover, reducedMotion },
  ref
) {
  const isAlternating = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, x: isAlternating ? -90 : 90, scale: 0.96, filter: "blur(12px)" }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={reducedMotion ? undefined : { y: -10, scale: 1.01, rotate: -0.5, transition: { duration: 0.25, ease: "easeOut" } }}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`group relative flex min-h-[34rem] w-[min(92vw,34rem)] shrink-0 overflow-hidden rounded-[2.25rem] border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.38)] transition-all duration-300 ${active ? "border-white/20 shadow-[0_36px_100px_rgba(0,0,0,0.5)]" : "border-white/10"}`}
    >
      <img src={data.src} alt={data.alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(6,6,6,0.2)_0%,_rgba(6,6,6,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,163,92,0.22),_transparent_36%)]" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-lg">
            {data.stat}
          </span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
            0{index + 1}
          </span>
        </div>

        <div className="max-w-[24rem] rounded-[1.5rem] border border-white/10 bg-black/25 p-6 backdrop-blur-2xl sm:p-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/55">Field note</p>
          <h3 className="text-2xl font-light uppercase tracking-[0.16em] text-white sm:text-[1.75rem]">
            {data.title}
          </h3>
          <blockquote className="mt-4 border-l border-white/20 pl-3 text-sm leading-7 text-white/80 italic">
            “{data.quote}”
          </blockquote>
          <p className="mt-4 text-sm leading-7 text-white/65">{data.body}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {data.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-white/55">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
});
