import { notFound } from "next/navigation";
import AlbumClient from "../../AlbumClient.js";
import { LANGS, SITE_URL, buildHreflangMap } from "../../i18n-meta.js";
import { ui } from "../../ui-strings.js";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) return {};
  return {
    title: `${ui("album", lang)} | Landscapes of Japan`,
    alternates: { canonical: `${SITE_URL}/${lang}/album`, languages: buildHreflangMap((l) => `${SITE_URL}/${l}/album`) },
    /* ⑥ 共有アルバムは個人が作る組み合わせ。検索向けページを無制限に増やさないため
       index はしない。検索対象として公開するギャラリーは ⑤ で別に用意する。 */
    robots: { index: false, follow: true },
  };
}

export default async function AlbumPage({ params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <AlbumClient lang={lang} />;
}
