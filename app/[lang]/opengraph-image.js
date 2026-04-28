import { ImageResponse } from "next/og";
import { SEO_META } from "../i18n-meta.js";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Landscapes of Japan — Japanese Landscape Photography Portfolio";

async function loadFont(family, text, { weight = 400, italic = false } = {}) {
  try {
    const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axis}&text=${encodeURIComponent(text)}&display=swap`;
    const css = await (await fetch(url)).text();
    const m = css.match(/src:\s*url\((.+?)\)\s*format/);
    if (!m) return null;
    return await (await fetch(m[1])).arrayBuffer();
  } catch {
    return null;
  }
}

function pickBodyFamily(lang) {
  if (lang === "ja") return "Noto Sans JP";
  if (lang === "zh") return "Noto Sans SC";
  if (lang === "zh-tw") return "Noto Sans TC";
  if (lang === "ko") return "Noto Sans KR";
  if (lang === "hi") return "Noto Sans Devanagari";
  if (lang === "th") return "Noto Sans Thai";
  if (lang === "bn") return "Noto Sans Bengali";
  return "Noto Sans"; // Latin/Cyrillic/Vietnamese (incl. uk, tl)
}

// Satori can't render complex shaping (lookupType:5 substFormat:3) for these scripts —
// fall back to English subtitle. Includes Arabic-script and Hebrew.
const UNSAFE_SCRIPTS = new Set(["ar", "fa", "he"]);

const BG_URL = "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/DSC07601_cocitq.jpg";
const BRAND = "Landscapes of Japan";

export default async function Image({ params }) {
  const { lang } = await params;
  const unsafe = UNSAFE_SCRIPTS.has(lang);
  const meta = SEO_META[unsafe ? "en" : lang] || SEO_META.en;
  let tagline = meta.title;
  const parts = tagline.split(" — ");
  if (parts[0] === BRAND && parts[1]) tagline = parts[1];

  const bodyFamily = pickBodyFamily(unsafe ? "en" : lang);
  const [brandFont, bodyFont] = await Promise.all([
    loadFont("Playfair Display", BRAND, { weight: 700, italic: true }),
    loadFont(bodyFamily, tagline + BRAND, { weight: 500 }),
  ]);

  const fonts = [];
  if (brandFont) fonts.push({ name: "PlayfairDisplay", data: brandFont, style: "italic", weight: 700 });
  if (bodyFont) fonts.push({ name: "Body", data: bodyFont, style: "normal", weight: 500 });

  // RTL only when we actually render the language's text (not when fallback to English)
  const dir = !unsafe && (lang === "ar" || lang === "fa" || lang === "he") ? "rtl" : "ltr";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0a0a0a",
          position: "relative",
          direction: dir,
        }}
      >
        <img
          src={BG_URL}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            filter: "brightness(0.55) saturate(1.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(10,10,10,0.8) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 72px 72px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "PlayfairDisplay",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 84,
              color: "#f2ece2",
              lineHeight: 1,
              letterSpacing: "0.01em",
              marginBottom: 18,
            }}
          >
            {BRAND}
          </div>
          <div
            style={{
              fontFamily: "Body",
              fontWeight: 500,
              fontSize: 36,
              color: "rgba(232,228,223,0.92)",
              lineHeight: 1.25,
              letterSpacing: "0.02em",
              maxWidth: 1050,
              marginBottom: 26,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontFamily: "Body",
              fontSize: 18,
              color: "rgba(220,190,100,0.8)",
              letterSpacing: "0.25em",
            }}
          >
            LANDSCAPES-OF-JAPAN.VERCEL.APP
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
