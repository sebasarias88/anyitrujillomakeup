# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Proyecto: Anyi Trujillo Beauty Studio
Demo web para Anyi Trujillo, maquilladora profesional en Armenia, Quindío (@anyitrujillomakeup, ~15 mil seguidores). Especialista en novias y maquillaje con aerógrafo, 9 años de experiencia, certificada por Instituto Cristina Cuéllar (México) y Tempto (New York). Ofrece cursos presenciales y personalizados y tiene equipo para grupos. Google: 5.0 con 31 reseñas.
Dirección: Calle 23 #37-25, edificio Tesalónica local 5, Armenia. WhatsApp: 320 5299186.

## Dirección visual
- TEMA CLARO, luminoso, elegante y femenino. Nada oscuro.
- Marca: logo en letra script "Beauty Studio". Colores: dorado #FFD03A, negro #040606 (solo acentos y texto), blanco, nude/rose gold #D09A73, texturas de mármol.
- Diseño propio, innovador y de alto nivel, nada genérico. Debe impresionar porque ella puede recomendar más clientes.
- Referencia que le gusta: https://valeriariosmakeup.com, SOLO como guía de contenido y estructura. Nunca copiar su diseño.

## Alcance del demo
- Solo frontend. El agendamiento redirige a WhatsApp con mensaje prellenado.
- Secciones aprobadas: cotizador de novia, antes/después, quiz de look, sección aerógrafo, cursos, reseñas de Google, detalles premium.
- Fase 2 (si ella acepta): panel admin donde ella actualiza horarios y las clientas agendan desde la web.

## Precios
- Novia Especial en estudio: $800.000
- Novia Especial con bata para fotos: $950.000
- Novia Rubí: $1.300.000 (acompañamiento máx. 3 h, hora adicional $140.000)
- Acompañantes: maquillaje $140.000, ondas corto $80.000, ondas largo $90.000, peinados $100.000
- Domicilio: costo según el lugar.
- Quinceañeras, social y cursos: aún sin precios; usar textos de ejemplo.

Prices are the source of truth here; `src/lib/site.ts` must match them.

## Project

Frontend-only landing page for Anyi Trujillo Beauty Studio (makeup artist in Armenia, Quindío, Colombia). There is no backend, database or API: every booking, quote and quiz result ends as a pre-filled WhatsApp message built with `whatsappUrl()` from `src/lib/site.ts`. All user-facing copy is Spanish (es-CO); code stays in English.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · `motion` · yarn 1.

## Commands

```bash
yarn dev      # http://localhost:3000
yarn build    # production build, also the type check
yarn start    # serve the build (needed to test the service worker)
yarn lint     # eslint 9 flat config (next core-web-vitals + typescript)
```

There is no test suite.

## Architecture

- **Single page.** `src/app/page.tsx` stacks the section components from `src/components/sections/` in order. The header nav (`navLinks` in `site.ts`) links to section `id`s (`#servicios`, `#novias`, `#aerografo`, `#portafolio`, `#cursos`, `#agenda`). Renaming a section id breaks the nav.
- **Content lives in data modules, not in components.**
  - `src/lib/site.ts`: business data, `SITE_URL`, bridal packages and prices (COP, shown with `formatCOP`), booking services, reviews, FAQ.
  - `src/lib/images.ts`: static imports of `src/assets/images/*.webp`, plus the gallery list and its categories.
  Edit prices, text or photos there first.
- **Server components by default.** Only interactive pieces use `"use client"`: hero, gallery, booking, bridal-quote, look-quiz, site-header and the small ui helpers (reveal, offline-notice, floating-whatsapp, service-worker-register).
- **Static rendering with `cacheComponents: true`** (`next.config.ts`). Anything that depends on the browser, like the current date in `booking.tsx`, gets resolved in a `useEffect` after mount and shows a skeleton until then. That keeps the page prerenderable. Follow this pattern; don't read `new Date()` or `window` during render.
- **SEO** is centralized in `src/app/layout.tsx` (metadata, OG, and a `BeautySalon` JSON-LD built from `business`), plus `robots.ts`, `sitemap.ts`, `manifest.ts` and `opengraph-image.jpg`. `NEXT_PUBLIC_SITE_URL` must be set to the real domain before going live.
- **Offline / PWA.** `public/sw.js` is a hand-written service worker: network-first for pages with `/offline` as fallback, cache-first for `/_next/static` and `/_next/image`. It only registers in production. **Bump `VERSION` in `sw.js` whenever you change it.** `next.config.ts` serves it with no-cache headers.
- **Fonts are self-hosted** through `next/font/local` (Cormorant Garamond for display, Manrope variable for body) from `src/assets/fonts`. Don't add Google Fonts requests.

## Styling implementation

The "Dirección visual" section above is the target. **The current code is still the old dark theme and must be replaced, not extended.** That old theme uses `ink` backgrounds, `colorScheme: "dark"` and `themeColor: "#0d0a09"` in `layout.tsx`, and a film-grain overlay on `body::after`.

- Design tokens live in the `@theme` block of `src/app/globals.css`. Change colors there, not as hard-coded values in components.
- Fonts: `font-display` (Cormorant Garamond) and `font-sans` (Manrope).
- Custom utilities: `container-page` (page width and gutters), `text-gradient-gold`, `no-scrollbar`.
- Motion: `--ease-soft`. The `<Reveal>` component plus the `.reveal` CSS handle scroll-in. The `motion/react` animations (hero parallax, quote and quiz steps) must check `useReducedMotion`, and the CSS honors `prefers-reduced-motion`.
- Of the approved sections, **antes/después** doesn't exist yet.
