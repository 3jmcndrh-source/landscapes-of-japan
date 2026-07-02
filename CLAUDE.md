# Landscapes of Japan — Claude Code Guide

## Project Overview

Japanese landscape photography portfolio. Built with **Next.js 16** (static export) + **Cloudinary** + **D3.js**, deployed on **Cloudflare Pages**. 25-language localization, gold-accent dark-cinematic design.

- **Production URL:** https://landscapes-of-japan.com (Cloudflare Pages; also https://landscapes-of-japan.pages.dev)
- **GitHub:** https://github.com/3jmcndrh-source/landscapes-of-japan (production branch: `cloudflare-migration`; deploy via `wrangler pages deploy out`)
- **Stack:** Next.js 16.1.6 (output: "export"), React 19.2.3, D3 7.9.0, Cloudinary
- **No tests, no CI** — manual testing + preview server only

## Working Directory

`C:\Users\3jmcn\Downloads\files\landscapes-of-japan` on Windows.
Preview launch config: `C:\Users\3jmcn\Downloads\files\.claude\launch.json` (uses cwd="landscapes-of-japan" + node on `next/dist/bin/next dev`).

## File Structure

```
app/
  [lang]/
    layout.js             # Root layout: html/body/fonts, dynamic <html lang dir>, RTL for ar/fa/he
    page.js               # Server component: generateStaticParams (25 langs), generateMetadata
    opengraph-image.js    # Edge runtime: dynamic per-lang OG image via next/og + Satori
  PageClient.js           # Client component (~1558 lines): old page.js, now takes initialLang prop
  i18n-meta.js            # LANGS, HREFLANG (BCP 47), SEO_META per lang, SITE_URL, OG_IMAGE, RTL_LANGS
  sitemap.xml/route.js    # Sitemap index → /sitemap/0.xml + per-prefecture /sitemap/{1..N}.xml
  sitemap/[id]/route.js   # Split sitemap (id=0: root+pref+loc+blog+...; id=N: photo URLs of pref N-1)
  sitemap-images.xml/route.js  # Google image sitemap (canonical /ja/ URLs only)
  globals.css             # All styles (dark theme, glassmorphism, gold accents, reveal animations)
  favicon.ico
proxy.js              # Root-level: Next.js 16 renamed middleware. Accept-Language → /{lang}/ 301
public/
  robots.txt, manifest.json
  googlefa73401209ca14ac.html  # Google Search Console verification
.env               # CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (gitignored)
upload.mjs         # node upload.mjs <paths...> --pref 京都府 --loc 清水寺
sort-photos.mjs    # Re-sort photos inside each prefecture by EXIF date (newest left)
add-years.mjs      # Backfill `year:` field from EXIF
check-gps.mjs      # Debug: check GPS presence (currently always empty — Capture One strips)
rebuild-prefectures.mjs  # Utility used once during a file-recovery
next.config.mjs    # output: "export", images.unoptimized, headers() for CSP/X-Frame
public/_headers    # Cloudflare Pages CSP + cache rules (replaces vercel.json)
public/_redirects  # Cloudflare Pages `/` → `/en` redirect (replaces proxy.js)
scripts/cleanup-export.mjs  # Post-build: strip RSC .txt to stay under 20k file Pages Free limit
```

## Architecture

25 language-prefixed routes via `app/[lang]/` dynamic segment. Flow:

1. `proxy.js` (Next.js 16 renamed middleware) catches `/` → Accept-Language match → 301 to `/{lang}`.
2. `app/[lang]/layout.js` is the root layout — sets `<html lang dir>` per language (RTL for `ar`/`fa`/`he`, `zh-Hans`/`zh-Hant` for Chinese).
3. `app/[lang]/page.js` is a server component: exports `generateStaticParams` (all 25 langs), `generateMetadata` (localized title/desc/keywords, canonical, 25-lang hreflang alternates + x-default), renders `<PageClient initialLang={lang}/>`.
4. `app/PageClient.js` contains the actual app — the old single-client component, unchanged structurally except it accepts `initialLang` prop and imports SEO_META/HREFLANG/SITE_URL/OG_IMAGE from `i18n-meta.js` for the JSON-LD graph.

No trailing slashes on any URL — Next.js static export emits `/ja.html` and the `/ja` path serves it without a trailing slash. Canonical/alternates/sitemap entries all match the no-trailing-slash form.

