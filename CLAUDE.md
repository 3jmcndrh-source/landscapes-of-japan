# Landscapes of Japan - Claude Code Guide

## Project Overview

Cinematic photography portfolio showcasing landscape photos from Japan.
Built with **Next.js 16** + **Cloudinary** + **D3.js**, deployed on **Vercel**.

- **Production URL:** https://landscapes-of-japan.vercel.app
- **Stack:** Next.js 16.1.6, React 19.2.3, D3 7.9.0, Cloudinary, Vercel Analytics
- **No tests, no CI** — manual testing only

## File Structure

```
app/
  page.js          # Single-page app (~1018 lines): PREFECTURES data, map, gallery, lightbox, translations
  layout.js        # Root layout, fonts (Cormorant Garamond, Noto Sans JP, Yuji Boku), metadata, analytics
  globals.css      # All styles (dark theme, glassmorphism, responsive)
  favicon.ico
public/            # SVG assets (decorative only)
upload.mjs         # Cloudinary photo upload tool (reads .env)
sort-photos.mjs    # Sort photos by EXIF date (newest-first per prefecture)
add-years.mjs      # Add year field to photo entries from EXIF data
next.config.mjs    # Image domains: Cloudinary, Unsplash
vercel.json        # Security headers (CSP, X-Frame-Options, etc.)
```

## Architecture

Everything lives in `app/page.js` as a single client component (`"use client"`). No routing — it's a one-page app.

### Key data structures

**PREFECTURES** — all photo data, hardcoded at the top of `page.js`:
```js
{ pref: "京都府", lat: 35.01, lng: 135.77, photos: [
  { id: "DSC07601_cocitq", loc: "清水寺周辺", year: 2025 },
  ...
]}
```

**TR** — translation object with all 20 languages, also in `page.js`:
```js
const TR = {
  ja: { name: "日本語", nav: {...}, hero: {...}, contact: {...}, ... },
  en: { name: "English", ... },
  // ... 18 more
};
```

### Main components inside page.js

| Component | Lines (approx) | Purpose |
|---|---|---|
| `JapanMap` | ~396–658 | D3.js SVG map with prefecture highlighting, tooltips, Okinawa inset |
| `Fireworks` | ~660–804 | Canvas-based firework animation on hero section |
| `Page` (default export) | ~805–1018 | Main page: language switcher, galleries, lightbox, contact form |

### Helper functions

- `getUrl(p, w)` / `cldUrl(id, w)` — Cloudinary image URL builders
- `getPrefName(pref, lang)` / `getLocName(loc, lang)` — localize names
- `MAP_PINS` — flattened first-photo-per-prefecture for map markers

## Cloudinary

- **Cloud Name:** `dr53c12fo`
- **URL pattern:** `https://res.cloudinary.com/dr53c12fo/image/upload/w_{width},f_auto,q_auto/{public_id}.jpg`
- **Responsive widths:** thumbnails 600/1200px, lightbox 1200/2400px
- **API credentials** in `.env` (gitignored) — only needed by upload/sort scripts

## Photo Management

### Adding photos
```bash
node upload.mjs photo.jpg --pref 京都府 --loc 清水寺
node upload.mjs *.jpg --pref 兵庫県 --loc 姫路城 --dry-run
```
This uploads to Cloudinary and auto-updates PREFECTURES in `page.js`.

### Sorting photos
```bash
node sort-photos.mjs    # Sorts all photos by EXIF date (newest first, left to right)
```

### Adding year metadata
```bash
node add-years.mjs      # Adds year: YYYY to each photo entry from EXIF
```

## Current Photos (88 total)

| Prefecture | Count | Locations |
|---|---|---|
| 京都府 (Kyoto) | 18 | 清水寺, 金閣寺, 平等院鳳凰堂, 東福寺 |
| 奈良県 (Nara) | 3 | 法隆寺, 夢殿 |
| 兵庫県 (Hyogo) | 5 | 姫路城 |
| 愛知県 (Aichi) | 24 | 東山動物園 |
| 三重県 (Mie) | 38 | 鳥羽水族館, 伊勢神宮, おはらい町, おかげ横丁, 朝熊山, 横山, 梅林公園, 夫婦岩 |

## 20 Languages

ja, en, zh, zh-tw, ko, es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv

Translations are manual (no i18n library). All UI strings, prefecture names, and location names are translated in the `TR` object and helper functions within `page.js`.

## Styling

- **Theme:** Dark (`#0a0a0a` bg, `#e8e4df` text, gold accent `rgba(220,190,100,...)`)
- **Approach:** Single `globals.css` file, class-based, no CSS modules or Tailwind
- **Responsive:** Single breakpoint at `768px`, `clamp()` for fluid typography
- **Effects:** Glassmorphism (backdrop-filter), fade-up/pulse/highlight animations

## Deployment

```bash
git push                    # Vercel auto-deploys from master
npx vercel --prod --yes     # Manual deploy if needed
```

## Development

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Start production server
```

## Conventions & Important Notes

- **Photo order:** newest first (left) per prefecture, sorted by EXIF capture date
- **Single-file architecture:** All app logic is in `page.js` — no separate component files
- **No external i18n:** Translations are inline in the TR object
- **No test suite:** No Jest/Vitest/Playwright configured
- **Environment:** `.env` contains `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` (gitignored)
- **Security headers:** Configured in `vercel.json` (CSP, X-Frame-Options, XSS protection)
- **Fonts:** Cormorant Garamond (headings), Noto Sans JP (Japanese body), Noto Sans (Latin body), Yuji Boku (decorative)
- **Contact form:** Submits to Formspree (no backend)
- **Map data:** Fetched from GitHub GeoJSON, with embedded fallback
