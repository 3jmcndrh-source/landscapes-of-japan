"use client";
/**
 * ③ お気に入り / 最近見た写真 のブラウザ内保存。
 *
 * - localStorage が使えない環境 (プライベートモード、保存無効、容量超過) でも
 *   例外を投げず、鑑賞と表示が壊れないようにする。
 * - 保存するのは写真IDだけ。画像そのものは保存しない。
 * - 言語に依存しないID を保存するので、言語を切り替えても重複しない。
 * - 壊れたデータ (JSON崩れ、配列でない、削除済みID) は読み出し時に捨てる。
 * - 端末間同期はしない。この端末のこのブラウザだけ。
 */
import { photoById } from "./photo-ref.js";

const FAV_KEY = "loj.fav.v1";
const HIST_KEY = "loj.hist.v1";
export const HISTORY_LIMIT = 60;

const canStore = () => {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const k = "__loj_probe";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch { return false; }
};

function read(key) {
  if (!canStore()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const v = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    /* 削除された写真IDはここで落とす。壊れた保存データを画面に出さない */
    return v.filter((x) => typeof x === "string" && photoById(x));
  } catch { return []; }
}

function write(key, list) {
  if (!canStore()) return false;
  try { window.localStorage.setItem(key, JSON.stringify(list)); return true; }
  catch { return false; }   // 容量超過などは黙って諦める (操作は壊さない)
}

/* ---- お気に入り ---- */
export const getFavorites = () => read(FAV_KEY);
export const isFavorite = (id) => read(FAV_KEY).includes(id);
export function toggleFavorite(id) {
  if (!photoById(id)) return { ok: false, on: false };
  const list = read(FAV_KEY);
  const i = list.indexOf(id);
  const next = i >= 0 ? list.filter((x) => x !== id) : [id, ...list];
  const ok = write(FAV_KEY, next);
  return { ok, on: i < 0 };
}
export const clearFavorites = () => write(FAV_KEY, []);

/* ---- 最近見た写真 ---- */
export const getHistory = () => read(HIST_KEY);
/**
 * 実際に開いて鑑賞した写真だけを渡すこと。
 * サムネイル表示・先読み・シアターの自動送りからは呼ばない。
 * 同じ写真の再閲覧は重複追加せず先頭へ移動する。
 */
export function pushHistory(id) {
  if (!photoById(id)) return false;
  const list = read(HIST_KEY).filter((x) => x !== id);
  return write(HIST_KEY, [id, ...list].slice(0, HISTORY_LIMIT));
}
export const clearHistory = () => write(HIST_KEY, []);

export const storageAvailable = canStore;
