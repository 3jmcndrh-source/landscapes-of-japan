/**
 * T5 シーズンバー: 12ヶ月を春夏秋冬グループで表示し、撮影実績のある月を点灯。
 * months は 1-12 の配列 (server 側で photo-months.js から計算して渡す —
 * クライアントバンドルに月マップを載せないため)。
 */

export const SEASONS = [
  { key: "spring", icon: "🌸", months: [3, 4, 5] },
  { key: "summer", icon: "☀", months: [6, 7, 8] },
  { key: "autumn", icon: "🍁", months: [9, 10, 11] },
  { key: "winter", icon: "❄", months: [12, 1, 2] },
];

/* 写真ページ対応 7言語 (ja,en,zh-tw,de,es,ar,ko) + zh。他言語は en フォールバック */
export const SEASON_LABELS = {
  spring: { ja: "春", en: "Spring", zh: "春", "zh-tw": "春", ko: "봄", de: "Frühling", es: "Primavera", ar: "الربيع" },
  summer: { ja: "夏", en: "Summer", zh: "夏", "zh-tw": "夏", ko: "여름", de: "Sommer", es: "Verano", ar: "الصيف" },
  autumn: { ja: "秋", en: "Autumn", zh: "秋", "zh-tw": "秋", ko: "가을", de: "Herbst", es: "Otoño", ar: "الخريف" },
  winter: { ja: "冬", en: "Winter", zh: "冬", "zh-tw": "冬", ko: "겨울", de: "Winter", es: "Invierno", ar: "الشتاء" },
};
export const seasonLabel = (key, lang) => SEASON_LABELS[key]?.[lang] || SEASON_LABELS[key]?.en || key;

const TITLE = { ja: "撮影シーズン", en: "Photo Seasons", zh: "拍摄季节", "zh-tw": "拍攝季節", ko: "촬영 시즌", de: "Foto-Saison", es: "Temporadas", ar: "مواسم التصوير" };

export default function SeasonBar({ months = [], lang = "en" }) {
  if (!months.length) return null;
  const lit = new Set(months);
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, padding: "12px 16px", background: "rgba(220,190,100,.06)", border: "1px solid rgba(220,190,100,.2)", borderRadius: 12 }}>
      <span style={{ fontFamily: "var(--font-zen-kaku),sans-serif", color: "rgba(220,190,100,.85)", fontSize: 11, fontWeight: 500, letterSpacing: ".05em" }}>
        {TITLE[lang] || TITLE.en}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, rowGap: 8 }}>
        {SEASONS.map((s) => {
          const active = s.months.some((m) => lit.has(m));
          return (
            <div key={s.key} title={seasonLabel(s.key, lang)} style={{ display: "flex", alignItems: "center", gap: 5, opacity: active ? 1 : 0.45 }}>
              <span aria-hidden="true" style={{ fontSize: 14, fontFamily: "Apple Color Emoji,Segoe UI Emoji,sans-serif", filter: active ? "none" : "grayscale(1)" }}>{s.icon}</span>
              <div style={{ display: "flex", gap: 3 }}>
                {s.months.map((m) => (
                  <span
                    key={m}
                    title={`${m}`}
                    style={{
                      fontFamily: "var(--font-zen-kaku),sans-serif",
                      fontSize: 10.5,
                      lineHeight: "18px",
                      minWidth: 19,
                      textAlign: "center",
                      borderRadius: 4,
                      letterSpacing: "0",
                      background: lit.has(m) ? "rgba(220,190,100,.22)" : "rgba(255,255,255,.04)",
                      border: lit.has(m) ? "1px solid rgba(220,190,100,.55)" : "1px solid rgba(255,255,255,.08)",
                      color: lit.has(m) ? "rgba(245,225,170,1)" : "rgba(232,228,223,.4)",
                      fontWeight: lit.has(m) ? 700 : 400,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
