import Link from "next/link";
import { SITE_URL } from "./i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";

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

export default function NotFound() {
  // pathname 取得は静的404では不可。クライアントで pathname analyze は別途。
  // ここは静的なデフォルト 404 として案内のみ。

  const popularPrefs = ["hokkaido", "kyoto", "okinawa", "yamanashi", "nagano"];
  const collections = [
    ["cherry-blossoms", "Cherry Blossoms"],
    ["snow", "Snow"],
    ["castles", "Castles"],
    ["temples-shrines", "Temples & Shrines"],
    ["coastal", "Coastal"],
    ["lakes", "Lakes"],
  ];

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
          <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, color: "rgba(232,228,223,.7)", lineHeight: 1.7, marginBottom: 48 }}>
            お探しのページは見つかりませんでした。<br />
            The page you're looking for doesn't exist or has been moved.
          </p>

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

          <section style={{ marginTop: 56, textAlign: "center" }}>
            <Link href="/en/blog" style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(220,190,100,.85)", textDecoration: "none", borderBottom: "1px solid rgba(220,190,100,.4)", paddingBottom: 2 }}>
              Read photography guides on the Blog →
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
