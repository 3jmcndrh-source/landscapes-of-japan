/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "img-src 'self' res.cloudinary.com images.unsplash.com data:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com www.clarity.ms",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "font-src fonts.gstatic.com",
      "connect-src 'self' formspree.io raw.githubusercontent.com api.open-meteo.com va.vercel-scripts.com vitals.vercel-insights.com *.clarity.ms c.bing.com",
      "frame-ancestors 'none'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
