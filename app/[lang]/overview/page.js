import { notFound } from "next/navigation";
import OverviewClient from "../../OverviewClient.js";
import { LANGS, SITE_URL } from "../../i18n-meta.js";
import { ui } from "../../ui-strings.js";
import { shareImages } from "../../og.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};
  return {
    title: `${ui("overview", lang)} | Landscapes of Japan`,
    alternates: { canonical: `${SITE_URL}/${lang}/overview` },
    /* 検索対象にはしないが、リンクを貼られることはある。貼ったときに画像が出るようにする */
    openGraph: { title: `${ui("overview", lang)} | Landscapes of Japan`, type: "website", url: `${SITE_URL}/${lang}/overview`, siteName: "Landscapes of Japan", images: shareImages(null).og },
    twitter: { card: "summary_large_image", title: `${ui("overview", lang)} | Landscapes of Japan`, images: shareImages(null).tw },
    /* 中身はキャンバスで、検索エンジンが読める本文が無い。25言語ぶんの
       同じ内容のページを検索対象として増やさないよう index はしない。
       リンクはたどってよいので follow は残す (/explore と同じ扱い)。 */
    robots: { index: false, follow: true },
  };
}

export default async function OverviewPage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <OverviewClient lang={lang} />;
}
