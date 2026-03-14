# Stara Stacja — Restaurant Website

## What is this

Website for **Stara Stacja**, a restaurant at the summit of Mount Szyndzielnia (1000m above sea level) in Bielsko-Biala, Poland. The building is a former cable car station converted into a dining space with a vintage gondola as interior decor.

## Key facts

- **Address:** Aleja Armii Krajowej 466, 43-300 Bielsko-Biala
- **Phone:** +48 515 552 130
- **Email:** starastacjabielsko@gmail.com
- **Hours:** Mon 10:00-17:30, Tue-Sun 9:00-17:30
- **Capacity:** 240 seats (120 indoor + 120 terrace)
- **Social:** Instagram @stara.stacja
- **Features:** Weddings, corporate events, conferences, cable car reservations

## Tech stack

- **Astro 6** — static site generator (static HTML output)
- **Tailwind CSS v4** — styling with custom theme (`@theme` directive)
- **Express 5** — production server for Hostinger Node.js hosting
- **Fonts:** Playfair Display (headings) + Inter (body) via Google Fonts
- **No database** — static HTML, reservation form opens mailto

## Content editing

- **Menu items & prices** — edit `src/data/menu.json` (authoritative reference: `docs/menu.md`)
- **Contact info, hours, capacity** — edit `src/data/info.json`
- **Gallery photos** — optimized images in `public/images/gallery/` (max 1600px, JPEG 80%)
- **Hero video** — `public/images/hero-bg.mp4` (1080p, 50% speed, 726KB, desktop only)
- **Other images** — `public/images/` (hero.jpg, interior.jpg, cablecar.jpg, logo.jpeg)

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/index.astro` | Hero with video bg (desktop) / static image (mobile), about section, features, menu teaser, reservation CTA with parallax |
| `/menu` | `src/pages/menu.astro` | Full menu with **PL/EN/CZ** language toggle, food/drinks tabs, downloadable menu images |
| `/galeria` | `src/pages/galeria.astro` | Photo gallery (25 photos) with category filters: widoki, wnętrze, kuchnia, eventy. Featured images span 2x2. Stats bar. |
| `/rezerwacje` | `src/pages/rezerwacje.astro` | Reservation form (mailto), capacity info, events CTA |
| `/kontakt` | `src/pages/kontakt.astro` | Address, phone, email, hours, Google Map, directions (cable car + hiking) |

## Features

- **Trilingual menu** — Polish, English, Czech. Toggle buttons in sticky menu bar. Translations in `menu.json` (`nameCs`, `descriptionCs`, `noteCs` fields).
- **Gallery with filters** — 4 categories (widoki/wnętrze/kuchnia/eventy), featured photos span 2x2, fade animation on filter, lazy loading.
- **Video hero** — Desktop-only background video with static image fallback. Fades in when loaded via `canplaythrough` event.
- **Responsive design** — All touch targets 44px minimum. Mobile hamburger menu. `bg-fixed` parallax desktop only (broken on iOS Safari).
- **Reservation form** — Composes a `mailto:` link with form data (name, date, guests, message). No server needed.
- **Sticky navigation** — Transparent on scroll, solid on scroll down. Mobile menu closes on link click.

## Architecture decisions

- Menu data lives in JSON so non-developers can update prices without touching templates
- Language toggle uses CSS class toggling (`text-pl` / `text-en` / `text-cs` spans) — all content rendered at build time, JS just shows/hides
- Hero uses static image as instant fallback, video lazy-loads and fades in on desktop only
- Mobile gets no video (saves bandwidth)
- `bg-fixed` parallax only on desktop (broken on iOS Safari)
- Nav logo is hidden (code preserved) — to re-enable, edit `src/components/Nav.astro`
- Gallery images optimized with `sips` (macOS) — galeria photos max 1600px, food photos max 1200px, JPEG quality 80%

## Commands

```sh
npm install          # install dependencies
npm run dev          # dev server at localhost:4321
npm run build        # production build to dist/ (+ postbuild copy on Hostinger)
npm run preview      # preview production build
npm start            # start Express production server (Hostinger)
```

**Important:** Always restart the dev server (`npm run dev`) after making changes so the user can preview them at localhost:4321.

## Deploy (Hostinger)

- **Hosting:** Hostinger Node.js Git auto-deploy from `main` branch
- **Framework:** Express | **Entry point:** `server.mjs` | **Node.js:** 22.x
- **How it works:** Hostinger runs `npm install` + `npm run build`, then starts `server.mjs` which serves static files from `dist/`
- **`postbuild.mjs`** — after Astro build, attempts to copy `dist/` to Hostinger's `public_html/` (detected by directory structure)
- **`server.mjs`** — Express 5 static server, binds to `0.0.0.0:PORT`, serves `dist/` with clean URL support and 404 fallback

## Project structure

```
src/
  components/   Nav.astro, Footer.astro
  data/         menu.json, info.json
  layouts/      Layout.astro (base HTML, meta, fonts)
  pages/        index, menu, galeria, rezerwacje, kontakt
  styles/       global.css (Tailwind theme)
public/
  images/       hero, interior, cablecar, logo, menu PNGs
  images/gallery/  25 optimized gallery photos
docs/           menu.md (human-readable menu reference)
server.mjs      Express production server
postbuild.mjs   Post-build copy script for Hostinger
```
