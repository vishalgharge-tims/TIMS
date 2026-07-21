# TIMS Experience Hub

A Vite + React + Tailwind CSS project, starting with the scroll-scrubbed
hero section. Built to grow component by component from here.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build in `dist/`.

## Project structure

```
├── index.html                 entry HTML (font links live here)
├── tailwind.config.js         design tokens (colors, fonts)
├── postcss.config.js
├── public/
│   └── hero-frames/           300 render frames (frame-001.jpg … frame-300.jpg)
├── src/
│   ├── main.jsx                React root
│   ├── App.jsx                 top-level page — sections get added here
│   ├── index.css               Tailwind directives + the few things Tailwind
│   │                           can't express as utilities (veil gradient, text glow)
│   ├── hooks/
│   │   └── useScrollFrameSequence.js   preloads frames, tracks scroll progress
│   └── components/
│       └── Hero/
│           └── HeroScrollAnimation.jsx   (styled entirely with Tailwind classes)
```

## What's built so far

- **Hero** (`src/components/Hero/`) — pinned, scroll-scrubbed frame-sequence
  hero, styled with Tailwind utility classes. Headline "TIMS Experience hub"
  (black, with a soft glow) + subhead (orange, with a soft glow) fade out
  over the first ~22% of scroll, leaving the render to carry the rest of the
  pin. `prefers-reduced-motion` is respected (falls back to a static frame).

## Styling approach

Almost everything is plain Tailwind utility classes directly in JSX. Three
things live in `src/index.css` under `@layer components` because they're not
expressible as clean Tailwind utilities:

- `.hero-veil` — the layered radial/linear gradient vignette over the canvas
- `.hero-headline-glow` / `.hero-sub-glow` — the text-shadow glows that keep
  the black headline and orange subhead legible against the busy background

Design tokens (colors, fonts) are centralized in `tailwind.config.js` under
`theme.extend` — `void`, `ink`, `muted`, `mint` for color, `display`/`mono`
for font families. Reuse those tokens (`bg-void`, `text-ink`, `text-mint`,
etc.) in new components instead of hardcoding hex values, so everything stays
consistent.

## Building the next component

1. New folder under `src/components/<Name>/` with its own `.jsx` (Tailwind
   classes, no separate CSS file needed unless something isn't expressible
   as a utility — in which case add it to `index.css` under `@layer
   components`, same pattern as the hero's veil/glow).
2. Import and drop it into `src/App.jsx`, replacing or following the
   "Next section goes here" placeholder.

Let me know which section to build next and I'll add it in place.
