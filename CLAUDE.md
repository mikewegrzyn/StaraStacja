# Stara Stacja — Restaurant Website

## What is this

Website for **Stara Stacja**, a restaurant at the summit of Mount Szyndzielnia (1000m above sea level) in Bielsko-Biala, Poland. The building is a former cable car station converted into a dining space.

## Key facts

- **Address:** Aleja Armii Krajowej 466, 43-300 Bielsko-Biala
- **Phone:** +48 515 552 130
- **Email:** starastacjabielsko@gmail.com
- **Hours:** Mon 10:00-17:30, Tue-Sun 9:00-17:30
- **Capacity:** 240 seats (120 indoor + 120 terrace)
- **Social:** Instagram @stara.stacja
- **Features:** Weddings, corporate events, conferences, cable car reservations

## Tech stack

- **Astro** — static site generator
- **Tailwind CSS v4** — styling
- **Fonts:** Playfair Display (headings) + Inter (body)
- **No backend** — static HTML output, reservation form opens mailto

## Content editing

- **Menu items & prices** — edit `src/data/menu.json` (authoritative reference: `docs/menu.md`)
- **Contact info, hours, capacity** — edit `src/data/info.json`
- **Photos** — replace files in `public/images/`
- **Hero video** — `public/images/hero-bg.mp4` (1080p, 50% speed, 726KB, desktop only)

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/index.astro` | Hero with video bg, about, features, menu teaser, reservation CTA |
| `/menu` | `src/pages/menu.astro` | Full menu with PL/EN toggle, food/drinks tabs, downloadable PDFs |
| `/galeria` | `src/pages/galeria.astro` | Photo gallery with category filters |
| `/rezerwacje` | `src/pages/rezerwacje.astro` | Reservation form (mailto), capacity info, events CTA |
| `/kontakt` | `src/pages/kontakt.astro` | Address, phone, email, hours, Google Map, directions |

## Architecture decisions

- Menu data lives in JSON so non-developers can update prices without touching templates
- Hero uses static image as instant fallback, video lazy-loads and fades in on desktop only
- Mobile gets no video (saves bandwidth), all touch targets are 44px minimum
- `bg-fixed` parallax only on desktop (broken on iOS Safari)
- Nav logo is hidden (code preserved as comment) — to re-enable, uncomment in `src/components/Nav.astro`
- Reservation form composes a mailto link with form data — no server needed

## Commands

```sh
npm install          # install dependencies
npm run dev          # dev server at localhost:4321
npm run build        # production build to dist/
npm run preview      # preview production build
```

## Deploy

Static output in `dist/`. Upload to any hosting (Hostinger File Manager → public_html, Netlify, Vercel, etc).
