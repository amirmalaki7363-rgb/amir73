# AGENTS.md — PS PRO

## Overview
A premium Persian (Farsi) RTL gaming e-commerce storefront built with Vite + React 18 + TypeScript. All product images are inline SVG illustrations (no external image dependencies).

## Stack
- **Framework:** Vite 5.4 + React 18 + TypeScript
- **Routing:** react-router-dom v6
- **Font:** Vazirmatn (loaded via CDN in index.html)
- **No backend** — purely frontend with in-memory cart state via React Context

## Running in Base44 Sandbox
```bash
docker compose -f docker-compose.base44.yml up -d
```
- App served on **host port 3000** (mapped to container port 5173)
- Vite dev server with HMR (live reload)
- Node 22-slim image, deps installed on startup via `npm install`

## Key Decisions
- **Vite host allowlist:** Vite 5.4 blocks external host headers by default. `vite.config.ts` conditionally allows `*.${BASE44_SANDBOX_HOST_DOMAIN}` when `BASE44_PREVIEW_MODE === '1'`, otherwise `true`. This is required for the preview proxy to reach the dev server.
- **Product images:** All product visuals are hand-crafted SVG components in `src/components/ProductImage.tsx` — no external image files, ensuring correct product-image mapping and fast loads.
- **Cart:** In-memory React Context (`src/context/CartContext.tsx`) — no persistence.
- **RTL:** Entire app is `dir="rtl"` + `lang="fa"` with Persian numerals throughout.

## Project Structure
```
src/
  components/    Header, Hero, Footer, ProductCard, ProductImage, Sections
  context/       CartContext
  data/          products.ts (all product data + helpers)
  pages/         HomePage, CategoryPage, ProductDetailPage, InfoPages
  styles/        global.css, Header.css, Hero.css, Footer.css, Sections.css, ProductCard.css
  App.tsx        Router + layout
  main.tsx       Entry
```

## Verification
- `curl http://localhost:3000/` → 200, serves index.html with Vite client
- `curl http://localhost:3000/src/main.tsx` → 200, serves compiled source (dev mode)
- Container health: `docker inspect --format='{{.State.Health.Status}}' app-web-1` → `healthy`
