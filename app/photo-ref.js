/**
 * 写真ID → 写真データ / URL の解決を1か所にまとめる。
 * ③お気に入り ④共有 ⑥関連 ⑦問い合わせ が同じ規則を使うための共通基盤。
 *
 * 写真詳細ページは PHOTO_LANGS の言語にしか存在しない。
 * 存在しない言語では「撮影地ページ + ?photo=ID」を返し、存在しないURLを作らない。
 */
import { PREFECTURES, getLocName, getPrefName } from "./data.js";
import { PREF_SLUGS, LOC_SLUGS } from "./slugs.js";
import { PHOTO_LANGS, SITE_URL } from "./i18n-meta.js";

/** id → { id, loc, year, pref } ちょうど1回だけ構築する */
let _byId = null;
export function photoById(id) {
  if (!_byId) {
    _byId = new Map();
    for (const pf of PREFECTURES) {
      for (const p of pf.photos) _byId.set(p.id, { ...p, pref: pf.pref });
    }
  }
  return _byId.get(id) || null;
}

export function allPhotos() {
  const out = [];
  for (const pf of PREFECTURES) for (const p of pf.photos) out.push({ ...p, pref: pf.pref });
  return out;
}

export const hasPhotoPages = (lang) => PHOTO_LANGS.includes(lang);

/**
 * その言語でその写真を開けるパスを返す。存在しない写真は null。
 * 写真詳細がある言語 → /{lang}/{pref}/{loc}/{id}
 * 無い言語         → /{lang}/{pref}/{loc}?photo={id}  (撮影地ページで開く)
 * 撮影地が未設定の写真は撮影地ページが無いので null。
 */
export function photoPath(id, lang) {
  const p = photoById(id);
  if (!p || !p.loc) return null;
  const prefSlug = PREF_SLUGS[p.pref];
  const locSlug = LOC_SLUGS[p.loc];
  if (!prefSlug || !locSlug) return null;
  const base = `/${lang}/${prefSlug}/${locSlug}`;
  return hasPhotoPages(lang) ? `${base}/${p.id}` : `${base}?photo=${encodeURIComponent(p.id)}`;
}

export function photoUrl(id, lang) {
  const path = photoPath(id, lang);
  return path ? SITE_URL + path : null;
}

/** 表示用の短いラベル (地名のみ。説明文は足さない) */
export function photoLabel(id, lang) {
  const p = photoById(id);
  if (!p) return "";
  const loc = p.loc ? getLocName(p.loc, lang) : "";
  const pref = getPrefName(p.pref, lang);
  return loc ? `${loc} — ${pref}` : pref;
}
