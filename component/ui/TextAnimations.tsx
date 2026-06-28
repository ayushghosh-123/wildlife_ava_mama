"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type Ref } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface BaseProps {
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  as?: ElementType;
  children?: ReactNode;
}

/** Eyebrow / section label — slides in from left with fade */
export function SectionLabel({
  children,
  className = "",
  delay = 0,
  start = "top 88%",
}: BaseProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        x: -24,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, start]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}

/** Heading — each line rises from a mask (editorial reveal) */
export function LineRevealHeading({
  lines,
  className = "",
  lineClassName = "",
  lineClasses,
  delay = 0,
  stagger = 0.12,
  start = "top 85%",
  as: Tag = "h2",
}: {
  lines: string[];
  lineClassName?: string;
  lineClasses?: string[];
} & BaseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;

    const lineEls = root.querySelectorAll("[data-line]");

    const ctx = gsap.context(() => {
      gsap.from(lineEls, {
        scrollTrigger: { trigger: root, start, toggleActions: "play none none none" },
        y: "110%",
        duration: 1.1,
        stagger,
        delay,
        ease: "power4.out",
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, delay, stagger, start, lines]);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <span
            data-line
            className={`block ${lineClasses?.[i] ?? lineClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Single heading string — splits into words with stagger */
export function WordRevealHeading({
  children,
  className = "",
  delay = 0,
  stagger = 0.04,
  start = "top 85%",
  as: Tag = "h2",
}: BaseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || !text) return;

    const words = root.querySelectorAll("[data-word]");

    const ctx = gsap.context(() => {
      gsap.from(words, {
        scrollTrigger: { trigger: root, start, toggleActions: "play none none none" },
        y: 40,
        opacity: 0,
        rotateX: -40,
        transformOrigin: "bottom center",
        duration: 0.85,
        stagger,
        delay,
        ease: "power3.out",
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, delay, stagger, start, text]);

  if (!text) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag ref={ref as Ref<never>} className={`${className} [perspective:800px]`}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Body copy — words fade up in sequence (creative portfolio feel) */
export function WordRevealText({
  children,
  className = "",
  delay = 0.15,
  stagger = 0.018,
  start = "top 88%",
  as: Tag = "p",
}: BaseProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || !text) return;

    const words = root.querySelectorAll("[data-word]");

    const ctx = gsap.context(() => {
      gsap.from(words, {
        scrollTrigger: { trigger: root, start, toggleActions: "play none none none" },
        y: 14,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.65,
        stagger,
        delay,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, delay, stagger, start, text]);

  if (!text) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.28em]">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Blockquote / accent text — clip-path wipe reveal */
export function ClipRevealText({
  children,
  className = "",
  delay = 0.2,
  start = "top 88%",
  as: Tag = "p",
}: BaseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        x: -20,
        duration: 1.2,
        delay,
        ease: "power4.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, start]);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}



// make a simple animation effect for the text when scroll down the page the text should come up with fade in effect and when scroll up the page the text should come down with fade out effect and also add the animation when scroll one by one word comes up with fade in and fade out effect also scroll up the text should go down with fade out effect and when scroll down the text should come up with fade in effect

/** Element reveal (GSAP) — fades up on scroll down, reverses on scroll up */
export function FadeReveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  start = "top 90%",
  as: Tag = "div",
}: BaseProps & { y?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play reverse play reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, y, start]);

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}

/** Word-by-word reveal (GSAP) — words animate sequentially on scroll down and reverse on scroll up */
export function WordScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  start = "top 88%",
  as: Tag = "p",
}: BaseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || !text) return;

    const words = root.querySelectorAll("[data-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: root,
            start,
            toggleActions: "play reverse play reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger,
          delay,
          ease: "power2.out",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, delay, stagger, start, text]);

  if (!text) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <span data-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}


/** Section header bundle — label + heading + optional side content */
export function SectionIntro({
  label,
  title,
  titleLines,
  className = "",
  headingClassName = "",
  labelClassName = "font-syne text-[10px] tracking-[0.4em] text-brand-accent uppercase font-bold mb-3 sm:mb-4",
}: {
  label: string;
  title?: string;
  titleLines?: string[];
  className?: string;
  headingClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={className}>
      <SectionLabel className={labelClassName}>{label}</SectionLabel>
      {titleLines ? (
        <LineRevealHeading lines={titleLines} className={headingClassName} />
      ) : title ? (
        <WordRevealHeading className={headingClassName}>{title}</WordRevealHeading>
      ) : null}
    </div>
  );
}
