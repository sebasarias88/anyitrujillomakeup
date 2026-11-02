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
- Solo frontend, multipágina (7 rutas, ver "Architecture"). El agendamiento redirige a WhatsApp con mensaje prellenado.
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

Frontend-only multi-page site for Anyi Trujillo Beauty Studio (makeup artist in Armenia, Quindío, Colombia). There is no backend, database or API: every booking, quote and quiz result ends as a pre-filled WhatsApp message built with `whatsappUrl()` from `src/lib/site.ts`. All user-facing copy is Spanish (es-CO); code stays in English.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · `motion` · yarn 1.

Branches: `feat/`, `fix/`, `perf/`, `chore/` from `develop`. Local commits only; the user pushes.

## Commands

```bash
yarn dev            # http://localhost:3000
yarn build          # production build
yarn start          # serve the build (needed to test the service worker)
yarn lint           # eslint 9 flat config (next core-web-vitals + typescript)
yarn tsc --noEmit   # type check; run with lint before every commit
```

There is no test suite. Lighthouse runs from the browser console panel (Cmd+Option+I → Lighthouse), on `yarn build && yarn start`.

## Architecture

- **Routes.** `src/app/(site)/` is a route group whose `layout.tsx` wraps every public page in the shared shell (header, footer, WhatsApp access). Pages:

  | Route | Content |
  |---|---|
  | `/` | Summary of everything plus the "doors" to each page, look quiz, reviews |
  | `/novias` | Packages, quote calculator, process, bridal FAQ |
  | `/servicios` | Social, XV, companions, airbrush, home visits with zones |
  | `/portafolio` | Gallery and before/after |
  | `/cursos` | Courses |
  | `/sobre-anyi` | About Anyi and the studio |
  | `/contacto` | Booking, studio, general FAQ |

  `offline/` sits outside the group (no shell). The route list lives in `pages` in `site.ts`; the header, sitemap and breadcrumbs read from it, so add a page there first.
- **Components by page.** `src/components/<page>/` (`home`, `bridal`, `services`, `portfolio`, `courses`, `about`, `contact`), shared pieces in `layout/` (header, footer, `page-hero`) and `ui/`. Every inner page opens with `<PageHero>`, which holds its only `h1`.
- **Content lives in data modules, not in components.**
  - `src/lib/site.ts`: business data, `SITE_URL`, `pages`, bridal packages and prices (COP, shown with `formatCOP`), booking services, reviews, FAQ (tagged per page, read with `faqsFor()`).
  - `src/lib/images.ts`: static imports of `src/assets/images/*.webp`, the gallery list and its categories, and `beforeAfter` (empty until Anyi sends real photos; the slider then shows "Próximamente").
  Edit prices, text or photos there first. Unconfirmed content is marked `sample: true` and shown as an example.
- **Server components by default.** Only interactive pieces use `"use client"`.
- **Static rendering with `cacheComponents: true`** (`next.config.ts`). Anything that depends on the browser, like the current date in `booking.tsx`, gets resolved in a `useEffect` after mount and shows a skeleton until then. That keeps every page prerenderable. Follow this pattern; don't read `new Date()` or `window` during render.
- **SEO.**
  - Every page exports `metadata` from `pageMetadata()` (`src/lib/seo.ts`): title, description, canonical, Open Graph with `locale: es_CO` and the shared image. Always use the helper; a bare `openGraph` drops the image and site name.
  - The root layout declares the `BeautySalon` JSON-LD (address, phone, hours, Google rating). Pages add `BreadcrumbList`, `FAQPage`, `Service` or `Course` through `<JsonLd>`.
  - `robots.ts` and `sitemap.ts` read `SITE_URL`.
- **`SITE_URL`.** It comes from `NEXT_PUBLIC_SITE_URL`. Until the real domain exists it falls back to the Vercel URL of the deployment (`VERCEL_PROJECT_PRODUCTION_URL` in production, `VERCEL_BRANCH_URL` / `VERCEL_URL` in previews), then to localhost. Read it only on the server. Set `NEXT_PUBLIC_SITE_URL` in Vercel once the domain is live.
- **Page transitions.** React's `<ViewTransition>` (React 19.3, no config needed) wraps the page in the `(site)` layout; the "mist" animation lives in `globals.css` (`.page-mist`, `.morph`). Read `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` before changing it.
- **Offline / PWA.** `public/sw.js` is a hand-written service worker: network-first for pages (all routes are precached) with `/offline` as fallback, cache-first for `/_next/static` and `/_next/image`. It only registers in production. **Bump `VERSION` in `sw.js` whenever you change it.** `next.config.ts` serves it with no-cache headers.
- **Fonts are self-hosted** through `next/font/local` (Cormorant Garamond for display, Manrope variable for body) from `src/assets/fonts`. Don't add Google Fonts requests.

## Styling implementation

The "Dirección visual" section above is the target: light theme, direction "the name as a monument", with the airbrush mist as the motion language. `DESIGN.md` will document the finished system.

- Design tokens live in the `@theme` block of `src/app/globals.css` (`paper`, `marble`, `ink`, `ink-soft`, `nude`, `nude-field`, `blush`, `gold`). Change colors there, not as hard-coded values in components. Gold is only for the main action and the price block, always with dark text. No black backgrounds.
- Fonts: `font-display` (Cormorant Garamond) and `font-sans` (Manrope).
- Custom utilities: `container-page` (page width and gutters), `text-monument` (the page name across the viewport), `bg-marble` (code-drawn marble), `pressable` (scale on press), `no-scrollbar`.
- House rules: no gradients, eyebrows, pill badges, 1px outlined cards, shadows at rest, glass or 01/02/03 numbering. Square buttons and photos.
- Motion: `--ease-out`, `--ease-in-out`, `--ease-drawer`. `<Reveal>` (variants `text` and `photo`) handles scroll-in; its hidden state only applies under `html.js`, so content stays visible without JS. UI animations stay under 300 ms. `motion/react` animations must check `useReducedMotion`, and the CSS honors `prefers-reduced-motion`.
- UI kit in `src/components/ui/`: `WhatsAppButton` (loading state while WhatsApp opens), `Select` (custom combobox; never a native `<select>`), `Skeleton`, `Faq`, `JsonLd`.
