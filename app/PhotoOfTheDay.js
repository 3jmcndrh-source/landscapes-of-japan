"use client";
import { useState, useEffect } from "react";
import { PREFECTURES, cldUrl, getPrefName, getLocName } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { photoLang } from "./i18n-meta.js";
import { ambient } from "./photo-colors.js";

/**
 * T9 今日の一枚: JST の日付文字列を djb2 ハッシュ → 全写真から決定的に1枚選出。
 * 日付依存なので SSG ミスマッチを避けるため client mount 後に計算・表示。
 */

const LABEL = {
  ja: "今日の一枚", en: "Photo of the Day", zh: "今日一图", "zh-tw": "今日一圖",
  ko: "오늘의 한 장", de: "Foto des Tages", es: "Foto del día", ar: "صورة اليوم",
};

export default function PhotoOfTheDay({ lang }) {
  const [pick, setPick] = useState(null);
  useEffect(() => {
    const all = [];
    PREFECTURES.forEach((pf) =>
      pf.photos.forEach((p) => {
        if (p.loc && PREF_SLUGS[pf.pref] && LOC_SLUGS[p.loc]) all.push({ ...p, pref: pf.pref });
      })
    );
    if (!all.length) return;
    const day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // JST
    let h = 5381;
    for (let i = 0; i < day.length; i++) h = (Math.imul(h, 33) ^ day.charCodeAt(i)) >>> 0;
    setPick(all[h % all.length]);
  }, []);

  if (!pick) return null;
  const href = `/${photoLang(lang)}/${PREF_SLUGS[pick.pref]}/${LOC_SLUGS[pick.loc]}/${pick.id}`;
  const amb = ambient(pick.id, 0.12);

  return (
    <div className="potd-wrap">
      <a
        href={href}
        className="potd-card"
        style={amb ? { background: `radial-gradient(120% 150% at 0% 50%, ${amb}, transparent 70%) rgba(255,255,255,.025)` } : undefined}
        onContextMenu={(e) => e.preventDefault()}
      >
        <img src={cldUrl(pick.id, 600)} alt={`${getLocName(pick.loc, lang)} - ${getPrefName(pick.pref, lang)}`} loading="lazy" decoding="async" draggable="false" />
        <span className="potd-text">
          <span className="potd-label">{LABEL[lang] || LABEL.en}</span>
          <span className="potd-loc">{getLocName(pick.loc, lang)}</span>
          <span className="potd-sub">
            {getPrefName(pick.pref, lang)}
            {pick.year ? <span className="potd-year">{pick.year}</span> : null}
          </span>
        </span>
        <span className="potd-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
