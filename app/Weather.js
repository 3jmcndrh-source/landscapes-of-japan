"use client";
import { useEffect, useState } from "react";

/**
 * 撮影地ライブ天気表示 (#16)
 * Open-Meteo無料API使用 — APIキー不要、無制限。
 * 訪問者が「この場所、今行ったらどう?」を即座に確認できる。
 * SEO: 「撮影地名 + 天気」検索で上位表示候補。
 */
export default function Weather({ lat, lng, lang = "en" }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    let cancelled = false;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia%2FTokyo`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => { if (!cancelled) setData(j.current); })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [lat, lng]);

  if (!data) return null;

  // WMO weather code → emoji + label
  const wmo = (code, lang) => {
    const j = lang === "ja";
    const map = {
      0:  { ja: "快晴", en: "Clear" },
      1:  { ja: "晴れ", en: "Mostly clear" },
      2:  { ja: "晴れ時々曇り", en: "Partly cloudy" },
      3:  { ja: "曇り", en: "Overcast" },
      45: { ja: "霧", en: "Fog" },
      48: { ja: "霧 (着氷)", en: "Rime fog" },
      51: { ja: "弱い霧雨", en: "Light drizzle" },
      53: { ja: "霧雨", en: "Drizzle" },
      55: { ja: "強い霧雨", en: "Heavy drizzle" },
      61: { ja: "弱い雨", en: "Light rain" },
      63: { ja: "雨", en: "Rain" },
      65: { ja: "強い雨", en: "Heavy rain" },
      71: { ja: "弱い雪", en: "Light snow" },
      73: { ja: "雪", en: "Snow" },
      75: { ja: "大雪", en: "Heavy snow" },
      77: { ja: "霰", en: "Snow grains" },
      80: { ja: "弱いにわか雨", en: "Light showers" },
      81: { ja: "にわか雨", en: "Showers" },
      82: { ja: "強いにわか雨", en: "Heavy showers" },
      85: { ja: "弱いにわか雪", en: "Light snow showers" },
      86: { ja: "強いにわか雪", en: "Heavy snow showers" },
      95: { ja: "雷雨", en: "Thunderstorm" },
      96: { ja: "雷雨 (霰)", en: "Thunderstorm with hail" },
      99: { ja: "強い雷雨 (霰)", en: "Strong thunderstorm" },
    };
    return map[code]?.[j ? "ja" : "en"] || (j ? "不明" : "Unknown");
  };

  const emoji = (code) => {
    if (code === 0) return "☀";
    if (code === 1 || code === 2) return "🌤";
    if (code === 3) return "☁";
    if (code === 45 || code === 48) return "🌫";
    if (code >= 51 && code <= 65) return "🌧";
    if (code >= 71 && code <= 86) return "❄";
    if (code >= 95) return "⛈";
    return "·";
  };

  const isJa = lang === "ja";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "8px 16px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 999, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(232,228,223,.85)" }}>
      <span style={{ fontSize: 18, fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" }}>{emoji(data.weather_code)}</span>
      <span>{wmo(data.weather_code, lang)}</span>
      <span style={{ color: "rgba(220,190,100,.85)", fontWeight: 500 }}>{Math.round(data.temperature_2m)}°C</span>
      <span style={{ color: "rgba(232,228,223,.5)", fontSize: 11 }}>
        {isJa ? "湿度" : "humidity"} {Math.round(data.relative_humidity_2m)}% · {isJa ? "風" : "wind"} {Math.round(data.wind_speed_10m)} km/h
      </span>
      <span style={{ color: "rgba(232,228,223,.4)", fontSize: 10, marginLeft: "auto" }}>
        {isJa ? "現在の天気" : "Now"}
      </span>
    </div>
  );
}
