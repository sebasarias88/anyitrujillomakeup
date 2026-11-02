# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Proyecto: Anyi Trujillo Beauty Studio
Demo web para Anyi Trujillo, maquilladora profesional en Armenia, Quindío (@anyitrujillomakeup, ~15 mil seguidores). Especialista en novias y maquillaje con aerógrafo, 9 años de experiencia, certificada por Instituto Cristina Cuéllar (México) y Tempto (New York). Ofrece cursos presenciales y personalizados y tiene equipo para grupos. No mostrar la calificación de Google en la web (decisión del cliente).
Dirección: Calle 23 #37-25, edificio Tesalónica local 5, Armenia. WhatsApp: 320 5299186.

## Dirección visual
- Estilo CONVENCIONAL premium: blanco y crema claro, secciones bien separadas, tarjetas ordenadas, fotos redondeadas con sombra suave, botones negros tipo píldora. Nada oscuro.
- Acento de marca: nude profundo #9A6340 en etiquetas y palabras en itálica; negro tinta #1E1A18 para texto y botones.
- Sin negrillas pesadas: los títulos pequeños van en Bodoni, no en texto grueso.
- Referencia que le gusta: https://valeriariosmakeup.com, SOLO como guía de contenido y estructura. Nunca copiar su diseño.

## Alcance del demo
- Solo frontend, multipágina (9 rutas, ver "Architecture"). El agendamiento redirige a WhatsApp con mensaje prellenado.
- Secciones aprobadas: cotizador de novia, antes/después, quiz de look, sección aerógrafo, cursos, reseñas reales de clientas, detalles premium.
- Fase 2 (si ella acepta): panel admin donde ella actualiza horarios y las clientas agendan desde la web.
- Rama `feat/admin-demo`: demo del panel en `/admin` (solo front, datos de ejemplo en `src/components/admin/store.tsx`, guardados en localStorage). Rutas: resumen, agenda, citas, ventas, clientas, servicios, horarios, portafolio, cursos, equipo. `noindex` y bloqueado en robots.

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
  | `/` | Hero, trust bar, about teaser, service cards, booking, portfolio carousel, testimonials carousel, closing banner |
  | `/servicios` | Service cards, companions, airbrush, home visits with zones, look quiz |
  | `/novias` | Included, package cards + quote calculator, process, photos, bridal FAQ |
  | `/quinceaneras`, `/social`, `/cursos` | Shared `ServicePage` (included, price cards, photos); `/cursos` adds the course builder |
  | `/portafolio` | Gallery and before/after |
  | `/sobre-mi` | Story, certifications, how she works, the studio |
  | `/contacto` | Booking, studio, general FAQ |

  `/sobre-anyi` redirects (301, `next.config.ts`) to `/sobre-mi`. Service data (titles, "desde" prices, options) lives in `services` in `site.ts`; prices marked `samplePrice` are examples for the demo.

  `offline/` sits outside the group (no shell). The route list lives in `pages` in `site.ts`; the header, sitemap and breadcrumbs read from it, so add a page there first.
- **Components by page.** `src/components/<page>/` (`home`, `bridal`, `services`, `portfolio`, `courses`, `contact`), shared pieces in `layout/` (header, footer, `page-hero`) and `ui/`. Every inner page opens with `<PageHero>`, which holds its only `h1`.
- **Content lives in data modules, not in components.**
  - `src/lib/site.ts`: business data, `SITE_URL`, `pages`, bridal packages and prices (COP, shown with `formatCOP`), booking services, reviews, FAQ (tagged per page, read with `faqsFor()`).
  - `src/lib/images.ts`: static imports of `src/assets/images/*.webp`, the gallery list and its categories, and `beforeAfter` (empty until Anyi sends real photos; the slider then shows "Próximamente").
  Edit prices, text or photos there first. Unconfirmed content is marked `sample: true` and shown as an example.
- **Server components by default.** Only interactive pieces use `"use client"`.
- **Static rendering with `cacheComponents: true`** (`next.config.ts`). Anything that depends on the browser, like the current date in `booking.tsx`, gets resolved in a `useEffect` after mount and shows a skeleton until then. That keeps every page prerenderable. Follow this pattern; don't read `new Date()` or `window` during render.
- **SEO.**
  - Every page exports `metadata` from `pageMetadata()` (`src/lib/seo.ts`): title, description, canonical, Open Graph with `locale: es_CO` and the shared image. Always use the helper; a bare `openGraph` drops the image and site name.
  - The root layout declares the `BeautySalon` JSON-LD (address, phone, hours). No rating markup: the rating is not shown on the site. Pages add `BreadcrumbList`, `FAQPage`, `Service` or `Course` through `<JsonLd>`.
  - `robots.ts` and `sitemap.ts` read `SITE_URL`.
- **`SITE_URL`.** It comes from `NEXT_PUBLIC_SITE_URL`. Until the real domain exists it falls back to the Vercel URL of the deployment (`VERCEL_PROJECT_PRODUCTION_URL` in production, `VERCEL_BRANCH_URL` / `VERCEL_URL` in previews), then to localhost. Read it only on the server. Set `NEXT_PUBLIC_SITE_URL` in Vercel once the domain is live.
- **Page transitions.** React's `<ViewTransition>` (React 19.3, no config needed) wraps the page in the `(site)` layout; the "mist" animation lives in `globals.css` (`.page-mist`, `.morph`). Read `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` before changing it.
- **Offline / PWA.** `public/sw.js` is a hand-written service worker: network-first for pages (all routes are precached) with `/offline` as fallback, cache-first for `/_next/static` and `/_next/image`. It only registers in production. **Bump `VERSION` in `sw.js` whenever you change it.** `next.config.ts` serves it with no-cache headers.
- **Fonts are self-hosted** through `next/font/local` (Bodoni Moda for display, Jost variable for body) from `src/assets/fonts`. Don't add Google Fonts requests.

## Styling implementation

The "Dirección visual" section above is the target: conventional, structured and premium (approved after several rounds; avoid experimental layouts).

- Design tokens live in the `@theme` block of `src/app/globals.css` (`paper`, `white`, `marble` = light nude field, `line`, `ink`, `ink-soft`, `nude`, `nude-deep`, `nude-field`, `blush`, `gold`). Change colors there, not as hard-coded values in components. No black backgrounds; gold/yellow only as tiny accents (`highlight` utility).
- Fonts: `font-display` (Bodoni Moda) and `font-sans` (Jost).
- Custom utilities: `container-page`, `bg-marble` (flat light nude field), `eyebrow` (small uppercase label), `highlight` (yellow underline for one or two words), `pressable`, `no-scrollbar`.
- House rules: rounded photos (`rounded-[1.25rem]`–`[1.75rem]`), soft shadows (`shadow-soft`, `shadow-lift`), pill buttons (`ButtonLink` primary = black, `ink` = outline), section titles via `SectionHeading` with one phrase in italic `text-nude-deep`. Shared blocks live in `src/components/shared/`.
- Motion: `--ease-out`, `--ease-in-out`, `--ease-drawer`. `<Reveal>` (variants `text` and `photo`) handles scroll-in; its hidden state only applies under `html.js`, so content stays visible without JS. UI animations stay under 300 ms. `motion/react` animations must check `useReducedMotion`, and the CSS honors `prefers-reduced-motion`.
- UI kit in `src/components/ui/`: `WhatsAppButton` (loading state while WhatsApp opens), `Select` (custom combobox; never a native `<select>`), `Skeleton`, `Faq`, `JsonLd`.
