import { notFound } from "next/navigation";
import { PREFECTURES, getPrefName, getLocName } from "../../../data.js";
import { PREF_SLUGS, LOC_SLUGS } from "../../../slugs.js";
import { COLLECTIONS, getCollectionName } from "../../../collections.js";
import { COLLECTION_TAGS, PHOTO_TAGS } from "../../../photo-tags.js";
import { PHOTO_DIMS } from "../../../photo-dims.js";
import { PHOTO_MONTHS } from "../../../photo-months.js";
import { PHOTO_DATES } from "../../../photo-dates.js";
import { PHOTO_PALETTE } from "../../../photo-palette.js";
import { PHOTO_ADDED } from "../../../photo-added.js";
import { LANGS, SITE_URL, HREFLANG, buildHreflangMap, PHOTO_LANGS } from "../../../i18n-meta.js";
import { GALLERIES, galleryBySlug, MIN_PHOTOS } from "../../../galleries.js";
import { selectPhotos, setFacets } from "../../../photo-model.js";
import GalleryClient from "../../../GalleryClient.js";

export const dynamicParams = false;

/* サーバー側では動的読み込みを使わず、直接注入する */
setFacets({ dates: PHOTO_DATES, months: PHOTO_MONTHS, tags: PHOTO_TAGS, dims: { PHOTO_DIMS }, palette: PHOTO_PALETTE, added: PHOTO_ADDED });

const themeLocs = Object.fromEntries(Object.entries(COLLECTIONS).map(([s, c]) => [s, c.locs || []]));
const opts = { themeTags: COLLECTION_TAGS, themeLocs };

function photosFor(g) {
  return selectPhotos({ pref: g.pref, theme: g.theme, sort: "date" }, opts);
}

/* 中身が無くなった組み合わせはページを作らない */
const live = () => GALLERIES.filter((g) => photosFor(g).length >= MIN_PHOTOS);

export function generateStaticParams() {
  const gs = live();
  return LANGS.flatMap((lang) => gs.map((g) => ({ lang, slug: g.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const g = galleryBySlug(slug);
  if (!LANGS.includes(lang) || !g) return {};
  const photos = photosFor(g);
  const prefName = getPrefName(g.pref, lang);
  const themeName = getCollectionName(g.theme, lang);
  const title = `${prefName} × ${themeName} | Landscapes of Japan`;
  const description = lang === "ja"
    ? `${prefName}で撮影した${themeName}の写真 ${photos.length}枚。`
    : `${photos.length} photographs of ${themeName} in ${prefName}.`;
  return {
    title, description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/gallery/${slug}`,
      languages: buildHreflangMap((l) => `${SITE_URL}/${l}/gallery/${slug}`),
    },
    openGraph: { title, description, locale: HREFLANG[lang]?.replace("-", "_") },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function GalleryPage({ params }) {
  const { lang, slug } = await params;
  const g = galleryBySlug(slug);
  if (!LANGS.includes(lang) || !g) notFound();
  const photos = photosFor(g);
  if (photos.length < MIN_PHOTOS) notFound();

  const prefName = getPrefName(g.pref, lang);
  const themeName = getCollectionName(g.theme, lang);
  const prefSlug = PREF_SLUGS[g.pref];
  const hasPhoto = PHOTO_LANGS.includes(lang);

  /* 初期HTMLに写真と主要リンクを載せる (クロールできるように) */
  const items = photos.map((p) => ({
    id: p.id,
    loc: p.loc,
    pref: p.pref,
    year: p.year,
    dims: PHOTO_DIMS[p.id] || null,
    href: hasPhoto && p.prefSlug && p.locSlug ? `/${lang}/${p.prefSlug}/${p.locSlug}/${p.id}` : null,
    locName: p.loc ? getLocName(p.loc, lang) : "",
    prefName: getPrefName(p.pref, lang),
  }));

  /* この地域・テーマの実在ページへの導線 */
  const locLinks = [...new Set(photos.map((p) => p.loc).filter((l) => l && LOC_SLUGS[l]))]
    .slice(0, 12)
    .map((l) => ({ href: `/${lang}/${prefSlug}/${LOC_SLUGS[l]}`, name: getLocName(l, lang) }));

  const others = live().filter((x) => x.slug !== g.slug).map((x) => ({
    href: `/${lang}/gallery/${x.slug}`,
    name: `${getPrefName(x.pref, lang)} × ${getCollectionName(x.theme, lang)}`,
  }));

  return (
    <GalleryClient
      lang={lang}
      heading={`${prefName} × ${themeName}`}
      count={photos.length}
      items={items}
      prefHref={prefSlug ? `/${lang}/${prefSlug}` : null}
      prefName={prefName}
      themeHref={`/${lang}/collections/${g.theme}`}
      themeName={themeName}
      locLinks={locLinks}
      others={others}
      exploreHref={`/${lang}/explore?pref=${encodeURIComponent(g.pref)}&theme=${g.theme}`}
    />
  );
}
