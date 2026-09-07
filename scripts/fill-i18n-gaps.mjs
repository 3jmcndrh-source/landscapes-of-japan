#!/usr/bin/env node
/**
 * 既存データの言語欠落を埋める一度きりの補修。
 *
 *   1. app/seasons.js の SEASON_LABELS  8言語 → 25言語
 *      (写真ページの「他の季節」・コレクションの季節チップ・⑦の概念語が使う)
 *   2. app/collections.js の name       20言語 → 25言語
 *      (fa/he/bn/tl/uk が英語表示のままだった)
 *
 * 追加するのは name だけ。desc / guide の長文は英語フォールバックのままにする
 * (訳を捏造しない)。既にある訳は書き換えない。
 */
import { readFileSync, writeFileSync } from "node:fs";

const SEASON_ADD = {
  spring: { fr: "Printemps", pt: "Primavera", it: "Primavera", ru: "Весна", hi: "वसंत", th: "ฤดูใบไม้ผลิ", vi: "Mùa xuân", id: "Musim semi", tr: "İlkbahar", nl: "Lente", pl: "Wiosna", sv: "Vår", fa: "بهار", he: "אביב", bn: "বসন্ত", tl: "Tagsibol", uk: "Весна" },
  summer: { fr: "Été", pt: "Verão", it: "Estate", ru: "Лето", hi: "ग्रीष्म", th: "ฤดูร้อน", vi: "Mùa hè", id: "Musim panas", tr: "Yaz", nl: "Zomer", pl: "Lato", sv: "Sommar", fa: "تابستان", he: "קיץ", bn: "গ্রীষ্ম", tl: "Tag-init", uk: "Літо" },
  autumn: { fr: "Automne", pt: "Outono", it: "Autunno", ru: "Осень", hi: "शरद", th: "ฤดูใบไม้ร่วง", vi: "Mùa thu", id: "Musim gugur", tr: "Sonbahar", nl: "Herfst", pl: "Jesień", sv: "Höst", fa: "پاییز", he: "סתיו", bn: "শরৎ", tl: "Taglagas", uk: "Осінь" },
  winter: { fr: "Hiver", pt: "Inverno", it: "Inverno", ru: "Зима", hi: "शीत", th: "ฤดูหนาว", vi: "Mùa đông", id: "Musim dingin", tr: "Kış", nl: "Winter", pl: "Zima", sv: "Vinter", fa: "زمستان", he: "חורף", bn: "শীত", tl: "Taglamig", uk: "Зима" },
};

const COLLECTION_ADD = {
  "cherry-blossoms": { fa: "شکوفه‌های گیلاس", he: "פריחת הדובדבן", bn: "চেরি ফুল", tl: "Bulaklak ng Cherry", uk: "Цвітіння сакури" },
  "autumn-foliage": { fa: "برگ‌های پاییزی", he: "שלכת הסתיו", bn: "শরতের পাতা", tl: "Dahon ng Taglagas", uk: "Осіннє листя" },
  "snow": { fa: "مناظر برفی", he: "נופי שלג", bn: "তুষার দৃশ্য", tl: "Tanawing Niyebe", uk: "Засніжені краєвиди" },
  "castles": { fa: "قلعه‌ها", he: "טירות", bn: "দুর্গ", tl: "Mga Kastilyo", uk: "Замки" },
  "temples-shrines": { fa: "معابد و زیارتگاه‌ها", he: "מקדשים ומקדשי שינטו", bn: "মন্দির ও উপাসনালয়", tl: "Mga Templo at Dambana", uk: "Храми та святині" },
  "hot-springs": { fa: "چشمه‌های آب گرم", he: "מעיינות חמים", bn: "উষ্ণ প্রস্রবণ", tl: "Mainit na Bukal", uk: "Гарячі джерела" },
  "coastal": { fa: "سواحل", he: "חופים", bn: "সমুদ্রতট", tl: "Baybayin", uk: "Узбережжя" },
  "night-views": { fa: "مناظر شبانه", he: "נופי לילה", bn: "রাতের দৃশ্য", tl: "Tanawin sa Gabi", uk: "Нічні краєвиди" },
  "waterfalls": { fa: "آبشارها", he: "מפלים", bn: "জলপ্রপাত", tl: "Mga Talon", uk: "Водоспади" },
  "lakes": { fa: "دریاچه‌ها", he: "אגמים", bn: "হ্রদ", tl: "Mga Lawa", uk: "Озера" },
  "birds": { fa: "پرندگان", he: "ציפורים", bn: "পাখি", tl: "Mga Ibon", uk: "Птахи" },
  "animals": { fa: "حیوانات", he: "חיות", bn: "প্রাণী", tl: "Mga Hayop", uk: "Тварини" },
};

/* ---- 1. seasons.js ---- */
{
  const f = "app/seasons.js";
  let src = readFileSync(f, "utf-8");
  let n = 0;
  for (const [key, add] of Object.entries(SEASON_ADD)) {
    const re = new RegExp(`(  ${key}: \\{)([^}]*)(\\},)`);
    const m = src.match(re);
    if (!m) throw new Error(`seasons.js: ${key} が見つからない`);
    const extra = Object.entries(add)
      .filter(([l]) => !new RegExp(`\\b${l}:`).test(m[2]))
      .map(([l, v]) => `${l}: ${JSON.stringify(v)}`)
      .join(", ");
    if (!extra) continue;
    n += Object.keys(add).length;
    /* 既存の並びが「, 」で終わっているかで区切りを変える (壊れた JS を書かない) */
    const sep = /,\s*$/.test(m[2]) ? "" : ", ";
    src = src.replace(re, `$1$2${sep}${extra} $3`);
  }
  src = src.replace(
    "/* 写真ページ対応 7言語 (ja,en,zh-tw,de,es,ar,ko) + zh。他言語は en フォールバック */",
    "/* 25言語すべて。2026-09-08 に不足17言語を補った (⑦の概念語でも使う) */"
  );
  writeFileSync(f, src, "utf-8");
  console.log(`seasons.js: ${n} 語を追加`);
}

/* ---- 2. collections.js の name ---- */
{
  const f = "app/collections.js";
  let src = readFileSync(f, "utf-8");
  let n = 0;
  for (const [slug, add] of Object.entries(COLLECTION_ADD)) {
    /* そのコレクションの name ブロックだけを対象にする */
    const head = src.indexOf(`"${slug}": {`);
    if (head < 0) throw new Error(`collections.js: ${slug} が見つからない`);
    const nameAt = src.indexOf("name: {", head);
    const nameEnd = src.indexOf("},", nameAt);
    if (nameAt < 0 || nameEnd < 0) throw new Error(`collections.js: ${slug} の name が見つからない`);
    const block = src.slice(nameAt, nameEnd);
    const extra = Object.entries(add)
      .filter(([l]) => !new RegExp(`\\b${l}:`).test(block))
      .map(([l, v]) => `\n      ${l}: ${JSON.stringify(v)},`)
      .join("");
    if (!extra) continue;
    n += Object.keys(add).length;
    src = src.slice(0, nameEnd) + extra + "\n    " + src.slice(nameEnd);
  }
  writeFileSync(f, src, "utf-8");
  console.log(`collections.js: ${n} 語を追加`);
}
