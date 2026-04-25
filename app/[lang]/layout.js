import { Cormorant_Garamond, Noto_Sans_JP, Noto_Sans, Zen_Kaku_Gothic_New, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import "../globals.css";
import { LANGS, RTL_LANGS, SITE_URL } from "../i18n-meta.js";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
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
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Landscapes of Japan — Latest Photos" href="/feed.xml" />
        <meta name="theme-color" content="#dcbe64" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Landscapes of Japan" />
      </head>
      <body className={`${cormorant.variable} ${notoSansJP.variable} ${notoSans.variable} ${zenKaku.variable} ${playfair.variable}`}>
        {children}
        <noscript>
          <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", color: "#e8e4df", padding: "40px 24px", overflowY: "auto", zIndex: 9999, fontFamily: "Georgia, 'Noto Sans JP', sans-serif" }}>
            <h1 style={{ fontStyle: "italic", fontSize: 32, color: "#f2ece2" }}>Landscapes of Japan</h1>
            <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7 }}>
              JavaScript is disabled. The interactive map and lightbox require JavaScript, but you can still browse our content directly:
            </p>
            <ul style={{ marginTop: 16, fontSize: 15, lineHeight: 2 }}>
              <li><a href={`/${lang}`} style={{ color: "#dcbe64" }}>Home (current language)</a></li>
              <li><a href={`/${lang}/blog`} style={{ color: "#dcbe64" }}>Blog — 20 photography guides</a></li>
              <li><a href={`/${lang}/collections/cherry-blossoms`} style={{ color: "#dcbe64" }}>Collections (Cherry Blossoms, Snow, Castles, ...)</a></li>
              <li><a href="/sitemap.xml" style={{ color: "#dcbe64" }}>Site map (all 13,000+ pages)</a></li>
              <li><a href="/feed.xml" style={{ color: "#dcbe64" }}>RSS feed (latest 50 photos)</a></li>
            </ul>
            <p style={{ marginTop: 24, fontSize: 13, color: "rgba(232,228,223,.6)" }}>
              For the full experience with interactive map and gallery, please enable JavaScript.
            </p>
          </div>
        </noscript>
        <Analytics />
      </body>
    </html>
  );
}
