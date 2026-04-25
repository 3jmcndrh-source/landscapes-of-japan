import { ImageResponse } from "next/og";
import { PREFECTURES, getPrefName, getLocName } from "../../../data.js";
import { prefFromSlug, locFromSlug } from "../../../slugs.js";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Landscapes of Japan";

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
  return "Noto Sans";
}

const UNSAFE_SCRIPTS = new Set(["ar"]);
const BRAND = "Landscapes of Japan";

export default async function Image({ params }) {
  const { lang, pref, loc } = await params;
  const prefJp = prefFromSlug(pref);
  const locJp = locFromSlug(loc);
  if (!prefJp || !locJp) {
    return new Response("Not found", { status: 404 });
  }

  const unsafe = UNSAFE_SCRIPTS.has(lang);
  const labelLang = unsafe ? "en" : lang;
  const locLocal = getLocName(locJp, labelLang);
  const prefLocal = getPrefName(prefJp, labelLang);

  // BGには該当loc の最初の写真
  const pf = PREFECTURES.find((p) => p.pref === prefJp);
  const photo = pf?.photos.find((p) => p.loc === locJp);
  const bgUrl = photo
    ? `https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/${encodeURIComponent(photo.id)}.jpg`
    : "https://res.cloudinary.com/dr53c12fo/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/DSC07601_cocitq.jpg";

  const bodyFamily = pickBodyFamily(labelLang);
  const fontText = `${locLocal}${prefLocal}${BRAND}`;
  const [brandFont, bodyFont] = await Promise.all([
    loadFont("Playfair Display", BRAND, { weight: 700, italic: true }),
    loadFont(bodyFamily, fontText, { weight: 500 }),
  ]);

  const fonts = [];
  if (brandFont) fonts.push({ name: "PlayfairDisplay", data: brandFont, style: "italic", weight: 700 });
  if (bodyFont) fonts.push({ name: "Body", data: bodyFont, style: "normal", weight: 500 });

  const dir = lang === "ar" && !unsafe ? "rtl" : "ltr";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", backgroundColor: "#0a0a0a", position: "relative", direction: dir }}>
        <img src={bgUrl} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover", filter: "brightness(0.55) saturate(1.1)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(10,10,10,0.85) 100%)" }} />
        <div style={{ display: "flex", flexDirection: "column", padding: "0 72px 64px", position: "relative" }}>
          <div style={{ fontFamily: "Body", fontSize: 22, color: "rgba(220,190,100,0.85)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
            {prefLocal}
          </div>
          <div style={{ fontFamily: "Body", fontWeight: 500, fontSize: 64, color: "#f2ece2", lineHeight: 1.1, letterSpacing: "0.01em", marginBottom: 22, maxWidth: 1050 }}>
            {locLocal}
          </div>
          <div style={{ fontFamily: "PlayfairDisplay", fontStyle: "italic", fontWeight: 700, fontSize: 28, color: "rgba(232,228,223,0.78)", letterSpacing: "0.02em" }}>
            {BRAND}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
