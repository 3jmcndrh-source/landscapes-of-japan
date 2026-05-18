import { notFound } from "next/navigation";
import PrefClient from "../../PrefClient.js";
import { PREFECTURES, PREF_I18N, getPrefName } from "../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { PREF_SLUGS, prefFromSlug } from "../../slugs.js";
import { getPrefDesc, getPrefFaqs, getPrefDefinition, getPrefHighlights, getPrefQuickAnswers } from "../../content/descriptions.js";
import { getPrefSameAs } from "../../wikidata.js";
import { getPrefTitleKw, getPrefTitleKwEnFallback } from "../../title-keywords.js";
import { POSTS, getPostTitle, getPostExcerpt } from "../../content/blog/posts.js";
import { ui } from "../../ui-strings.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const prefJp of Object.keys(PREF_SLUGS)) {
      const pf = PREFECTURES.find((p) => p.pref === prefJp);
      if (!pf) continue;
      params.push({ lang, pref: PREF_SLUGS[prefJp] });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, pref: prefSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  if (!prefJp) return {};
  const prefLocal = getPrefName(prefJp, lang);
  const desc = getPrefDesc(prefJp, lang);

  const titleKw = getPrefTitleKw(prefJp, lang);
  const titleKwEN = getPrefTitleKwEnFallback(prefJp);
  let title;
  if (titleKw) {
    title = `${prefLocal}: ${titleKw} | Landscapes of Japan`;
  } else if (titleKwEN && lang !== "en") {
    title = `${prefLocal} (${titleKwEN}) | Landscapes of Japan`;
  } else {
    title = `${prefLocal} | Landscapes of Japan`;
  }
  const description = desc || `${prefLocal} landscape photography — photos taken across ${prefLocal}, Japan.`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/${prefSlug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${prefSlug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${lang}/${prefSlug}`,
      siteName: "Landscapes of Japan",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, pref: prefSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  if (!prefJp) notFound();

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) notFound();

  const desc = getPrefDesc(prefJp, lang);
  const faqs = getPrefFaqs(prefJp, lang);
  const definition = getPrefDefinition(prefJp, lang);
  const highlights = getPrefHighlights(prefJp, lang);
  const quickAnswers = getPrefQuickAnswers(prefJp, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        name: `${getPrefName(prefJp, lang)} | Landscapes of Japan`,
        url: `${SITE_URL}/${lang}/${prefSlug}`,
        inLanguage: HREFLANG[lang] || lang,
        description: desc,
        about: {
          "@type": "AdministrativeArea",
          name: getPrefName(prefJp, "en"),
          addressCountry: "JP",
          ...(getPrefSameAs(prefJp).length > 0 && { sameAs: getPrefSameAs(prefJp) }),
        },
        image: pf.photos.slice(0, 10).map((p) => ({
          "@type": "Photograph",
          contentUrl: `https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/${encodeURIComponent(p.id)}.jpg`,
          name: (p.loc ? p.loc + " - " : "") + prefJp,
        })),
      },
      // A14: AI Overview対応 — DefinedTerm (○○とは?)
      definition && {
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/${lang}/${prefSlug}#definition`,
        name: getPrefName(prefJp, lang),
        description: definition,
        inDefinedTermSet: `${SITE_URL}/${lang}#prefectures`,
      },
      // A14: AI Overview対応 — quickAnswers は QAPage で AI 引用候補化
      // GSC 検証エラー対策 (2026-05-18): QAPage は forum-style 想定で answerCount /
      // text / author / datePublished が必須。site 単独編集のため authorName と
      // 公開日を埋める。
      quickAnswers.length > 0 && {
        "@type": "QAPage",
        "@id": `${SITE_URL}/${lang}/${prefSlug}#qa`,
        mainEntity: quickAnswers.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          text: qa.q,
          answerCount: 1,
          author: { "@type": "Organization", name: "Landscapes of Japan", url: SITE_URL },
          datePublished: "2026-01-01",
          acceptedAnswer: {
            "@type": "Answer",
            text: qa.a,
            author: { "@type": "Organization", name: "Landscapes of Japan", url: SITE_URL },
            datePublished: "2026-01-01",
          },
        })),
      },
      // 既存FAQはFAQPageで(quickAnswersと別物として並立)
      faqs.length > 0 && {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: getPrefName(prefJp, lang), item: `${SITE_URL}/${lang}/${prefSlug}` },
        ],
      },
    ].filter(Boolean),
  };

  // Collect all unique location names in this prefecture, then find blog
  // posts whose `locs` array references any of them. Cross-link from pref
  // page to those long-form guides.
  const prefLocs = new Set(pf.photos.map((p) => p.loc).filter(Boolean));
  const relatedPosts = POSTS.filter((p) => p.locs && p.locs.some((l) => prefLocs.has(l)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrefClient lang={lang} prefJp={prefJp} desc={desc} faqs={faqs} definition={definition} highlights={highlights} quickAnswers={quickAnswers} />
      {relatedPosts.length > 0 && (
        <section style={{ background: "#0a0a0a", color: "#e8e4df", padding: "60px 16px", borderTop: "1px solid rgba(220,190,100,.15)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: "clamp(24px,3.2vw,36px)", color: "#f2ece2", margin: "0 0 32px", letterSpacing: ".01em" }}>
              {ui("relatedGuides", lang)}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {relatedPosts.map((p) => (
                <a
                  key={p.slug}
                  href={`/${lang}/blog/${p.slug}`}
                  style={{ display: "block", padding: 20, background: "rgba(220,190,100,.05)", border: "1px solid rgba(220,190,100,.18)", borderRadius: 6, textDecoration: "none", color: "#e8e4df" }}
                >
                  <h3 style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontWeight: 500, fontSize: 16, margin: "0 0 10px", color: "#f2ece2", lineHeight: 1.4 }}>
                    {getPostTitle(p, lang)}
                  </h3>
                  <p style={{ fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(232,228,223,.65)", margin: 0, lineHeight: 1.6 }}>
                    {getPostExcerpt(p, lang)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
