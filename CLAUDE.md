# Landscapes of Japan — Claude Code Guide

## Project Overview

Japanese landscape photography portfolio. Built with **Next.js 16** + **Cloudinary** + **D3.js**, deployed on **Vercel**. 20-language localization, gold-accent dark-cinematic design.

- **Production URL:** https://landscapes-of-japan.vercel.app
- **GitHub:** https://github.com/3jmcndrh-source/landscapes-of-japan (branch: master — Vercel auto-deploys on push)
- **Stack:** Next.js 16.1.6, React 19.2.3, D3 7.9.0, Cloudinary, Vercel Analytics
- **No tests, no CI** — manual testing + preview server only

## Working Directory

`C:\Users\3jmcn\Downloads\files\landscapes-of-japan` on Windows.
Preview launch config: `C:\Users\3jmcn\Downloads\files\.claude\launch.json` (uses cwd="landscapes-of-japan" + node on `next/dist/bin/next dev`).

## File Structure

```
app/
  page.js          # Single-page app (~1470 lines): PREFECTURES, TR, PREF_I18N, LOC_I18N, JapanMap, Page
  layout.js        # Fonts (Cormorant, Noto Sans JP, Noto Sans, Zen Kaku Gothic New, Playfair Display), metadata, OGP
  globals.css      # All styles (dark theme, glassmorphism, gold accents, reveal animations)
  favicon.ico
public/
  robots.txt, sitemap.xml, manifest.json
  googlefa73401209ca14ac.html  # Google Search Console verification
.env               # CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (gitignored)
upload.mjs         # node upload.mjs <paths...> --pref 京都府 --loc 清水寺
sort-photos.mjs    # Re-sort photos inside each prefecture by EXIF date (newest left)
add-years.mjs      # Backfill `year:` field from EXIF
check-gps.mjs      # Debug: check GPS presence (currently always empty — Capture One strips)
rebuild-prefectures.mjs  # Utility used once during a file-recovery
next.config.mjs    # Image domains: res.cloudinary.com, images.unsplash.com
vercel.json        # Security headers (CSP, X-Frame-Options)
```

## Architecture

Everything lives in `app/page.js` as a single client component (`"use client"`). No routing.

### Key data structures (top of page.js)
- **TR** — translation strings (UI), 20 languages including "zh-tw" quoted key
- **PREF_I18N** — 47 prefecture names × 20 languages
- **LOC_I18N** — 64 location names × 20 languages
- **PREFECTURES** — ordered ISO-standard (北海道 first, 沖縄 last) array. Each: `{ pref, lat, lng, photos: [{id, loc, year}] }`

### Main components inside page.js
- `JapanMap` — D3 SVG map; uses `<defs>` with radialGradient `goldGrad`/`goldGradHover`, filters `goldGlow`/`goldGlowStrong`, linearGradient `okiFade` for the Okinawa inset divider
- `Page` (default export) — language switcher, hero, map wrap, gallery, contact, lightbox

### Helper functions
- `getUrl(p, w)` / `cldUrl(id, w)` — Cloudinary URL builders
- `getPrefName(pref, lang)` / `getLocName(loc, lang)` — localize names
- `MAP_PINS` — first photo per prefecture for tooltip thumb

## Cloudinary

- **Cloud Name:** `dr53c12fo`
- **URL pattern:** `https://res.cloudinary.com/dr53c12fo/image/upload/w_{width},f_auto,q_auto/{public_id}.jpg`
- **Responsive widths:** thumbnail 600/1200px, lightbox 800/2400px (mobile/desktop)
- **API creds** in `.env` (gitignored). Needed only by upload/sort/add-years scripts.

## Photo Management Workflow

Capture One exports strip GPS, so location must be passed manually.

```bash
# Upload N photos to a prefecture/location
node upload.mjs path1.jpg path2.jpg --pref 京都府 --loc 清水寺

# After adding new photos, run these once:
node add-years.mjs     # Pulls year from EXIF per Cloudinary resource
node sort-photos.mjs   # Re-sorts photos within each prefecture by EXIF date (newest left)

# Then commit/push — Vercel auto-deploys
git add app/page.js && git commit -m "..." && git push
```

