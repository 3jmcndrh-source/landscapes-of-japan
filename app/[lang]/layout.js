import { Zen_Kaku_Gothic_New, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { LANGS, RTL_LANGS, SITE_URL } from "../i18n-meta.js";

const CLARITY_PROJECT_ID = "wt20nzlr29";

// GA4 測定ID (G-XXXXXXXXXX)。空文字なら GA4 のタグを一切出力しない。
// Cloudflare は Bot 込みの全 HTTP アクセスを数えるのに対し、GA4 はブラウザで
// JS を実行した訪問者だけを数えるため、実際の閲覧者数はこちらが近い。
const GA4_MEASUREMENT_ID = "G-SZG99MQG5Z";

// Only the two fonts actually referenced by CSS variables are self-hosted via
// next/font. Cormorant Garamond, Noto Sans JP, and Noto Sans were previously
// bundled but their --font-* variables are referenced 0 times — they generated
// ~hundreds of woff2 files (Noto Sans JP especially, via CJK unicode-range
// splitting) with no visual effect. Removed to cut the Cloudflare Pages
// per-deploy file count. Quoted CSS fallbacks like 'Noto Sans JP' / 'Cormorant
// Garamond' remain as system-font fallbacks (already the effective behaviour).

// preload:false が要点。この書体は Google Fonts 側で CJK を約120枚に切って
// 配信するため、既定の preload だと **どのページでも 120ファイル・約1.4MB** を
// 先読みしていた (実測: /ja/explore の初回転送 2,848KB のうち 1,378KB)。
// 実際に要るのは、そのページの文字が入っている数枚だけ。
// preload を外すと、ブラウザが unicode-range を見て必要な分だけ取りに行く。
// display:"swap" があるので文字が消える時間は無く、代替書体で出てから差し替わる。
// Playfair は Latin で枚数が少なく、見出し (LCP になりやすい) に使うので先読みを残す。
const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "500"], // 700/900 dropped — 0 font-weight refs in CSS
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  const dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  const htmlLang = lang === "zh-tw" ? "zh-Hant" : lang === "zh" ? "zh-Hans" : lang;
  return (
    <html lang={htmlLang} dir={dir}>
      <head>
        <link rel="preconnect" href="https://landscapes-images.pages.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://landscapes-images.pages.dev" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Landscapes of Japan — Latest Photos" href="/feed.xml" />
        <meta name="theme-color" content="#dcbe64" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Landscapes of Japan" />
        {/* Apple touch icons (PWA install on iOS) */}
        <link rel="apple-touch-icon" sizes="180x180" href="https://landscapes-images.pages.dev/icon_180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://landscapes-images.pages.dev/icon_152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="https://landscapes-images.pages.dev/icon_120.png" />
        {/* A1: cross-document View Transitions (Chrome 126+, Safari 18+) — graceful fallback */}
        <meta name="view-transition" content="same-origin" />
        {/* P4: Speculation Rules — PREFETCH (document only) rather than prerender:
            prerender speculatively loads every image on the target page, which
            multiplied Cloudinary bandwidth (the metered resource). Prefetched
            HTML is free on CF Pages and still gives near-instant navigations. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [{
                where: { and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/*.xml" } },
                  { not: { href_matches: "/*.txt" } },
                  { not: { href_matches: "/*.json" } },
                ] },
                eagerness: "moderate",
              }],
            }),
          }}
        />
        {/* LCP最適化 (#22): ヒーロー背景画像preload (デバイス別) */}
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          href="https://landscapes-images.pages.dev/hero_landscape_gray_w1920.webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          href="https://landscapes-images.pages.dev/hero_portrait_gray_w1080.webp"
          media="(max-width: 768px)"
        />
      </head>
      <body className={`${zenKaku.variable} ${playfair.variable}`}>
        {/* A2: scroll restoration — let the browser restore scroll on back/forward
            and ensure forward navigation starts at the top. */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in history) history.scrollRestoration = "auto";`}
        </Script>
        {/* C2: service worker (stale-while-revalidate for HTML + cache-first for images) */}
        <Script id="sw-register" strategy="lazyOnload">
          {`if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
              navigator.serviceWorker.register("/sw.js").catch(() => {});
            });
          }`}
        </Script>
        {/* GA4: 実際の閲覧者数の計測。全ページがフルページ遷移なので
            ページごとに page_view が自然に発火する (SPA 用の追加処理は不要)。
            afterInteractive = ハイドレーション後・LCP の後に読み込む。 */}
        {GA4_MEASUREMENT_ID && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`(function () {
              /* ⑨ 本番ホスト以外 (ローカルビルド・プレビュー) では計測しない。
                 検証で本番の計測データを汚さないため。gtag が生えないので
                 analytics.js の送信はすべて no-op になり、画面の動作は変わらない。 */
              if (location.hostname !== "landscapes-of-japan.com") return;

              var s = document.createElement("script");
              s.async = true;
              s.src = "https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}";
              document.head.appendChild(s);

              window.dataLayer = window.dataLayer || [];
              window.gtag = function () { window.dataLayer.push(arguments); };
              window.gtag("js", new Date());

              /* 検索語を GA4 に送らない。
                 検索ページには /{lang}/search?q=... で入ってくることがある
                 (JSON-LD の SearchAction、ブラウザの検索欄、共有されたURL)。
                 GA4 は自由入力の q= を次の2つに載せてしまう:
                   page_location  … その検索ページ自身のURL
                   page_referrer  … 検索ページから別ページへ移った次のページのURL
                 どちらからも q= を落としてから config する。
                 ページ側の q= の機能 (URLからの検索状態の復元) は変えない。
                 公開時に GA4 管理画面側でも「サイト内検索」の無効化と、
                 URLクエリパラメータのデータ編集で q を対象にする設定を適用する。 */
              var strip = function (href) {
                try { var u = new URL(href); u.searchParams.delete("q"); return u.toString(); }
                catch (e) { return href; }
              };
              var params = { page_location: strip(location.href) };
              if (document.referrer) params.page_referrer = strip(document.referrer);
              window.gtag("config", "${GA4_MEASUREMENT_ID}", params);
            })();`}
          </Script>
        )}
        {/* Microsoft Clarity (#4): user behavior heatmap & session recording */}
        {/* A10: lazyOnload で LCP/INP に影響しない (load イベント後に実行) */}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
              /* ⑨ GA4 と同じく、本番ホスト以外では計測しない (検証で本番データを汚さない) */
              if (l.location.hostname !== "landscapes-of-japan.com") return;
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>
        {children}
        <noscript>
          <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", color: "#e8e4df", padding: "40px 24px", overflowY: "auto", zIndex: 9999, fontFamily: "Georgia, 'Noto Sans JP', sans-serif" }}>
            <h1 style={{ fontStyle: "italic", fontSize: 32, color: "#f2ece2" }}>Landscapes of Japan</h1>
            <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7 }}>
              JavaScript is disabled. The interactive map and lightbox require JavaScript, but you can still browse our content directly:
            </p>
            <ul style={{ marginTop: 16, fontSize: 15, lineHeight: 2 }}>
              <li><a href={`/${lang}`} style={{ color: "#dcbe64" }}>Home (current language)</a></li>
              <li><a href={`/${lang}/collections/cherry-blossoms`} style={{ color: "#dcbe64" }}>Collections (Cherry Blossoms, Snow, Castles, ...)</a></li>
              <li><a href="/sitemap.xml" style={{ color: "#dcbe64" }}>Site map (all 13,000+ pages)</a></li>
              <li><a href="/feed.xml" style={{ color: "#dcbe64" }}>RSS feed (latest 50 photos)</a></li>
            </ul>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(232,228,223,.6)" }}>
              For the full experience with interactive map and gallery, please enable JavaScript.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
