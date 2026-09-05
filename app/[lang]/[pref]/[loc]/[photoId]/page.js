import { notFound } from "next/navigation";
import PhotoClient from "../../../../PhotoClient.js";
import { PREFECTURES, getPrefName, getLocName, cldUrl } from "../../../../data.js";
import { HREFLANG, SITE_URL, PHOTO_LANGS } from "../../../../i18n-meta.js";
import { PREF_SLUGS, LOC_SLUGS, prefFromSlug, locFromSlug } from "../../../../slugs.js";
import { getLocDesc } from "../../../../content/descriptions.js";
import { PHOTO_TAGS } from "../../../../photo-tags.js";
import { PHOTO_MONTHS, seasonOf } from "../../../../photo-months.js";
import { PHOTO_DATES } from "../../../../photo-dates.js";
import { COLLECTION_TAGS } from "../../../../photo-tags.js";
import { getCollectionName } from "../../../../collections.js";

/* 写真詳細タイトル用のヘルパー。
   被写体語は「コレクション名」の既存翻訳をそのまま再利用する (新しい訳語を書き足さないため)。
   collection に対応しないタグ (landscape / rural / urban / mountain など) の写真には
   被写体語を付けない。 */
const TAG_TO_COLLECTION = (() => {
  const m = {};
  for (const [slug, tags] of Object.entries(COLLECTION_TAGS)) for (const t of tags) if (!(t in m)) m[t] = slug;
  return m;
})();
/* 複数タグを持つ写真の優先順。季節や被写体そのものが主題になりやすい順に並べている。 */
const SUBJECT_PRIORITY = ["cherry", "autumn", "snow", "castle", "temple", "shrine", "onsen", "waterfall", "lake", "coastal", "bird", "animal", "night"];
const INTL_LOCALE = { ja: "ja-JP", en: "en-US", "zh-tw": "zh-Hant-TW", de: "de-DE", es: "es-ES", ar: "ar", ko: "ko-KR" };

function captureYearMonth(photoId, lang) {
  const iso = PHOTO_DATES[photoId];
  if (!iso) return "";                    // 撮影日が無い写真は推測で補わない
  const [y, m] = iso.split("-");
  return new Intl.DateTimeFormat(INTL_LOCALE[lang] || "en-US", { year: "numeric", month: "long", timeZone: "UTC" })
    .format(new Date(Date.UTC(+y, +m - 1, 1)));
}
/* coastal / lake は「何を撮ったか」ではなく「どこで撮ったか」を表すタグで、
   単独なら主被写体だが、都市景観 (urban) と同居すると主題がどちらか決まらない。
   実測で、同じ tags[urban,coastal] でも お台場の砂浜は「海岸」が妥当なのに対し
   自由の女神とビル群には不適切だった。タグだけでは判別できないので、
   この組み合わせでは被写体語を省いて「撮影地 + 撮影年月」にする。
   night / castle / temple / shrine などは都市にあっても被写体そのものなので対象外。 */
const SETTING_TAGS = new Set(["coastal", "lake"]);
function subjectWord(photoId, lang) {
  const tags = PHOTO_TAGS[photoId];
  if (!tags) return "";                   // 未タグの写真には被写体語を付けない
  const hit = SUBJECT_PRIORITY.find((t) => tags.includes(t));
  if (!hit) return "";
  if (SETTING_TAGS.has(hit) && tags.includes("urban")) return "";
  return getCollectionName(TAG_TO_COLLECTION[hit], lang);
}

