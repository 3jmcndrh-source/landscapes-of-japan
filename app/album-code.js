/**
 * ⑥ 共有アルバムの符号化。
 *
 * 方針:
 *   新しいデータベースやアカウントを必須にしない。写真IDと並び順を
 *   版付きの共有URLに入れる。受け取った側はログインなしで開ける。
 *
 *   配列の位置ではなく「写真ID」を格納する。写真が増減しても参照先が
 *   変わらないようにするため。
 *
 * 形式:  a=1.<base64url(ID を \x1f で連結)>
 *   先頭の "1." は版。将来 形式を変えるときは版を上げ、
 *   古い版のURLも読めるようにする。
 *
 * 上限:
 *   URL の実用性のため 40枚まで。長すぎるURLは共有先で切られることがある。
 *   40枚 × 平均22文字 ≒ 900文字 → base64url で約1200文字。
 *   多くの環境で扱える範囲に収める。
 */
export const ALBUM_VERSION = "1";
export const ALBUM_MAX = 40;
const SEP = "";

const toB64Url = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const fromB64Url = (s) => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

/** 写真IDの配列 → 共有コード。重複は除き、上限で切る */
export function encodeAlbum(ids) {
  const uniq = [];
  for (const id of ids) if (typeof id === "string" && id && !uniq.includes(id)) uniq.push(id);
  const cut = uniq.slice(0, ALBUM_MAX);
  if (!cut.length) return "";
  try { return `${ALBUM_VERSION}.${toB64Url(cut.join(SEP))}`; }
  catch { return ""; }
}

/**
 * 共有コード → 写真IDの配列。
 * 壊れたデータ・重複・未知の版は安全に扱う (例外を投げず空を返す)。
 * 削除済み写真の除外は呼び出し側が photoById で行う
 * (ここは「URLに何が書かれていたか」だけを返す)。
 */
export function decodeAlbum(code) {
  if (typeof code !== "string" || !code) return { version: null, ids: [] };
  const dot = code.indexOf(".");
  if (dot < 0) return { version: null, ids: [] };
  const version = code.slice(0, dot);
  if (version !== ALBUM_VERSION) return { version, ids: [] };   /* 未知の版は読まない */
  try {
    const raw = fromB64Url(code.slice(dot + 1));
    const out = [];
    for (const id of raw.split(SEP)) {
      if (!id) continue;
      if (!/^[A-Za-z0-9_.-]+$/.test(id)) continue;   /* 写真IDとして不正な形は捨てる */
      if (!out.includes(id)) out.push(id);
      if (out.length >= ALBUM_MAX) break;
    }
    return { version, ids: out };
  } catch {
    return { version, ids: [] };
  }
}

export const albumHref = (lang, ids) => {
  const code = encodeAlbum(ids);
  return code ? `/${lang}/album?a=${encodeURIComponent(code)}` : `/${lang}/album`;
};
