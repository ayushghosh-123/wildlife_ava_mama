# PXL ALPHA Website

This is a Next.js app using the App Router. The project is organized into route pages under `app/` and reusable UI components under `component/`.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## App Structure

### Root layout and shared rendering

- `app/layout.tsx` renders the global page structure.
- `app/layout.tsx` includes the shared `Header` and `Footer` on every page.
- `app/page.tsx` is the homepage and renders the following page sections:
  - `component/Hero.tsx`
  - `component/AboutSection.tsx`
  - `component/Collection.tsx`
  - `component/FeaturedStories.tsx`
  - `component/BehindTheShot.tsx`
  - `component/Newsletter.tsx`

### Route pages

- `app/page.tsx` — homepage
- `app/portfolio/page.tsx` — portfolio page rendering -`component/Collection.tsx`
- `app/collections/page.tsx` — collections page
- `app/ethics/page.tsx` — ethics page
- `app/inquire/page.tsx` — inquire/contact page

## Component structure

### Top-level components

- `component/Header.tsx`
  - site navigation
  - route-based links for Home, Portfolio, Collections, Ethics, Inquire
- `component/Footer.tsx`
  - contact call-to-action
  - footer navigation links and social icons
- `component/Hero.tsx`
  - site hero section
- `component/AboutSection.tsx`
  - summary section about the project
- `component/Collection.tsx`
  - featured collection cards and navigation CTA
- `component/FeaturedStories.tsx`
  - featured story cards and portfolio CTA
- `component/BehindTheShot.tsx`
  - behind-the-scenes section
- `component/Newsletter.tsx`
  - newsletter signup section

### Nested component folders

- `component/hero/`
  - `Hero.tsx`
  - `HeroBackground.tsx`
  - `HeroContent.tsx`
  - `HeroNav.tsx`
  - `FloatingGradients.tsx`
  - `GrainOverlay.tsx`
  - `ScrollIndicator.tsx`
- `component/ui/`
  - `TextAnimations.tsx`
    - animation utilities used across hero, sections, and cards
- `lib/`
  - `motion.ts`
  - `useReducedMotion.ts`

## Navigation

The site uses route-based navigation rather than hash anchors.

- `/` — home
- `/portfolio` — portfolio archive
- `/collections` — collections overview
- `/ethics` — ethics page
- `/inquire` — contact/inquire page

## Build

```bash
npm run build
```

## Notes

- Global styles are in `app/globals.css`.
- `Header` and `Footer` are shared across all routes through `app/layout.tsx`.
- Page route files are the entry points for each URL in the App Router.