**Important:** prefecture order in the PREFECTURES array is manually maintained in ISO order (北海道, 千葉県, 東京都, 神奈川県, 石川県, 岐阜県, 愛知県, 三重県, 京都府, 兵庫県, 奈良県, 徳島県, 香川県, 愛媛県, 高知県, 福岡県, 大分県, 沖縄県). `sort-photos.mjs` only sorts within a prefecture; it doesn't reorder the prefectures themselves.

## Current Photo Coverage (398 total, 18 prefectures)

| Prefecture | Count | Locations |
|---|---|---|
| 北海道 | 118 | さっぽろ雪まつり, 知床, 摩周湖, 阿寒, 富良野, 三段滝公園, 札幌(野幌森林公園ほか), 室蘭, 小樽, 美幌峠, 旭山動物園, 美唄, 登別, 洞爺湖, 北竜町 |
| 千葉県 | 1 | 鴨川シーワールド |
| 東京都 | 14 | 東京, 品川 |
| 神奈川県 | 50 | 鎌倉, 横浜 |
| 石川県 | 7 | 金沢 |
| 岐阜県 | 4 | 白川郷 |
| 愛知県 | 24 | 東山動物園 |
| 三重県 | 38 | 伊勢神宮, おはらい町・おかげ横丁, 朝熊山展望台, 横山展望台, 梅林公園, 夫婦岩, 鳥羽水族館 |
| 京都府 | 18 | 清水寺, 金閣寺, 平等院鳳凰堂, 東福寺 |
| 兵庫県 | 5 | 姫路城 |
| 奈良県 | 3 | 法隆寺, 法隆寺 夢殿 |
| 徳島県 | 2 | 鳴門海峡, 大鳴門橋 |
| 香川県 | 2 | 父母ヶ浜 |
| 愛媛県 | 10 | 道後温泉, 松山城, 来島海峡大橋, 亀老山展望台 |
| 高知県 | 11 | 桂浜, 高知城, 名越屋沈下橋, にこ淵 |
| 福岡県 | 2 | 福岡 |
| 大分県 | 8 | 別府, 湯布院 |
| 沖縄県 | 81 | 宮古島, 沖縄 |

## 20-Language Translation (verified complete)

`ja, en, zh, zh-tw, ko, es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv`

Translations are manual in `TR`, `PREF_I18N`, `LOC_I18N`. A verification snippet that catches missing entries:

```js
// Run in: node -e "..." (see earlier _verify.mjs patterns)
// Check all three objects have all 20 lang keys; confirm every loc used
// in PREFECTURES has an LOC_I18N entry.
```

Last audited: all 47 prefectures × 20, all 64 locations × 20, and every used `loc` is translated.

## Design Language (current — post 2026-04 redesign)

- **Background:** near-black `#0a0a0a` with subtle gold radial glow per section
- **Text:** warm beige `#e8e4df` / `#f2ece2` for key elements
- **Gold accent:** `rgba(220,190,100,...)` — buttons, map gradients, hairlines
- **Fonts:**
  - `Playfair Display` (italic 400, 700) — hero title, year labels, watermark, pref heading, contact title, lightbox prefecture
  - `Zen Kaku Gothic New` (300, 500, 700, 900) — nav, body JP, buttons, labels
  - `Cormorant Garamond` — kept but rarely used
  - `Noto Sans JP` / `Noto Sans` — fallback body
- **Hero:** single-line "Landscapes of Japan" in Playfair italic, blur→focus animation, subtitle kana removed
- **Prefecture heading:** JP + English subtitle + gold `::after` hairline stretching right
- **Map:** SVG `<defs>` with `radialGradient` fills + `feGaussianBlur` glow filters; cubic-bezier(.2,.8,.2,1) transitions; rounded tooltip with gold hairline; Okinawa inset uses `linearGradient` divider instead of dashed box
- **Reveal-on-scroll:** `.reveal` class + `IntersectionObserver` → `.is-visible` adds opacity/translateY transition. Respects `prefers-reduced-motion`
- **Card hover:** `translateY(-6px) scale(1.018)` + gold glow, cubic-bezier(.16,1.1,.3,1.05) spring
- **Lightbox:** `backdrop-filter: blur(28px) saturate(1.3)`, `lbIn`/`lbOut` animations, glassmorphism arrows, `touch-action: manipulation` on controls
- **Language bar:** flat text (no box) + gold underline `::after` on active/hover