// 2026-06: 写真個別ページは PHOTO_LANGS (7言語) のみ pre-render。
// 587枚 × 25言語 = 14,675 ファイルが 20k 上限を圧迫していたため、
// GSC 実データ上位 + 戦略言語に絞った (詳細は i18n-meta.js のコメント)。
export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const lang of PHOTO_LANGS) {
    for (const pf of PREFECTURES) {
      const prefSlug = PREF_SLUGS[pf.pref];
      if (!prefSlug) continue;
      for (const photo of pf.photos) {
        if (!photo.loc) continue;
        const locSlug = LOC_SLUGS[photo.loc];
        if (!locSlug) continue;
        params.push({ lang, pref: prefSlug, loc: locSlug, photoId: photo.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, pref: prefSlug, loc: locSlug, photoId } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) return {};

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) return {};
  const photo = pf.photos.find((p) => p.id === photoId && p.loc === locJp);
  if (!photo) return {};

  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);
  const desc = getLocDesc(locJp, lang);
  const yearStr = photo.year ? ` (${photo.year})` : "";

  /* タイトルは「撮影地 + 撮影年月 + 被写体」で写真の中身が分かる形にする。
     以前は撮影地キーワード固定だったため、同じ撮影地の写真が全て同一タイトルになっていた
     (例: /ja の石垣島 49ページが同一)。撮影日やタグが無い写真はその部分を省くだけで、
     番号や写真IDのような無関係な語は足さない (一意化そのものは目的にしない)。 */
  const ymLocal = captureYearMonth(photoId, lang);
  const subject = subjectWord(photoId, lang);
  const head = [locLocal, ymLocal || (photo.year ? String(photo.year) : ""), subject].filter(Boolean).join(" ");
  const title = `${head} - ${prefLocal} | Landscapes of Japan`;
  const description = desc
    ? `${locLocal}, ${prefLocal} — ${desc.slice(0, 140)}`
    : `Photograph of ${locLocal}, ${prefLocal}, Japan${yearStr}.`;

  const languages = Object.fromEntries([
    ...PHOTO_LANGS.map((l) => [HREFLANG[l] || l, `${SITE_URL}/${l}/${prefSlug}/${locSlug}/${photoId}`]),
    ["x-default", `${SITE_URL}/en/${prefSlug}/${locSlug}/${photoId}`],
  ]);

  const ogImage = cldUrl(photoId, 1200);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
      siteName: "Landscapes of Japan",
      images: [{ url: ogImage, width: 1200, height: 800, alt: `${locLocal} - ${prefLocal}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({ params }) {
  const { lang, pref: prefSlug, loc: locSlug, photoId } = await params;
  const prefJp = prefFromSlug(prefSlug);
  const locJp = locFromSlug(locSlug);
  if (!prefJp || !locJp) notFound();

  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  if (!pf) notFound();
  const photo = pf.photos.find((p) => p.id === photoId && p.loc === locJp);
  if (!photo) notFound();

  const prefLocal = getPrefName(prefJp, lang);
  const locLocal = getLocName(locJp, lang);

  // 同loc の他写真 (現在の写真を除く) を 6枚まで
  const sameLoc = pf.photos.filter((p) => p.loc === locJp && p.id !== photoId);
  const related = sameLoc.slice(0, 6);

  // T5: この場所の他の季節 (同loc・現在と違う季節、季節ごとに最大2枚、計6枚まで)
  const curSeason = seasonOf(PHOTO_MONTHS[photoId]);
  const bySeason = {};
  for (const p of sameLoc) {
    const s = seasonOf(PHOTO_MONTHS[p.id]);
    if (!s || s === curSeason) continue;
    (bySeason[s] = bySeason[s] || []).push(p);
  }
  const otherSeasons = ["spring", "summer", "autumn", "winter"]
    .filter((s) => bySeason[s])
    .flatMap((s) => bySeason[s].slice(0, 2).map((p) => ({ ...p, season: s })))
    .slice(0, 6);

  // I-1: 同loc 内の前後ナビ (newest-first array order = gallery order)
  const locPhotos = pf.photos.filter((p) => p.loc === locJp);
  const photoIdx = locPhotos.findIndex((p) => p.id === photoId);
  const prevPhoto = photoIdx > 0 ? locPhotos[photoIdx - 1] : null;
  const nextPhoto = photoIdx >= 0 && photoIdx < locPhotos.length - 1 ? locPhotos[photoIdx + 1] : null;
  const navBase = `/${lang}/${prefSlug}/${locSlug}`;
  const prevHref = prevPhoto ? `${navBase}/${prevPhoto.id}` : null;
  const nextHref = nextPhoto ? `${navBase}/${nextPhoto.id}` : null;

  // A13: この写真のタグ + 同タグを持つ別 loc の写真 (最大 6 枚)
  const photoTags = PHOTO_TAGS[photoId] || [];
  const similarByTag = [];
  if (photoTags.length > 0) {
    for (const otherPf of PREFECTURES) {
      for (const otherPhoto of otherPf.photos) {
        if (otherPhoto.id === photoId) continue;
        if (otherPhoto.loc === locJp) continue; // 同locは別セクションなのでスキップ
        const otherTags = PHOTO_TAGS[otherPhoto.id] || [];
        const sharedCount = otherTags.filter((tag) => photoTags.includes(tag)).length;
        if (sharedCount > 0) {
          similarByTag.push({ ...otherPhoto, pref: otherPf.pref, sharedCount });
        }
      }
    }
    // 共通タグ数が多い順でソートし、上位 6 件
    similarByTag.sort((a, b) => b.sharedCount - a.sharedCount);
  }
  const similarPhotos = similarByTag.slice(0, 6);

  const photoUrl = cldUrl(photoId, 2400);
  const photoUrlLarge = cldUrl(photoId, 1200);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Photograph",
        "@id": `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}#photo`,
        name: `${locLocal} - ${prefLocal}`,
        description: getLocDesc(locJp, lang) || `Photograph of ${locLocal}, ${prefLocal}.`,
        contentUrl: photoUrl,
        thumbnailUrl: photoUrlLarge,
        url: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}`,
        inLanguage: HREFLANG[lang] || lang,
        encodingFormat: "image/jpeg",
        width: { "@type": "QuantitativeValue", value: 2400, unitCode: "E37" },
        height: { "@type": "QuantitativeValue", value: 1600, unitCode: "E37" },
        keywords: [getLocName(locJp, "en"), getPrefName(prefJp, "en"), "Japanese landscape", "landscape photography", "Japan", photo.year ? String(photo.year) : null].filter(Boolean).join(", "),
        creator: {
          "@type": "Person",
          name: "Landscapes of Japan",
          url: SITE_URL,
        },
        copyrightHolder: { "@type": "Person", name: "Landscapes of Japan" },
        copyrightNotice: "© Landscapes of Japan. Unauthorized reproduction prohibited.",
        license: `${SITE_URL}/${lang}`,
        acquireLicensePage: `${SITE_URL}/${lang}#contact`,
        creditText: "Landscapes of Japan",
        isAccessibleForFree: true,
        ...(photo.year && {
          dateCreated: `${photo.year}-01-01`,
          datePublished: `${photo.year}-12-31`,
          copyrightYear: photo.year,
        }),
        contentLocation: {
          "@type": "Place",
          name: `${locLocal}, ${prefLocal}, Japan`,
          address: {
            "@type": "PostalAddress",
            addressRegion: getPrefName(prefJp, "en"),
            addressCountry: "JP",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Landscapes of Japan", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: prefLocal, item: `${SITE_URL}/${lang}/${prefSlug}` },
          { "@type": "ListItem", position: 3, name: locLocal, item: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}` },
          { "@type": "ListItem", position: 4, name: `${locLocal}${photo.year ? ` (${photo.year})` : ""}`, item: `${SITE_URL}/${lang}/${prefSlug}/${locSlug}/${photoId}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PhotoClient
        lang={lang}
        prefJp={prefJp}
        locJp={locJp}
        photo={photo}
        related={related}
        similarPhotos={similarPhotos}
        otherSeasons={otherSeasons}
        prevHref={prevHref}
        nextHref={nextHref}
        position={photoIdx >= 0 ? { idx: photoIdx, total: locPhotos.length } : null}
      />
    </>
  );
}
