# Horizon Properties — Base44 Dev Environment

## Stack
- **Framework:** Next.js 14.2.15 (App Router) + TypeScript + Tailwind CSS 3
- **Runtime:** Node 22 (Alpine) via Docker Compose
- **No external secrets required** — purely frontend with static data

## Running the app
```bash
docker compose -f docker-compose.base44.yml up -d
```
App serves on port 3000. Dev server has live reload (file polling enabled for bind mounts).

## Project structure
- `src/app/` — Next.js App Router pages (home, properties listing, property detail)
- `src/components/` — Reusable UI components (Header, Footer, Hero, PropertyCard, etc.)
- `src/data/properties.ts` — All property data, services, team, and helper functions
- `src/lib/utils.ts` — Shared utilities (cn, formatPrice)
- `src/app/globals.css` — Tailwind + custom CSS (scroll reveal, no-scrollbar, img-zoom)

## Key design decisions
- **Fonts:** Playfair Display (serif headings) + Inter (sans body) via next/font
- **Colors:** Navy #0A1622, Champagne #C5A059, Ivory #F9F7F2, Off-white #F4F7F9
- **Images:** Unsplash direct URLs (verified working IDs in data file comments)
- **Animations:** CSS + IntersectionObserver (no Framer Motion) for performance
- **Carousel:** Custom scroll-snap + mouse drag + touch swipe (no external library)

## Healthcheck
Uses `wget -q -O /dev/null http://127.0.0.1:3000/` (must use 127.0.0.1, not localhost — IPv6 resolution issue in Alpine).

## Verification
- `curl http://localhost:3000/` → 200 (home)
- `curl http://localhost:3000/properties` → 200 (listing with filters)
- `curl http://localhost:3000/properties/<slug>` → 200 (detail with gallery)
- `curl http://localhost:3000/nonexistent` → 404
