/**
 * Landscapes of Japan — Service Worker
 *
 * Strategy: stale-while-revalidate for HTML, cache-first for static assets.
 * - HTML pages: return cached version immediately if present, refresh in background.
 *   On full network failure, fall back to whatever's cached.
 * - JS/CSS/fonts/icons (/_next/static/ + standard extensions): cache-first.
 *   Versioned filenames mean cache hits are always safe.
 * - Cross-origin (Cloudinary, fonts.googleapis.com): not intercepted —
 *   their own CDN caching is already optimal.
 *
 * Cache names are versioned (-v1) so a future SW deployment can drop them.
 */

const HTML_CACHE = "loj-html-v1";
const STATIC_CACHE = "loj-static-v1";
const ALL_CACHES = [HTML_CACHE, STATIC_CACHE];

self.addEventListener("install", () => {
  // Take control immediately on first install / new SW.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Clean any unknown cache names left by prior SW versions.
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !ALL_CACHES.includes(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Same-origin only — let Cloudinary/Google Fonts handle their own caching.
  if (url.origin !== self.location.origin) return;

  // Static assets: cache-first.
  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:css|js|woff2?|ttf|otf|svg|ico|webp|avif|jpg|jpeg|png|gif)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        } catch (_) {
          return cached || new Response("", { status: 504 });
        }
      })()
    );
    return;
  }

  // HTML & everything else: stale-while-revalidate.
  const isNavigate = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  if (isNavigate) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(HTML_CACHE);
        const cached = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })()
    );
  }
});
