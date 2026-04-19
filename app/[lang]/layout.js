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
      <body className={`${cormorant.variable} ${notoSansJP.variable} ${notoSans.variable} ${zenKaku.variable} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