## Known Gotchas & Historical Bugs

1. **Infinite recursion in closeLightbox (FIXED):** A `replace_all` of `setLightbox(null)` → `closeLightbox()` accidentally replaced the inner state setter inside `closeLightbox` itself. Symptom: `.closing` class appears but lightbox never unmounts. Check `app/page.js` line ~1212 — `setTimeout` callback should call `setLightbox(null)`, NOT `closeLightbox()`.
2. **Cloudinary 10MB upload limit:** Large JPEGs (>10MB) fail upload. User re-exports at lower quality — watch for `_1.jpg` suffix.
3. **Capture One strips GPS** on export. Don't rely on EXIF GPS for auto-location.
4. **Mobile click sometimes doesn't fire after touchend** on iOS Safari with `filter`/`transform` elements. Lightbox controls now have BOTH `onClick` and `onTouchEnd` with `stopPropagation` + `preventDefault`.
5. **`sort-photos.mjs` regex** depends on `year:` being present. Run `add-years.mjs` first if adding photos.
6. **Prefecture reorder via script caution:** An earlier script using `prefEnd = content.indexOf("];\n", ...)` was unreliable. The current sort script uses bracket-depth tracking.

## SEO / Discoverability Setup

- `app/layout.js` metadata: OGP image, Twitter Card, canonical, keywords, robots directives
- `public/robots.txt` → points to `sitemap.xml`
- `public/sitemap.xml` → single root URL
- `public/manifest.json` → PWA basics
- `public/googlefa73401209ca14ac.html` → Google Search Console ownership verification
- JSON-LD (inline in page.js) → WebSite + ImageGallery + Photograph schemas
- All `<img>` have meaningful `alt="<loc> - <pref> | Landscapes of Japan"`
- Registered with: Google Search Console (sitemap submitted, URL indexed), Bing Webmaster Tools (imported from GSC), Yandex (ping), IndexNow (Bing + Yandex + Naver + Seznam)

## Deployment

```bash
git push                    # Vercel auto-deploys from master
npx vercel --prod --yes     # Manual deploy if needed (uses existing Vercel CLI session)
```

Vercel token is NOT needed for manual deploys — `npx vercel` uses the cached auth from `C:\Users\3jmcn\.local\share\com.vercel.cli\auth.json` (or similar).

## Development

```bash
cd C:\Users\3jmcn\Downloads\files\landscapes-of-japan
npm run dev                 # OR use preview_start with "landscapes-dev" launch config
```

## Preview Server (MCP)

Use `preview_start` with `{ name: "landscapes-dev" }`. Config is at `C:\Users\3jmcn\Downloads\files\.claude\launch.json`. On Windows there's no `npm.cmd` in PATH for the MCP launcher, so the config uses node directly: `node node_modules/next/dist/bin/next dev` with `cwd: "landscapes-of-japan"`.

Verification helpers:
- `preview_eval` for DOM inspection
- `preview_inspect` for computed styles (more accurate than screenshots for color/fonts)
- `preview_screenshot` for layout
- `preview_resize({preset:"mobile"})` for 375×812 mobile check

## Recent Redesign Summary (2026-04-17 → 19)

Commits `cc7d0e3` through `8268415`:

