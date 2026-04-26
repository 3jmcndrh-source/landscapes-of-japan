import { notFound } from "next/navigation";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { PREFECTURES, TR, cldUrl, getPrefName, getLocName } from "../../data.js";
import { COLLECTIONS, COLLECTION_SLUGS, getCollectionName, getCollectionDesc, getCollectionPhotos } from "../../collections.js";
import TopNav from "../../TopNav.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};

  const titleLabel = lang === "ja" ? "コレクション" : lang === "zh" ? "合集" : lang === "zh-tw" ? "合集" : lang === "ko" ? "컬렉션" : "Collections";
  const title = `${titleLabel} | Landscapes of Japan`;
  const description = lang === "ja"
    ? "桜・紅葉・雪・城・寺社・温泉・海岸・夜景・滝・湖など、テーマ別に整理された日本の風景写真コレクション。"
    : "Themed collections of Japanese landscape photography — cherry blossoms, autumn foliage, snow, castles, temples and shrines, hot springs, coast, night views, waterfalls, and lakes.";

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/collections`);

  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/${lang}/collections`, languages },
    openGraph: { title, description, type: "website", url: `${SITE_URL}/${lang}/collections`, siteName: "Landscapes of Japan" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function CollectionsIndex({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();

  const titleLabel = lang === "ja" ? "コレクション" : lang === "zh" ? "合集" : lang === "zh-tw" ? "合集" : lang === "ko" ? "컬렉션" : "Collections";

  // 各 collection の最初の写真を hero として取得
  const collectionsWithHero = COLLECTION_SLUGS.map((slug) => {
    const photos = getCollectionPhotos(slug, PREFECTURES);
    return {
      slug,
      name: getCollectionName(slug, lang),
      desc: getCollectionDesc(slug, lang),
      heroId: photos[0]?.id || null,
      count: photos.length,
    };
  }).filter((c) => c.count > 0); // 写真ゼロの collection は表示しない

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${lang}/collections#page`,
        name: `${titleLabel} | Landscapes of Japan`,
        url: `${SITE_URL}/${lang}/collections`,
        inLanguage: HREFLANG[lang] || lang,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
            { "@type": "ListItem", position: 2, name: titleLabel, item: `${SITE_URL}/${lang}/collections` },
          ],
        },
        hasPart: collectionsWithHero.map((c) => ({
          "@type": "WebPage",
          name: c.name,
          url: `${SITE_URL}/${lang}/collections/${c.slug}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/${lang}/collections#itemlist`,
        name: titleLabel,
        numberOfItems: collectionsWithHero.length,
        itemListElement: collectionsWithHero.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}/${lang}/collections/${c.slug}`,
        })),
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
              <a key={c} href={`/${c}/collections`} className={"top-lang-btn" + (lang === c ? " active" : "")}>{TR[c].name}</a>
            ))}
          </div>
          <TopNav lang={lang} t={TR[lang] || TR.en} />
        </div>

        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 80px" }}>
          <nav aria-label="breadcrumb" style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
            <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
            <span style={{ margin: "0 10px" }}>›</span>
            <span>{titleLabel}</span>
          </nav>

          <header style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,68px)", margin: 0, color: "#f2ece2", lineHeight: 1 }}>
              {titleLabel}
            </h1>
            <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, color: "rgba(232,228,223,.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 820 }}>
              {lang === "ja"
                ? "桜・紅葉・雪・城・寺社・温泉・海岸・夜景・滝・湖など、テーマごとに日本の風景を整理しました。"
                : lang === "zh"
                ? "按主题整理日本风景:樱花、红叶、雪、城、寺社、温泉、海岸、夜景、瀑布、湖泊。"
                : lang === "zh-tw"
                ? "按主題整理日本風景:櫻花、紅葉、雪、城、寺社、溫泉、海岸、夜景、瀑布、湖泊。"
                : lang === "ko"
                ? "벚꽃·단풍·눈·성·사찰·온천·해안·야경·폭포·호수 등 테마별로 정리한 일본 풍경 컬렉션."
                : "Themed collections of Japanese landscapes — cherry blossoms, autumn foliage, snow, castles, temples & shrines, hot springs, coast, night views, waterfalls, and lakes."}
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {collectionsWithHero.map((c) => (
              <a
                key={c.slug}
                href={`/${lang}/collections/${c.slug}`}
                style={{
                  display: "block",
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(220,190,100,.15)",
                  borderRadius: 8,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "#e8e4df",
                  transition: "all .3s",
                }}
                className="cin-hcard"
              >
                {c.heroId && (
                  <img
                    src={cldUrl(c.heroId, 600)}
                    alt={c.name + " | Landscapes of Japan"}
                    loading="lazy"
                    draggable="false"
                    style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }}
                  />
                )}
                <div style={{ padding: "20px 22px" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 24, margin: "0 0 8px", color: "#f2ece2", lineHeight: 1.2 }}>
                    {c.name}
                  </h2>
                  <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 12, color: "rgba(220,190,100,.7)", marginBottom: 10, letterSpacing: ".1em" }}>
                    {c.count} {lang === "ja" ? "枚" : lang === "ko" ? "장" : (lang === "zh" || lang === "zh-tw") ? "张" : "photos"}
                  </div>
                  <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13.5, lineHeight: 1.7, color: "rgba(232,228,223,.75)", margin: 0 }}>
                    {c.desc.length > 140 ? c.desc.slice(0, 140) + "…" : c.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