### Key data structures (in app/data.js)
- **TR** — translation strings (UI), 25 languages including "zh-tw" quoted key
- **PREF_I18N** — 47 prefecture names × 25 languages
- **LOC_I18N** — 78 location names × 25 languages
- **PREFECTURES** — ordered ISO-standard (北海道 first, 沖縄 last) array. Each: `{ pref, lat, lng, photos: [{id, loc, year}] }`

### Main components inside page.js
- `JapanMap` — D3 SVG map; uses `<defs>` with radialGradient `goldGrad`/`goldGradHover`, filters `goldGlow`/`goldGlowStrong`, linearGradient `okiFade` for the Okinawa inset divider
- `Page` (default export) — language switcher, hero, map wrap, gallery, contact, lightbox

### Helper functions
- `getUrl(p, w)` / `cldUrl(id, w)` — Cloudinary URL builders
- `getPrefName(pref, lang)` / `getLocName(loc, lang)` — localize names
- `MAP_PINS` — first photo per prefecture for tooltip thumb

## Images (self-hosted — 2026-06 Cloudinary 脱出済み)

Cloudinary は無料枠超過 (帯域48GB/月=220%) のため 2026-06 に完全離脱。画像は
**専用 Cloudflare Pages プロジェクト `landscapes-images`** から配信 (帯域無制限・$0)。

- **URL pattern:** `https://landscapes-images.pages.dev/{id}_w{300|600|1200|2400|3840}.webp` / LQIP `{id}_w40b.webp` (3840 は 2026-06-13 T4 で追加)
- 特殊: `og.jpg`, `icon_{120..512}.png`, `hero_{landscape,portrait}_gray_w*.webp`, `shot_*.jpg`
- 生成元: `scripts/generate-variants.mjs` (sharp, webp q80, 拡大なし)。任意の幅は `cldUrl(id,w)` が生成済み幅へ切り上げ解決。Lightbox 幅は `lbWidth()` (data.js: mobile 800 / 通常 2400 / 4K級 3840)
- **派生生成ファイル (コミット対象):** `app/photo-colors.js` (主要色 ←`scripts/generate-photo-colors.mjs`) / `app/photo-months.js` (EXIF撮影月 ←`scripts/generate-photo-months.mjs`)。どちらも manifest.json 起点・原本庫が必要なのでビルドチェーン外 (手動 or upload.mjs が自動実行)
- **原本マスター庫:** `C:/Users/3jmcn/Pictures/cloudinary-originals/` (7.4GB+, manifest.json が台帳。サイトには3840px版までしか載らないので必ずバックアップ対象に)
- 容量: 20k ファイル/デプロイ ÷ 6変換 ≈ **写真3,300枚** まで。1枚のサイズ制限なし (旧10MB制限消滅)。現在 4,009/20k
- 旧 Cloudinary アカウント (dr53c12fo) は 2026-06-19 停止予定のまま放置で OK

## Photo Management Workflow

Capture One exports strip GPS, so location must be passed manually.
**フル画質書き出しで OK (10MB 制限なし)。**

```bash
# 追加はこれ 1 コマンド: EXIF 日時をローカルで読み、原本コピー + manifest.json 追記 →
# WebP 変換 (300-3840+LQIP) → data.js へ撮影日降順で正位置挿入 →
# photo-colors.js / photo-months.js 再生成 → landscapes-images へ差分デプロイ まで自動
node upload.mjs path1.jpg path2.jpg --pref 北海道 --loc 積丹

# 本体サイトの反映
npm run build && npx wrangler pages deploy out --project-name=landscapes-of-japan --branch=cloudflare-migration --commit-dirty=true
git add app/data.js && git commit -m "..." && git push
```

旧 `add-years.mjs` / `sort-photos.mjs` は **不要になった** (EXIF はアップロード時に
確定挿入)。Cloudinary 版 upload は `upload-cloudinary-legacy.mjs.bak` に保管。

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

## 25-Language Translation (verified complete)

Base 5 (full data baked in `app/content/{prefectures,locations}.js`):
`ja, en, zh, zh-tw, ko`

Extras 20 (in `app/content/extras/{lang}.js`, merged at runtime via `descriptions.js`):
`es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv, fa, he, bn, tl, uk`

RTL languages (set by `RTL_LANGS` in `app/i18n-meta.js`): `ar, fa, he`

Translations are manual in `TR`, `PREF_I18N`, `LOC_I18N` (UI + names) and in `app/content/extras/{lang}.js` (descriptions, FAQs, definitions, highlights, quickAnswers). A verification snippet that catches missing entries:

```js
// Run in: cd landscapes-of-japan && node --input-type=module -e "..."
// Check all three (TR/PREF_I18N/LOC_I18N) have all 25 lang keys.
// Check each app/content/extras/{lang}.js has 20 prefs / 68 locs / 20 prefFaqs / 69 locFaqs / 20 defs / 20 hls / 20 qas.
```

Last audited: all 47 prefectures × 25, all 78 locations × 25, all 5 extras langs (fa/he/bn/tl/uk added 2026-04-28 in A12) at full ar.js parity.

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

## 鑑賞体験機能 (2026-06-13 サイト価値向上スプリント T1-T11)

- **T1 シアターモード** `app/Theater.js`: 全画面オーバーレイのスライドショー (8秒クロスフェード+Ken Burns、reduced-motion で無効)。▶ボタン = ホームhero (全587枚シャッフル)・locページ (#photos 右上)・コレクション (header)。コレクションは季節フィルタ追従。Esc/✕/スペース/←→。
- **T2 アンビエントカラー** `app/photo-colors.js`: 全写真の主要色 ("r,g,b")。`ambient(id, alpha)`。Lightbox (`--amb` + `.cin-lb::before`、@property で0.8sクロスフェード)・写真ページ背景・シアター背景・今日の一枚カードを染める。
- **T4 4K**: WIDTHS に 3840 追加 (generate-variants/upload/data.js/Lightbox lbW/写真ページ srcset)。
- **T5 季節**: `app/photo-months.js` (id→撮影月)。locページ シーズンバー (`app/SeasonBar.js`, server計算で月渡し)・写真ページ「この場所の他の季節」(server計算 otherSeasons prop)・コレクション季節チップ (photo.month を server付与)。**月マップはクライアントバンドルに載せない方針。**
- **T6 ゴールデンアワー** `app/sun.js` (NOAA近似, JST固定) + `app/SunTimes.js`: locページ Weather 横に日の出/日の入り/GH帯 (高度6°境界)。client mount 後計算 (SSGミスマッチ回避)。
- **T8 ヒーロー生命化** `app/HeroRotation.js` + PageClient `HERO_ROTATION` 配列 (8枚、差替はこの配列編集のみ): フルカラー9秒クロスフェード+ズーム。1枚目ロード完了まで非表示 = grayscale静止画フォールバック維持。reduced-motion では起動しない。
- **T9 今日の一枚** `app/PhotoOfTheDay.js`: JST日付のdjb2ハッシュで決定的選出。ホームのギャラリー直前。client mount後描画なので `.reveal` 禁止 (IO登録に乗らない) — 自前 potdIn アニメ。
- **T11 RTL**: `[dir="rtl"]` ブロック (globals.css) で Lightbox info/close/矢印・photo-nav・パンくず区切り (`.bc-sep`)・シアター caption/close を鏡像化。スワイプ・←→キーは物理方向のまま。
- **撮影日順ビュー (2026-07)** `app/photo-dates.js` (id→"YYYY-MM-DD" ←`scripts/generate-photo-dates.mjs`): ホームのギャラリーに「地域別 / 撮影日順」トグル (PageClient `galleryMode`)。撮影日順は全587枚を都道府県横断で新しい順に並べ、年月ごとに見出し (`.cin-dategrid`)。ライトボックスと共有要素は表示中の順 (`activePhotos`) に追従。日付グリッドは client mount 後にのみ表示され `.reveal` は使わない (IO 非登録で不可視化を回避)。月マップと同様にコミット済み生成物・ビルドチェーン外、upload.mjs が再生成。

## Known Gotchas & Historical Bugs

1. **Infinite recursion in closeLightbox (FIXED):** A `replace_all` of `setLightbox(null)` → `closeLightbox()` accidentally replaced the inner state setter inside `closeLightbox` itself. Symptom: `.closing` class appears but lightbox never unmounts. Check `app/page.js` line ~1212 — `setTimeout` callback should call `setLightbox(null)`, NOT `closeLightbox()`.
2. **(解消済 2026-06)** 旧 Cloudinary 10MB 制限は画像セルフホスト化で消滅。フル画質 (30MB+) で書き出して良い。Large JPEGs (>10MB) fail upload. User re-exports at lower quality — watch for `_1.jpg` suffix.
3. **Capture One strips GPS** on export. Don't rely on EXIF GPS for auto-location.
4. **Mobile click sometimes doesn't fire after touchend** on iOS Safari with `filter`/`transform` elements. Lightbox controls now have BOTH `onClick` and `onTouchEnd` with `stopPropagation` + `preventDefault`.
5. **`sort-photos.mjs` regex** depends on `year:` being present. Run `add-years.mjs` first if adding photos.
6. **Prefecture reorder via script caution:** An earlier script using `prefEnd = content.indexOf("];\n", ...)` was unreliable. The current sort script uses bracket-depth tracking.
7. **photoLang import 漏れ (FIXED 2026-06-13):** 7言語化の際 LocClient だけ `photoLang` の import が漏れ、loc ページの lightbox を開くと ReferenceError でページ全体が白画面になっていた (本番で約1日存在)。新しい client に photoHref を足すときは `import { photoLang } from "./i18n-meta.js"` を忘れない。
8. **preview ウィンドウは hidden:** preview MCP のブラウザは `document.visibilityState === "hidden"` で動く環境があり、**CSSアニメーションのタイムラインが0で凍結**する (例: hero タイトルが opacity 0 のまま)。これはバグではない。検証は computed style / getAnimations() / DOM で行い、スクショ (タイムアウトする) やアニメ進行の目視には頼らない。
9. **PowerShell 5.1 と git commit:** コミットメッセージに `"` (二重引用符) を含めるとネイティブ引数渡しで分解されて pathspec エラーになる。here-string を使っても `"` 自体を避ける。

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
# 1. Build (static export + post-process). ~5-10 min for 17k+ pages.
npm run build

# 2. Deploy out/ to Cloudflare Pages via wrangler.
export CLOUDFLARE_API_TOKEN="<pages-scoped token>"
export CLOUDFLARE_ACCOUNT_ID="0373897369bf3777415ed3daa77cd538"
npx wrangler pages deploy out --project-name=landscapes-of-japan --branch=cloudflare-migration --commit-dirty=true
```

- **Production branch:** `cloudflare-migration` (configured in Pages project settings).
- **No auto-deploy:** GitHub push does NOT trigger a build — must run wrangler manually.
- **Auth:** API token must have `Cloudflare Pages: Edit` scope. Account-wide token is at `~/.wrangler/config/default.toml` if you logged in via `wrangler login`.

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
16. **Nav button "撮影地マップ" → "撮影地"** across all 25 languages (both `nav.map` and `mapL`)
17. **Hero watermark added** — Mt Fuji + pagoda images, grayscale via Cloudinary `e_grayscale` URL (no CSS filter to avoid compositor seams), opacity .32, swaps landscape/portrait by viewport
18. **Top-bar transparent over hero**, decoration only on `.scrolled`. Removed backdrop-filter from `.top-nav-link`. `.top-langs` scrollbar fully hidden (was leaving phantom thin line on Edge).
19. **Horizontal-line bug ROOT CAUSE 2026-04-19:** `.cin-section::before` had `top:-10%` which placed its 9487px-section's top edge at screen y≈131px — the radial-gradient's bounding-box edge rendered as a full-width hairline. Fixed by `top:0`. (Lost ~8 deploy cycles to compositor-seam theories before finally bisecting via `display:none`.)
20. **Mobile gallery scroll** — dropped scroll-snap, dropped touch-action:pan-x, dropped body overflow-x:hidden, restored `-webkit-overflow-scrolling:touch`. Native iOS horizontal swipe responsiveness restored.

## SEO Phase 5 — Per-loc expansion (COMPLETE 2026-04-19)

Initial deploy: 1,460 URLs at 20 langs. Post-A12 (2026-04-28): **4,156 static pages at 25 langs**. Commit `cd6cae8`.

- `app/[lang]/[pref]/page.js` + `[loc]/page.js`: prefecture + location landing pages
- `app/slugs.js`: JP↔slug maps (e.g. `清水寺` ↔ `kiyomizu-dera`, `父母ヶ浜` ↔ `chichibugahama`)
- `app/data.js`: extracted PREFECTURES/TR/helpers from PageClient for server-side reuse
- `app/PrefClient.js` / `app/LocClient.js`: client components with lightbox, language switcher anchors
- `app/content/`: descriptions.js merges prefectures.js + locations.js (5 base langs) with extras/*.js (20 additional langs). Graceful fallback to English when a lang entry is missing.
- `app/sitemap/[id]/route.js`: split sitemap (chunked to handle >50k URLs at 25 langs × per-photo SSG)
- `app/sitemap-images.xml/route.js`: canonical /ja/ URLs only (Google Images discovers other langs via HTML hreflang)
- `app/PageClient.js`: language buttons are now `<a href="/{lang}">` (URL nav) — proper analytics + SEO. D3 named imports (`select/zoom/zoomIdentity/geoMercator/geoPath`) for better tree-shaking

Watermark opacity bumped from .4 to .75 with text-shadow (2026-04-19).

## SEO Phase 1–4 (COMPLETE 2026-04-19)

All four phases implemented and deployed. Commits `59cdd32`, `3e32d8e`, `dd67123`, `81d1a39`, `1b59790`.

21. **Phase 1 — routing/metadata/sitemap/proxy:** moved to `app/[lang]/`, added generateStaticParams + generateMetadata with hreflang + sitemap.js with 25-URL hreflang alternates + proxy.js (Accept-Language 301).
22. **Phase 1 fix — trailing slash:** Vercel strips `/ja/` → `/ja` with 308. Stripped trailing slashes from canonical/alternates/sitemap/proxy target to match served URL.
23. **Phase 2 — localized alt:** gallery + lightbox `img alt` now uses `getLocName(loc, lang) + " - " + getPrefName(pf.pref, lang)`.
24. **Phase 3 — JSON-LD @graph:** 59 entries per page — Person (brand name), WebSite, WebPage (inLanguage=BCP 47), BreadcrumbList, localized ImageGallery with Photograph children, 54 TouristDestination (one per loc).
25. **Phase 4 — dynamic OG image:** `app/[lang]/opengraph-image.js` with edge runtime + Satori. Fonts loaded per script via Google Fonts CSS API (Noto Sans JP/SC/TC/KR/Devanagari/Thai/Bengali, Noto Sans for Latin/Cyrillic/Vietnamese). Arabic / Persian / Hebrew fall back to English text (Satori can't render complex Arabic-script & Hebrew shaping — `lookupType:5 substFormat:3` unsupported). RTL `dir="rtl"` only set when actually rendering ar/fa/he text.

**Gotcha for future OG image work:** do NOT use `generateImageMetadata` for a single image per route — it adds `/undefined` to the URL. Just use static `export const alt`. Also remove explicit `openGraph.images` / `twitter.images` from generateMetadata, else they override the dynamic one. When adding a new lang with non-Latin script, update `pickBodyFamily()` and `UNSAFE_SCRIPTS` in `app/[lang]/opengraph-image.js`.

## A12 — 5-language expansion (COMPLETE 2026-04-28)

Added `fa` (Persian/Farsi), `he` (Hebrew), `bn` (Bengali), `tl` (Tagalog/Filipino), `uk` (Ukrainian) for a total of **25 languages**. 40 commits. Build verified: 4,156 static pages.

- `app/i18n-meta.js`: LANGS 20→25, RTL_LANGS extended (`ar`+`fa`+`he`), HREFLANG + SEO_META 5 entries (`fa_IR`, `he_IL`, `bn_BD`, `tl_PH`, `uk_UA`)
- `proxy.js`: LANGS array extended (Accept-Language detection now matches new langs)
- `app/data.js`: TR (UI strings) 5 entries with full ~30 keys; PREF_I18N 47×5 + LOC_I18N 78×5 names added via one-shot migration scripts
- `app/content/extras/{fa,he,bn,tl,uk}.js`: each at full ar.js parity — prefectures (20) + locations (68) + prefectureFaqs (20) + locationFaqs (69) + prefectureDefinitions (20) + prefectureHighlights (20×5 items) + prefectureQuickAnswers (20×3 Q&A)
- `app/content/descriptions.js`: EXTRA_LANGS map extended; merge logic untouched (handles new langs automatically via Object iteration)
- `app/[lang]/opengraph-image.js`: UNSAFE_SCRIPTS extended to `ar+fa+he`; `pickBodyFamily` adds `bn → "Noto Sans Bengali"`; RTL dir applies to fa/he too

**Session-stability gotcha discovered during A12:** Single Edit/Write operations exceeding ~500 lines of multi-byte content (Persian/Hebrew/Bengali/Cyrillic) caused Anthropic API session crashes ("session stopped responding"). Workaround: split each language's full content into 5 sequential commits (prefectures+locations / prefectureFaqs / locationFaqs / definitions+highlights / quickAnswers). Latin-script langs (tl, uk) tolerated larger Edits than Arabic-script.

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
4. Translation audit (TR + PREF_I18N + LOC_I18N each 25 langs, every loc covered; extras/{lang}.js sections complete)
5. Lightbox opens AND closes (regression test after any touch/click handler edits)
6. Mobile viewport (`preview_resize` mobile) scrolls cleanly through hero → map → gallery