1. **ISO prefecture ordering** (北海道→沖縄)
2. **New typography:** dropped Yuji Boku, added Playfair Display italic + Zen Kaku Gothic New
3. **Hero:** "Landscapes of Japan" single line, blur→focus animation. Hero subtitle text colour now `#f2ece2` (matches title).
4. **Map:** radial gradient fills, Gaussian-blur glow filters, softer Okinawa inset, rounded glassmorphic tooltips. Mobile tooltip is now tappable (handlePrefInteraction) and offset 36px from the prefecture path.
5. **Scroll-linked fade-in** for all `.reveal` sections via IntersectionObserver
6. **Card hover:** lift + scale + gold glow spring
7. **Lightbox:** backdrop-filter blur, `lbIn`/`lbOut` animations, enlarged close button on mobile, direct-tap close in `onTouchEnd` to sidestep iOS click issues. Body scroll locked while lightbox is open (position:fixed + scroll restore).
8. **Language bar:** flat text + underline-reveal
9. **Contact form:** pill-shaped gold send button
10. **Removed subtitle "日本の風景"** from hero
11. **Fix mobile lightbox infinite recursion**
12. **Document scroll** instead of internal `cRef` overflow:auto wrapper (iOS scrollIntoView reliability)
13. **Map double-tap navigation rewritten** — uses `id="pref-{i}"` lookup instead of callback-ref map (R19 callback-ref reordering bug); manual `window.scrollTo` with re-correction at 400/900/1500ms (lazy-loaded images shifting layout); center-fallback when scroll target exceeds maxScroll
14. **Okinawa inset rect** with `pointerEvents:all` + onClick(handlePrefInteraction "沖縄県") — tap anywhere in inset box navigates
15. **JP_GEO fallback removed** (English names mismatched prefMap during cold-load)
16. **Nav button "撮影地マップ" → "撮影地"** across all 20 languages (both `nav.map` and `mapL`)
17. **Hero watermark added** — Mt Fuji + pagoda images, grayscale via Cloudinary `e_grayscale` URL (no CSS filter to avoid compositor seams), opacity .32, swaps landscape/portrait by viewport
18. **Top-bar transparent over hero**, decoration only on `.scrolled`. Removed backdrop-filter from `.top-nav-link`. `.top-langs` scrollbar fully hidden (was leaving phantom thin line on Edge).
19. **Horizontal-line bug ROOT CAUSE 2026-04-19:** `.cin-section::before` had `top:-10%` which placed its 9487px-section's top edge at screen y≈131px — the radial-gradient's bounding-box edge rendered as a full-width hairline. Fixed by `top:0`. (Lost ~8 deploy cycles to compositor-seam theories before finally bisecting via `display:none`.)
20. **Mobile gallery scroll** — dropped scroll-snap, dropped touch-action:pan-x, dropped body overflow-x:hidden, restored `-webkit-overflow-scrolling:touch`. Native iOS horizontal swipe responsiveness restored.

## Pending: SEO Phase 1–4 (NOT STARTED)

User has approved a multi-language SEO overhaul. See `~/.claude/projects/C--Users-3jmcn-Downloads-files/memory/project_seo_phase.md` for the full plan with locked decisions.

**Summary of phases:**
- Phase 1: Move `app/page.js` → `app/[lang]/page.js` with dynamic routes for all 20 langs; `generateMetadata` per language; `app/sitemap.js` with hreflang alternates; `middleware.js` for `Accept-Language` based redirect from `/` to `/{lang}/`.
- Phase 2: image `alt` attributes localized via `getLocName(loc, lang)` and `getPrefName(pref, lang)`.
- Phase 3: Add `BreadcrumbList`, `Person` (name="Landscapes of Japan"), `WebPage`, and `TouristDestination` (per loc) JSON-LD schemas.
- Phase 4: `app/[lang]/opengraph-image.js` using `next/og` `ImageResponse` for per-language OG images.

**Locked decisions:** Photographer name = "Landscapes of Japan"; default-lang redirect = automatic via Accept-Language; old `/` URL = 301 redirect.

## Conventions

- **Photo order:** newest first (left) per prefecture, sorted by EXIF capture date
- **Prefecture order:** Japanese ISO standard (hardcoded in PREFECTURES array, not auto-sorted)
- **Single-file architecture:** All app logic in `page.js` — no separate component files
- **No external i18n library**
- **Only use emojis if explicitly requested**
- **Never commit `.env`**
- **Never deploy without explicit user request** — test locally with preview_start first
- **Do NOT use `replace_all` when a short pattern might match inside helper functions** (see "infinite recursion" gotcha)
- **Fonts via `next/font/google`** with CSS variables exposed; reference in CSS as `var(--font-playfair)` etc.

## Quick Verification Checklist before Deploy

1. `preview_console_logs` level=error → none
2. `sort-photos.mjs` ran recently if photos added
3. Prefecture order correct (北海道 first, 沖縄 last)
4. Translation audit (TR + PREF_I18N + LOC_I18N each 20 langs, every loc covered)
5. Lightbox opens AND closes (regression test after any touch/click handler edits)
6. Mobile viewport (`preview_resize` mobile) scrolls cleanly through hero → map → gallery
