import { notFound } from "next/navigation";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { POSTS, getPostTitle, getPostExcerpt } from "../../content/blog/posts.js";
import { TR, cldUrl } from "../../data.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};
  const t = TR[lang] || TR.en;
  const blogTitle = lang === "ja" ? "ブログ" : lang === "zh" ? "博客" : lang === "zh-tw" ? "部落格" : lang === "ko" ? "블로그" : "Blog";
  const title = `${blogTitle} | Landscapes of Japan`;
  const description = lang === "ja"
    ? "日本の風景写真ガイド・撮影テクニック・名所紹介。北海道から沖縄まで、四季折々の絶景を撮るための実践記事。"
    : "Japan landscape photography guides, techniques, and location features. Practical articles for shooting Hokkaido through Okinawa across the seasons.";

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/blog`);

  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/${lang}/blog`, languages },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/${lang}/blog`, siteName: "Landscapes of Japan" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function BlogIndex({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();

  const blogTitle = lang === "ja" ? "ブログ" : lang === "zh" ? "博客" : lang === "zh-tw" ? "部落格" : lang === "ko" ? "블로그" : "Blog";
  const sortedPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/${lang}/blog#blog`,
        name: `${blogTitle} | Landscapes of Japan`,
        url: `${SITE_URL}/${lang}/blog`,
        inLanguage: HREFLANG[lang] || lang,
        blogPost: sortedPosts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: getPostTitle(p, lang),
          datePublished: p.date,
          url: `${SITE_URL}/${lang}/blog/${p.slug}`,
          ...(p.hero && { image: cldUrl(p.hero, 1200) }),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/${lang}/blog#itemlist`,
        name: blogTitle,
        numberOfItems: sortedPosts.length,
        itemListElement: sortedPosts.slice(0, 30).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: getPostTitle(p, lang),
          url: `${SITE_URL}/${lang}/blog/${p.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: blogTitle, item: `${SITE_URL}/${lang}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
        <div className="top-bar scrolled">
          <div className="top-langs">
            {Object.entries(TR).map(([c]) => (
              <a key={c} href={`/${c}/blog`} className={"top-lang-btn" + (lang === c ? " active" : "")}>{TR[c].name}</a>
            ))}
          </div>
          <div className="top-nav">
            <a className="top-nav-link" href={`/${lang}`}>← Landscapes of Japan</a>
          </div>
        </div>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 80px" }}>
          <header style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,68px)", margin: 0, color: "#f2ece2", lineHeight: 1 }}>
              {blogTitle}
            </h1>
            <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.55)", marginTop: 12, letterSpacing: ".05em" }}>
              {sortedPosts.length} {lang === "ja" ? "記事" : "articles"}
            </div>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {sortedPosts.map((p) => (
              <a key={p.slug} href={`/${lang}/blog/${p.slug}`}
                 style={{ display: "block", background: "rgba(255,255,255,.03)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 8, overflow: "hidden", textDecoration: "none", color: "#e8e4df" }}>
                {p.hero && (
                  <img src={cldUrl(p.hero, 600)} alt={getPostTitle(p, lang)}
                       loading="lazy" draggable="false"
                       style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }} />
                )}
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 13, color: "rgba(220,190,100,.7)", marginBottom: 8 }}>{p.date}</div>
                  <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 18, margin: "0 0 10px", lineHeight: 1.4, color: "#f2ece2" }}>{getPostTitle(p, lang)}</h2>
                  <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, lineHeight: 1.7, color: "rgba(232,228,223,.7)", margin: 0 }}>{getPostExcerpt(p, lang)}</p>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
