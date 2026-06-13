"use client";
import { useEffect, useState } from "react";
import { sunTimes } from "./sun.js";

/**
 * T6: 今日の日の出/日の入り/ゴールデンアワー帯 (loc ページ、Weather 横)。
 * 日付依存なので SSG とのミスマッチを避けるため client mount 後に計算。
 */

const L = {
  sunrise: { ja: "日の出", en: "Sunrise", zh: "日出", "zh-tw": "日出", ko: "일출", de: "Sonnenaufgang", es: "Amanecer", ar: "الشروق" },
  sunset: { ja: "日の入り", en: "Sunset", zh: "日落", "zh-tw": "日落", ko: "일몰", de: "Sonnenuntergang", es: "Atardecer", ar: "الغروب" },
  golden: { ja: "ゴールデンアワー", en: "Golden hour", zh: "黄金时刻", "zh-tw": "黃金時刻", ko: "골든아워", de: "Goldene Stunde", es: "Hora dorada", ar: "الساعة الذهبية" },
};
const pick = (m, lang) => m[lang] || m.en;

export default function SunTimes({ lat, lng, lang = "en" }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    if (lat && lng) setT(sunTimes(lat, lng));
  }, [lat, lng]);
  if (!t || !t.sunrise || !t.sunset) return null;

  const labelStyle = { color: "rgba(220,190,100,.85)", fontSize: 11, fontWeight: 500, letterSpacing: ".05em", minWidth: 64 };
  const rowStyle = { display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(232,228,223,.85)" };
  const emojiStyle = { fontSize: 16, fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" };
  const ghStyle = { color: "rgba(232,212,148,.9)", fontSize: 11.5 };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, padding: "12px 16px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 12 }}>
      <div style={rowStyle}>
        <span style={emojiStyle}>🌅</span>
        <span style={labelStyle}>{pick(L.sunrise, lang)}</span>
        <span style={{ fontWeight: 700, color: "#f2ece2" }}>{t.sunrise}</span>
        {t.goldenEndAM && (
          <span style={ghStyle}>{pick(L.golden, lang)} {t.sunrise}–{t.goldenEndAM}</span>
        )}
      </div>
      <div style={rowStyle}>
        <span style={emojiStyle}>🌇</span>
        <span style={labelStyle}>{pick(L.sunset, lang)}</span>
        <span style={{ fontWeight: 700, color: "#f2ece2" }}>{t.sunset}</span>
        {t.goldenStartPM && (
          <span style={ghStyle}>{pick(L.golden, lang)} {t.goldenStartPM}–{t.sunset}</span>
        )}
      </div>
    </div>
  );
}
