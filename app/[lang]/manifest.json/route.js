/* 言語ごとの Web アプリ マニフェスト (/ja/manifest.json など)。
 *
 * 「ホーム画面に追加」したアイコンは、開いていたページではなく、マニフェストの start_url から起動する。
 * 以前は全言語が共通の /manifest.json (start_url: "/") を指していて、"/" は _redirects で必ず /en へ
 * 転送されるので、日本語ページから追加しても英語で起動していた。
 * 言語ごとに start_url を /{lang} にすれば、追加したときの言語で起動する。
 *
 * scope は "/" のまま (アプリの中で言語を切り替えても、ブラウザに飛び出さない)。
 * 文言は既存の訳だけを使う (サイト名・コレクション名)。新しい訳は書かない。
 */
import { LANGS, HREFLANG, RTL_LANGS } from "../../i18n-meta.js";
import { IMG_BASE } from "../../data.js";
import { getCollectionName } from "../../collections-meta.js";

export const dynamic = "force-static";
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const NAME = "Landscapes of Japan";
const SHORTCUTS = ["cherry-blossoms", "autumn-foliage", "snow", "night-views"];

export async function GET(_req, { params }) {
  const { lang } = await params;
  const manifest = {
    name: NAME,
    short_name: NAME,
    start_url: `/${lang}`,
    scope: "/",
    id: `/${lang}`,
    display: "standalone",
    orientation: "any",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: HREFLANG[lang] || lang,
    dir: RTL_LANGS.has(lang) ? "rtl" : "ltr",
    categories: ["photography", "travel", "art", "lifestyle"],
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon", purpose: "any" },
      { src: `${IMG_BASE}/icon_192.png`, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: `${IMG_BASE}/icon_512.png`, sizes: "512x512", type: "image/png", purpose: "any" },
      { src: `${IMG_BASE}/icon_512_pad.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    screenshots: [
      { src: `${IMG_BASE}/shot_narrow.jpg`, sizes: "1080x1920", type: "image/jpeg", form_factor: "narrow" },
      { src: `${IMG_BASE}/shot_wide.jpg`, sizes: "1920x1080", type: "image/jpeg", form_factor: "wide" },
    ],
    shortcuts: SHORTCUTS.map((slug) => ({
      name: getCollectionName(slug, lang),
      url: `/${lang}/collections/${slug}`,
      icons: [{ src: `${IMG_BASE}/icon_192.png`, sizes: "192x192" }],
    })),
    prefer_related_applications: false,
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
}
