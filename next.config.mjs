/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 用の静的エクスポート設定
  // 全ページが out/ 配下に静的 HTML として書き出される
  output: "export",

  // <Image /> の最適化サーバーが使えない (静的のみ) — 既に cldUrl + <img> 直書きなので影響なし
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // 末尾スラッシュなし (Vercel と同じ挙動を Cloudflare でも維持)
  trailingSlash: false,

  // headers() は static export では無効 — CSP/security ヘッダは public/_headers に移行済
};

export default nextConfig;
