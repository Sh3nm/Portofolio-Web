---
name: frontend-design
description: Design system and UI taste for this portfolio. Apply whenever building, restyling, or reviewing any visual component (sections, cards, buttons, forms, layouts) so the output matches the existing Next.js + Tailwind v4 + shadcn/ui aesthetic instead of generic AI Tailwind.
---

# Frontend Design — Portfolio

This portfolio has an established visual language: quiet neutrals, a single teal accent, generous whitespace, restrained motion. Read this before producing UI. The point is **taste, not novelty** — match what's there.

## Stack constraints

- Next.js (App Router), Tailwind CSS v4, shadcn/ui primitives in `src/components/ui`
- Design tokens are OKLCH CSS variables in `src/app/globals.css` — **always reference tokens via Tailwind utilities** (`bg-card`, `text-muted-foreground`, `border`), never hardcode hex
- Fonts: `--font-geist-sans` (default), `--font-geist-mono` (code only)
- Motion: GSAP + ScrollTrigger (already wired). Do not add Framer Motion

## Color

Two layers: **tokens** for surfaces/text, **teal** for the single accent.

- Surfaces: `bg-background`, `bg-card`, `bg-card/60` or `/80` + `backdrop-blur` for glass panels
- Text: `text-foreground` (primary), `text-muted-foreground` (secondary, captions, body copy)
- Borders: `border` (uses `--border` token) — never `border-gray-200`
- **Accent: `teal-600` (default), `teal-700` (hover), `teal-50` (subtle bg), `teal-800` (link hover)** — this is the only chromatic color. Don't introduce blue, indigo, purple, etc.
- Hero/section backgrounds use soft radial gradients with low-opacity teal/amber — see `hero.tsx:63`. Reuse this pattern; don't invent new gradients

Avoid: `bg-gray-*`, `text-gray-*`, `text-slate-*`, raw hex codes, gradients with more than two stops, "shimmery" effects.

## Typography scale

Use these sizes verbatim. Don't pick arbitrary `text-2xl` or `text-5xl`.

| Role | Mobile | Desktop | Weight | Class |
|------|--------|---------|--------|-------|
| H1 (hero) | `text-4xl` | `md:text-6xl` | `font-semibold` | `leading-tight` |
| H2 (section) | `text-3xl` | `md:text-4xl` | `font-semibold` | — |
| H3 (card title) | base | — | `font-medium` | — |
| Body | base | — | normal | `leading-relaxed` for long copy |
| Small / caption | `text-sm` or `text-xs` | — | normal | `text-muted-foreground` |

Body copy: `text-muted-foreground`, constrain width with `max-w-prose`, use `text-balance` on short headings and `text-pretty` on paragraphs.

## Spacing — 4px base grid (Tailwind default)

Stick to the scale already in use. Don't reach for `gap-7`, `mt-9`, etc.

- Page horizontal padding: `px-4`
- Container: `mx-auto max-w-6xl`
- Section vertical rhythm: `py-20 md:py-28` (every top-level section uses this)
- Grid gaps: `gap-3` (inline buttons), `gap-5` (card grid), `gap-8 md:gap-10` (major columns)
- Inside cards: `p-4`; tight stacks use `mt-1`, `mt-4`, `mt-8`
- Buttons in a row: `flex items-center gap-3`

## Layout

- 12-col grid for hero-style splits: `grid md:grid-cols-12`, content `md:col-span-7`, media `md:col-span-5`
- Card grids: `grid gap-5 sm:grid-cols-2 lg:grid-cols-3`
- Heights tied to viewport use `dvh`, not `vh`: `min-h-[88dvh] md:min-h-[92dvh]`
- Center alignment for narrative sections: `text-center max-w-4xl mx-auto`

## Components

### Buttons (shadcn `Button`)

- Primary: `className="bg-teal-600 hover:bg-teal-700 text-white"`
- Outline: `variant="outline"` + `className="border-teal-600 text-teal-700 hover:bg-teal-50 bg-transparent"`
- Use `asChild` when wrapping `<a>` — never nest `<button>` inside `<a>`
- Always include `aria-label` on icon-only or short-text CTAs

### Cards (shadcn `Card`)

- `className="group overflow-hidden border bg-card/80"`
- Image first: `h-40 w-full object-cover`, hover zoom `transition-transform duration-500 group-hover:scale-[1.03]`
- Body padding `p-4`; title `font-medium`, description `text-sm text-muted-foreground mt-1`
- "Learn more" link: `text-teal-700 hover:text-teal-800` with a small arrow SVG (see `projects-grid.tsx:128`)

### Images / media frames

- Square portrait: `aspect-square w-full rounded-xl border bg-card/60 backdrop-blur overflow-hidden`
- Use `rounded-xl` for media frames, `rounded-lg` (the token default) for cards, `rounded-md` for inputs/buttons

## Motion (GSAP)

Already conventionalized — copy these exact values.

- **Reveal on mount/scroll:** `opacity: 0, y: 24, duration: 0.8, ease: "power3.out"`
- **Stagger:** `stagger: 0.1` for grouped elements, per-item `delay: i * 0.05` in maps
- **ScrollTrigger:** `start: "top 80%"` (sections), `"top 85%"` (cards), `toggleActions: "restart none none none"`
- **Hover lift:** `y: -6, scale: 1.02, duration: 0.3, ease: "power2.out"` with subtle teal shadow `0 10px 24px rgba(13,148,136,0.18)`
- **Ambient loops:** `yoyo: true, repeat: -1, ease: "sine.inOut"` — only for tiny indicators (scroll arrow, dots)
- Wrap every effect in `gsap.context(() => { ... }, ref)` and return `ctx.revert()` from the effect cleanup
- Register plugins once per file: `gsap.registerPlugin(ScrollTrigger)` at module scope

Don't: bounce/elastic eases, durations >1s, parallax on text, motion on every element.

## Accessibility & semantics

- One `<h1>` per page; sections use `<h2>`, cards use `<h3>`
- Decorative SVGs get `aria-hidden="true"`; meaningful icons get an `aria-label` on the parent link/button
- Buttons that navigate are `<a>` (wrapped via `asChild`), buttons that act are `<button>`
- Respect `prefers-reduced-motion` for any new long-running animation (GSAP: gate the timeline)

## What to avoid — the "generic AI" tells

- Random gradient backgrounds (purple → pink, blue → cyan)
- Glassmorphism everywhere instead of as one accent
- Gray-50/gray-900 instead of token-based surfaces
- Three different accent colors in one section
- Drop-shadow stacks (`shadow-2xl`, `shadow-purple-500/50`)
- "Pill" badges with emoji + gradient borders
- Hero copy in all-caps tracking-widest
- Decorative blurred blobs unrelated to content
- Skeleton loaders on a static portfolio
- `motion-safe:animate-bounce` on CTAs

## Quick self-check before finishing UI work

1. Every color is either a token utility or `teal-{50,600,700,800}` — no other hues, no hex
2. Headings use the scale table above; body is `text-muted-foreground` where appropriate
3. Section container is `mx-auto max-w-6xl px-4 py-20 md:py-28`
4. New motion matches the GSAP defaults (`power3.out`, `y:24`, `0.8s`)
5. Buttons use the two variants above; cards use the established shape
6. Nothing in the "avoid" list snuck in
