import { notFound } from "next/navigation";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { PREFECTURES, PREF_I18N, getPrefName, getLocName, cldUrl } from "../../data.js";
import { PREF_SLUGS } from "../../slugs.js";
import { TR } from "../../data.js";

// 47都道府県のISO標準順 (写真有無問わず)
const ALL_PREFS_ORDERED = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県",
  "沖縄県",
];

const REGIONS = [
  { name: { ja: "北海道", en: "Hokkaido" }, prefs: ["北海道"] },
  { name: { ja: "東北", en: "Tohoku" }, prefs: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"] },
  { name: { ja: "関東", en: "Kanto" }, prefs: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"] },
  { name: { ja: "中部", en: "Chubu" }, prefs: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"] },
  { name: { ja: "関西", en: "Kansai" }, prefs: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
  { name: { ja: "中国", en: "Chugoku" }, prefs: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
  { name: { ja: "四国", en: "Shikoku" }, prefs: ["徳島県", "香川県", "愛媛県", "高知県"] },
  { name: { ja: "九州・沖縄", en: "Kyushu & Okinawa" }, prefs: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};

  const titleLabel = lang === "ja" ? "47都道府県" : lang === "zh" ? "日本47都道府县" : lang === "zh-tw" ? "日本47都道府縣" : lang === "ko" ? "일본 47개 도도부현" : "All 47 Prefectures of Japan";
  const fullTitle = `${titleLabel} | Landscapes of Japan`;
  const description = lang === "ja"
    ? "日本47都道府県すべての風景写真ガイド。北海道から沖縄まで、各地の撮影地と撮影シーズンを地域別に整理。"
    : "A complete index of all 47 Japanese prefectures organized by region — from Hokkaido to Okinawa. Photographic destinations and shooting seasons for each.";

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/all-prefectures`);

  return {
    title: fullTitle, description,
    alternates: { canonical: `${SITE_URL}/${lang}/all-prefectures`, languages },
    openGraph: { title: fullTitle, description, type: "website", url: `${SITE_URL}/${lang}/all-prefectures`, siteName: "Landscapes of Japan" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    robots: { index: true, follow: true },
  };
}

export default async function AllPrefecturesPage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();

  const titleLabel = lang === "ja" ? "47都道府県" : lang === "zh" ? "日本47都道府县" : lang === "zh-tw" ? "日本47都道府縣" : lang === "ko" ? "일본 47개 도도부현" : "All 47 Prefectures";

  // 写真ありpref と なしpref を区別
  const haveData = new Set(PREFECTURES.map((pf) => pf.pref));
  const photoCount = (prefJp) => {
    const pf = PREFECTURES.find((p) => p.pref === prefJp);
    return pf?.photos.length || 0;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${titleLabel} | Landscapes of Japan`,
    url: `${SITE_URL}/${lang}/all-prefectures`,
    inLanguage: HREFLANG[lang] || lang,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
        { "@type": "ListItem", position: 2, name: titleLabel, item: `${SITE_URL}/${lang}/all-prefectures` },
      ],
    },
    hasPart: ALL_PREFS_ORDERED.filter((p) => haveData.has(p)).map((prefJp) => ({
      "@type": "WebPage",
      name: getPrefName(prefJp, lang),
      url: `${SITE_URL}/${lang}/${PREF_SLUGS[prefJp]}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: "#0a0a0a", color: "#e8e4df", minHeight: "100vh", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
        <div className="top-bar scrolled">
          <div className="top-langs">
            {Object.entries(TR).map(([c]) => (
              <a key={c} href={`/${c}/all-prefectures`} className={"top-lang-btn" + (lang === c ? " active" : "")}>{TR[c].name}</a>
            ))}
          </div>
          <div className="top-nav">
            <a className="top-nav-link" href={`/${lang}`}>← Landscapes of Japan</a>
          </div>
        </div>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 80px" }}>
          <nav aria-label="breadcrumb" style={{ fontSize: 13, color: "rgba(232,228,223,.55)", marginBottom: 24, letterSpacing: ".05em" }}>
            <a href={`/${lang}`} style={{ color: "inherit", textDecoration: "none" }}>Landscapes of Japan</a>
            <span style={{ margin: "0 10px" }}>›</span>
            <span>{titleLabel}</span>
          </nav>

          <header style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(36px,5vw,56px)", margin: 0, color: "#f2ece2", lineHeight: 1.1 }}>
              {titleLabel}
            </h1>
            <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 16, color: "rgba(232,228,223,.7)", marginTop: 16, lineHeight: 1.7, maxWidth: 820 }}>
              {lang === "ja"
                ? "日本47都道府県を地域別に整理。撮影済の都道府県には写真とガイドへのリンク、未撮影の都道府県は今後の予定として表示しています。"
                : "All 47 Japanese prefectures organized by region. Prefectures with photos link to galleries; the rest are planned future destinations."}
            </p>
          </header>

          {REGIONS.map((region) => (
            <section key={region.name.en} style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid rgba(220,190,100,.15)" }}>
                {region.name[lang === "ja" ? "ja" : "en"] || region.name.en}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                {region.prefs.map((prefJp) => {
                  const has = haveData.has(prefJp);
                  const cnt = photoCount(prefJp);
                  const slug = PREF_SLUGS[prefJp];
                  if (has && slug) {
                    const pf = PREFECTURES.find((p) => p.pref === prefJp);
                    const heroId = pf?.photos[0]?.id;
                    return (
                      <a key={prefJp} href={`/${lang}/${slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 8, textDecoration: "none", color: "#e8e4df" }}>
                        {heroId && (
                          <img src={cldUrl(heroId, 100)} alt="" loading="lazy" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
                        )}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "#f2ece2" }}>
                            {getPrefName(prefJp, lang)}
                          </div>
                          <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 11, color: "rgba(232,228,223,.5)" }}>
                            {cnt} {lang === "ja" ? "枚" : "photos"}
                          </div>
                        </div>
                      </a>
                    );
                  }
                  return (
                    <div key={prefJp} style={{ padding: "10px 14px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(232,228,223,.08)", borderRadius: 8, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.4)" }}>
                      {getPrefName(prefJp, lang)}
                      <span style={{ fontSize: 10, marginLeft: 8, opacity: .6 }}>
                        {lang === "ja" ? "撮影予定" : "coming soon"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <section style={{ marginTop: 64, padding: "24px", background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.15)", borderRadius: 8 }}>
            <h2 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(220,190,100,.7)", marginBottom: 12 }}>
              {lang === "ja" ? "撮影状況" : "Coverage stats"}
            </h2>
            <div style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 14, color: "rgba(232,228,223,.85)", lineHeight: 1.7 }}>
              {lang === "ja"
                ? `現在 ${PREFECTURES.length}/47 都道府県を撮影済。順次拡大中です。`
                : `Currently covering ${PREFECTURES.length} of 47 prefectures, expanding over time.`}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
