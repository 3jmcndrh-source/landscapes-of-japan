import Link from "next/link";
import { SITE_URL } from "./i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { PREFECTURES, cldUrl } from "./data.js";

export const metadata = {
  title: "Page Not Found | Landscapes of Japan",
  description: "The page you're looking for doesn't exist. Browse our prefecture and location galleries instead.",
  robots: { index: false, follow: true },
};

// シンプルな類似度計算 (Levenshtein風、編集距離)
function similarity(a, b) {
  if (!a || !b) return 0;
  const an = a.toLowerCase();
  const bn = b.toLowerCase();
  if (an === bn) return 1;
  if (an.includes(bn) || bn.includes(an)) return 0.7;
  let common = 0;
  for (const ch of an) if (bn.includes(ch)) common++;
  return common / Math.max(an.length, bn.length);
}

function suggestSlugs(query, slugMap, max = 3) {
  if (!query) return [];
  const all = Object.values(slugMap);
  return all
    .map((s) => ({ slug: s, score: similarity(query, s) }))
    .filter((x) => x.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.slug);
}

// Multilingual "Page not found" greetings — keeps bilingual+ visitors engaged
// instead of bouncing on an EN-only error page.
const GREETINGS = [
  { lang: "ja", text: "お探しのページは見つかりませんでした。" },
  { lang: "en", text: "The page you're looking for doesn't exist or has been moved." },
  { lang: "zh", text: "未找到您要查找的页面。" },
  { lang: "ko", text: "찾고 계신 페이지를 찾을 수 없습니다." },
  { lang: "es", text: "No se encontró la página que estás buscando." },
  { lang: "fr", text: "La page que vous recherchez est introuvable." },
  { lang: "de", text: "Die gesuchte Seite konnte nicht gefunden werden." },
  { lang: "ar", text: "لم يتم العثور على الصفحة التي تبحث عنها." },
];

// Latest 6 photos by year — gives the 404 visitor something to click on
// instead of bouncing.
function getLatestPhotos(n = 6) {
  const all = [];
  for (const pf of PREFECTURES) {
    for (const photo of pf.photos) {
      if (!photo.loc) continue;
      const prefSlug = PREF_SLUGS[pf.pref];
      const locSlug = LOC_SLUGS[photo.loc];
      if (!prefSlug || !locSlug) continue;
      all.push({ ...photo, pref: pf.pref, prefSlug, locSlug });
    }
  }
  all.sort((a, b) => (b.year || 0) - (a.year || 0));
  return all.slice(0, n);
}

export default function NotFound() {
  // pathname 取得は静的404では不可。クライアントで pathname analyze は別途。
  // ここは静的なデフォルト 404 として案内のみ。

  const popularPrefs = ["hokkaido", "nagano", "kyoto", "okinawa", "yamanashi", "mie", "kanagawa", "ehime"];
  const collections = [
    ["cherry-blossoms", "Cherry Blossoms"],
    ["snow", "Snow"],
    ["castles", "Castles"],
    ["temples-shrines", "Temples & Shrines"],
    ["coastal", "Coastal"],
    ["lakes", "Lakes"],
  ];
  const latestPhotos = getLatestPhotos(6);

  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", color: "#e8e4df", margin: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", minHeight: "100vh" }}>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "120px 24px 80px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',Georgia,serif", fontStyle: "italic", fontSize: "clamp(80px, 14vw, 180px)", color: "rgba(220,190,100,.5)", lineHeight: 1, margin: 0 }}>
            404
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair),'Playfair Display',Georgia,serif", fontStyle: "italic", fontSize: "clamp(28px, 4vw, 42px)", color: "#f2ece2", marginTop: 24, marginBottom: 12 }}>
            Page not found
          </h1>
          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.65)", lineHeight: 1.9, marginBottom: 48, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            {GREETINGS.map((g) => (
              <div key={g.lang} dir={g.lang === "ar" ? "rtl" : "ltr"} lang={g.lang}>
                {g.text}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/" style={{ display: "inline-block", padding: "12px 32px", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(220,190,100,.95)", border: "1px solid rgba(220,190,100,.45)", borderRadius: 999, textDecoration: "none" }}>
              ← Back to home
            </Link>
          </div>

          <section style={{ marginTop: 64, textAlign: "left" }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20, textAlign: "center" }}>
              Popular destinations
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {popularPrefs.map((slug) => (
                <Link key={slug} href={`/en/${slug}`} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 8, padding: "14px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, textAlign: "center", textTransform: "capitalize" }}>
                  {slug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 56, textAlign: "left" }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20, textAlign: "center" }}>
              Browse by theme
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
              {collections.map(([slug, name]) => (
                <Link key={slug} href={`/en/collections/${slug}`} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 8, padding: "14px 16px", color: "#e8e4df", textDecoration: "none", fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, textAlign: "center" }}>
                  {name}
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.65)", marginBottom: 20, textAlign: "center" }}>
              Latest photos
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {latestPhotos.map((p) => (
                <Link key={p.id} href={`/en/${p.prefSlug}/${p.locSlug}/${p.id}`} style={{ display: "block", aspectRatio: "3/2", overflow: "hidden", borderRadius: 6, background: "#111", border: "1px solid rgba(220,190,100,.15)" }}>
                  <img src={cldUrl(p.id, 600)} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </Link>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 56, textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
            <Link href="/en/blog" style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(220,190,100,.85)", textDecoration: "none", borderBottom: "1px solid rgba(220,190,100,.4)", paddingBottom: 2 }}>
              Photography guides (Blog)
            </Link>
            <Link href="/sitemap.xml" style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(220,190,100,.85)", textDecoration: "none", borderBottom: "1px solid rgba(220,190,100,.4)", paddingBottom: 2 }}>
              Sitemap
            </Link>
            <Link href="/feed.xml" style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(220,190,100,.85)", textDecoration: "none", borderBottom: "1px solid rgba(220,190,100,.4)", paddingBottom: 2 }}>
              RSS feed
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
