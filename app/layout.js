import { Cormorant_Garamond, Noto_Sans_JP, Noto_Sans, Zen_Kaku_Gothic_New, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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

const SITE_URL = "https://landscapes-of-japan.vercel.app";
const OG_IMAGE = "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/DSC07601_cocitq.jpg";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Landscapes of Japan — 日本の風景写真ポートフォリオ",
  description: "北海道から沖縄まで、日本全国の風景写真を掲載。京都、鎌倉、知床、宮古島など18都道府県、380枚以上の写真を20言語対応で公開中。A cinematic photography portfolio showcasing landscapes across Japan.",
  keywords: ["日本", "風景写真", "ポートフォリオ", "Japan", "landscape photography", "portfolio", "京都", "北海道", "沖縄", "鎌倉", "知床", "宮古島", "travel", "nature", "Japanese landscapes"],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Landscapes of Japan — 日本の風景",
    description: "北海道から沖縄まで、日本全国の風景写真380枚以上を掲載。Cinematic photography portfolio of Japanese landscapes.",
    type: "website",
    url: SITE_URL,
    siteName: "Landscapes of Japan",
    locale: "ja_JP",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Landscapes of Japan — 日本の風景" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landscapes of Japan — 日本の風景",
    description: "北海道から沖縄まで、日本全国の風景写真380枚以上を掲載。",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${cormorant.variable} ${notoSansJP.variable} ${notoSans.variable} ${zenKaku.variable} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
