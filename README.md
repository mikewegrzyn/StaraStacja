# Stara Stacja — Restaurant Website

Website for **Stara Stacja**, a restaurant at the summit of Mount Szyndzielnia (1000m) in Bielsko-Biala, Poland.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build/) — static site generator |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Content | JSON data files (`src/data/`) |
| Build output | Static HTML — deployable anywhere |

## Project Structure

```
src/
├── components/     # Nav, Footer
├── data/           # menu.json, info.json (restaurant data)
├── layouts/        # Base HTML layout
├── pages/          # Routes: index, menu, galeria, rezerwacje, kontakt
└── styles/         # global.css (Tailwind + theme)
public/
└── images/         # Photos, logo, menu PNGs
input/              # Source assets (originals)
```

## Run Locally

```sh
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Editing Content

- **Menu items & prices** — edit `src/data/menu.json`
- **Contact info, hours, capacity** — edit `src/data/info.json`
- **Photos** — replace files in `public/images/`

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, about, features, CTA |
| Menu | `/menu` | Full menu with PL/EN toggle, food/drinks tabs |
| Galeria | `/galeria` | Photo gallery with category filters |
| Rezerwacje | `/rezerwacje` | Reservation form (opens email client), capacity info |
| Kontakt | `/kontakt` | Address, phone, email, hours, Google Map |
