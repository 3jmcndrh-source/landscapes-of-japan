import { Cormorant_Garamond, Noto_Sans_JP, Noto_Sans, Yuji_Boku } from "next/font/google";
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

const yujiBoku = Yuji_Boku({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yuji-boku",
  display: "swap",
});

export const metadata = {
  title: "Landscapes of Japan — 日本の風景",
  description: "A cinematic photography portfolio showcasing the landscapes of Japan. 日本の風景写真ポートフォリオ。",
  openGraph: {
    title: "Landscapes of Japan",
    description: "Cinematic photography portfolio of Japanese landscapes",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${cormorant.variable} ${notoSansJP.variable} ${notoSans.variable} ${yujiBoku.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
