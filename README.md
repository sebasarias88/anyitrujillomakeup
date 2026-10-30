# Anyi Trujillo Beauty Studio — demo web

Landing page (frontend-only demo) for Anyi Trujillo, professional makeup artist in Armenia, Quindío.
All bookings and quotes are sent to WhatsApp.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · motion · self-hosted fonts.

## Commands
```bash
yarn install
yarn dev        # http://localhost:3000
yarn build && yarn start
```

## Content
- Business data, prices, reviews and FAQ: `src/lib/site.ts`
- Photos and gallery: `src/assets/images` + `src/lib/images.ts`
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before going live (canonical, sitemap, OG).
