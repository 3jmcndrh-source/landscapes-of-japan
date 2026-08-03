import { notFound } from "next/navigation";
import LocClient from "../../../LocClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../data.js";
import { LANGS, HREFLANG, SITE_URL, buildHreflangMap } from "../../../i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS, prefFromSlug, locFromSlug } from "../../../slugs.js";
import { getLocDesc, getLocFaqs } from "../../../content/descriptions.js";
import { getEvents } from "../../../events.js";
import { getLocSameAs, getPrefSameAs } from "../../../wikidata.js";
import { getLocTitleKw, getLocTitleKwEnFallback } from "../../../title-keywords.js";
import { COLLECTION_SLUGS, getCollectionPhotos } from "../../../collections.js";

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

  const titleKw = getLocTitleKw(locJp, lang);
  const titleKwEN = getLocTitleKwEnFallback(locJp);
  let title;
  if (titleKw) {
    // native-language tagline available (en/ja) — replaces prefecture suffix
    title = `${locLocal}: ${titleKw} | Landscapes of Japan`;
  } else if (titleKwEN && lang !== "en") {
    // other languages: EN keyword in parens, native name + pref preserved
    title = `${locLocal} (${titleKwEN}) - ${prefLocal} | Landscapes of Japan`;
  } else {
    title = `${locLocal} - ${prefLocal} | Landscapes of Japan`;
  }
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

  // desc/faqs は UI からは 2026-07 に削除済み。SEO meta + JSON-LD 用にのみ残す。
  const desc = getLocDesc(locJp, lang);
  const faqs = getLocFaqs(locJp, lang);

  // この loc の写真が実際に入っているコレクションを写真単位で集計 (枚数の多い順)。
  // collection.locs による loc 単位判定では、写真タグ由来の鳥/動物が拾えなかった。
  const locPhotoIds = new Set(photos.map((p) => p.id));
  const collections = COLLECTION_SLUGS
    .map((slug) => ({
      slug,
      count: getCollectionPhotos(slug, PREFECTURES).filter((p) => locPhotoIds.has(p.id)).length,
    }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

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
          (p) => cldUrl(p.id, 1200)
        ),
      },
      faqs.length > 0 && {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${lang}/${prefSlug}/${locSlug}#faq`,
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
      // GSC 警告対策 (2026-05-18): performer + offers を追加。
      // performer は ev.performerJa/En を使い、なければ venue 名から推定。
      // offers は無料公開デフォルト (大半の festival/seasonal イベントは入場無料)。
      ...getEvents(locJp).map((ev) => {
        const venueShort = ev.placeName.split(" (")[0];
        const performerName = (lang === "ja" ? ev.performerJa : ev.performerEn) || venueShort;
        return {
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
          image: photos.slice(0, 4).map((p) => cldUrl(p.id, 1200)),
          organizer: { "@type": "Organization", name: "Landscapes of Japan", url: SITE_URL },
          performer: { "@type": "Organization", name: performerName },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}`,
            price: ev.priceJpy != null ? String(ev.priceJpy) : "0",
            priceCurrency: "JPY",
            availability: "https://schema.org/InStock",
            validFrom: ev.startDate,
          },
        };
      }),
    ].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocClient lang={lang} prefJp={prefJp} locJp={locJp} collections={collections} />
    </>
  );
}
