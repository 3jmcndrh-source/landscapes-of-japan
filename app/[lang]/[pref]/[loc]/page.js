import { notFound } from "next/navigation";
import LocClient from "../../../LocClient.js";
import { PREFECTURES, getPrefName, getLocName } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS, prefFromSlug, locFromSlug } from "../../../slugs.js";
import { getLocDesc, getLocFaqs, getLocDefinition, getLocHighlights, getLocQuickAnswers } from "../../../content/descriptions.js";
import { getEvents } from "../../../events.js";
import { getLocSameAs, getPrefSameAs } from "../../../wikidata.js";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of LANGS) {
    for (const pf of PREFECTURES) {
      const prefSlug = PREF_SLUGS[pf.pref];
      if (!prefSlug) continue;
      const uniqueLocs = [...new Set(pf.photos.map((p) => p.loc).filter(Boolean))];
      for (const locJp of uniqueLocs) {
        const locSlug = LOC_SLUGS[locJp];
        if (!locSlug) continue;
        params.push({ lang, pref: prefSlug, loc: locSlug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, pref: prefSlug, loc: locSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) return {};

  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);
  const desc = getLocDesc(locJp, lang);

  const title = `${locLocal} - ${prefLocal} | Landscapes of Japan`;
  const description = desc || `${locLocal} landscape photography — photos taken in ${locLocal}, ${prefLocal}, Japan.`;

  const languages = buildHreflangMap((l) => `${SITE_URL}/${l}/${prefSlug}/${locSlug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
      siteName: "Landscapes of Japan",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, pref: prefSlug, loc: locSlug } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) notFound();

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) notFound();
  const photos = pf.photos.filter((p) => p.loc === locJp);
  if (photos.length === 0) notFound();

  const desc = getLocDesc(locJp, lang);
  const faqs = getLocFaqs(locJp, lang);
  const definition = getLocDefinition(locJp, lang);
  const highlights = getLocHighlights(locJp, lang);
  const quickAnswers = getLocQuickAnswers(locJp, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        name: getLocName(locJp, lang),
        url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
        inLanguage: HREFLANG[lang] || lang,
        description: desc,
        touristType: "Landscape Photography",
        ...(getLocSameAs(locJp).length > 0 && { sameAs: getLocSameAs(locJp) }),
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: getPrefName(prefJp, lang),
          address: { "@type": "PostalAddress", addressRegion: getPrefName(prefJp, "en"), addressCountry: "JP" },
          ...(getPrefSameAs(prefJp).length > 0 && { sameAs: getPrefSameAs(prefJp) }),
        },
        image: photos.slice(0, 10).map(
          (p) => `https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/${encodeURIComponent(p.id)}.jpg`
        ),
      },
      // A14: AI Overview対応 — DefinedTerm + QAPage (loc向け、AI Overview/Featured Snippet 直撃)
      definition && {
        "@type": "DefinedTerm",
        "@id": `${SITE_URL}/${lang}/${prefSlug}/${locSlug}#definition`,
        name: getLocName(locJp, lang),
        description: definition,
        inDefinedTermSet: `${SITE_URL}/${lang}#locations`,
      },
      quickAnswers.length > 0 && {
        "@type": "QAPage",
        "@id": `${SITE_URL}/${lang}/${prefSlug}/${locSlug}#qa`,
        mainEntity: quickAnswers.map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: { "@type": "Answer", text: qa.a },
        })),
      },
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
          { "@type": "ListItem", position: 3, name: getLocName(locJp, lang), item: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}` },
        ],
      },
      // Event schema (祭り・ライトアップ・シーズン) — 該当する場所のみ
      ...getEvents(locJp).map((ev) => ({
        "@type": "Event",
        name: lang === "ja" ? ev.nameJa : ev.nameEn,
        description: lang === "ja" ? ev.descJa : ev.descEn,
        startDate: ev.startDate,
        endDate: ev.endDate,
        eventStatus: `https://schema.org/${ev.eventStatus}`,
        eventAttendanceMode: `https://schema.org/${ev.eventAttendanceMode}`,
        location: {
          "@type": "Place",
          name: ev.placeName,
          address: { "@type": "PostalAddress", addressRegion: getPrefName(prefJp, "en"), addressCountry: "JP" },
        },
        image: photos.slice(0, 4).map((p) => `https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,f_auto,q_auto/${encodeURIComponent(p.id)}.jpg`),
        organizer: { "@type": "Organization", name: "Landscapes of Japan", url: SITE_URL },
      })),
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocClient lang={lang} prefJp={prefJp} locJp={locJp} desc={desc} faqs={faqs} definition={definition} highlights={highlights} quickAnswers={quickAnswers} />
    </>
  );
}
