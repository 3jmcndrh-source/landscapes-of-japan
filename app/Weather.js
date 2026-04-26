"use client";
import { useEffect, useState } from "react";

/**
 * 撮影地ライブ天気表示 (#16)
 * Open-Meteo無料API使用 — APIキー不要、無制限。
 * 訪問者が「この場所、今行ったらどう?」を即座に確認できる。
 * SEO: 「撮影地名 + 天気」検索で上位表示候補。
 *
 * - 現在 + 明日 + 明後日 の3段表示
 * - ラベルは左寄せ
 */
export default function Weather({ lat, lng, lang = "en" }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    let cancelled = false;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=Asia%2FTokyo`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => { if (!cancelled) setData(j); })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [lat, lng]);

  if (!data || !data.current) return null;

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
  const cur = data.current;
  const daily = data.daily || {};
  const dailyCodes = daily.weather_code || [];
  const dailyMax = daily.temperature_2m_max || [];
  const dailyMin = daily.temperature_2m_min || [];

  const labelStyle = { color: "rgba(220,190,100,.85)", fontSize: 11, fontWeight: 500, letterSpacing: ".05em", minWidth: 116 };
  const rowStyle = { display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-zen-kaku),sans-serif", fontSize: 13, color: "rgba(232,228,223,.85)" };
  const emojiStyle = { fontSize: 18, fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif" };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, padding: "12px 16px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 12 }}>
      {/* 現在 */}
      <div style={rowStyle}>
        <span style={labelStyle}>{isJa ? "現在の現地の天気" : "Now (local)"}</span>
        <span style={emojiStyle}>{emoji(cur.weather_code)}</span>
        <span>{wmo(cur.weather_code, lang)}</span>
        <span style={{ color: "rgba(220,190,100,.85)", fontWeight: 500 }}>{Math.round(cur.temperature_2m)}°C</span>
        <span style={{ color: "rgba(232,228,223,.5)", fontSize: 11 }}>
          {isJa ? "湿度" : "humidity"} {Math.round(cur.relative_humidity_2m)}% · {isJa ? "風" : "wind"} {Math.round(cur.wind_speed_10m)} km/h
        </span>
      </div>

      {/* 明日 (daily index 1) */}
      {dailyCodes[1] !== undefined && (
        <div style={rowStyle}>
          <span style={labelStyle}>{isJa ? "明日の現地の天気" : "Tomorrow (local)"}</span>
          <span style={emojiStyle}>{emoji(dailyCodes[1])}</span>
          <span>{wmo(dailyCodes[1], lang)}</span>
          <span style={{ color: "rgba(220,190,100,.85)", fontWeight: 500 }}>{Math.round(dailyMax[1])}° / {Math.round(dailyMin[1])}°</span>
        </div>
      )}

      {/* 明後日 (daily index 2) */}
      {dailyCodes[2] !== undefined && (
        <div style={rowStyle}>
          <span style={labelStyle}>{isJa ? "明後日の現地の天気" : "Day after (local)"}</span>
          <span style={emojiStyle}>{emoji(dailyCodes[2])}</span>
          <span>{wmo(dailyCodes[2], lang)}</span>
          <span style={{ color: "rgba(220,190,100,.85)", fontWeight: 500 }}>{Math.round(dailyMax[2])}° / {Math.round(dailyMin[2])}°</span>
        </div>
      )}
    </div>
  );
}
