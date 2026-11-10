/**
 * 広色域 (Display P3 など) で書き出した写真の色を、配信画像まで残すための共通処理。
 * scripts/generate-variants.mjs と upload.mjs の両方がこれを使う。
 *
 * sharp は何も指定しないと、画素を sRGB に変換してから色プロファイルを外して出力する。
 * 原本が Display P3 でも、配信画像は sRGB に収まる色しか持たなくなる
 * (海の青緑や紅葉の朱の、いちばん鮮やかな部分が削られる)。
 * keepIccProfile() を付けると、原本のプロファイルと画素をそのまま出力に残す。
 * P3 対応の画面 (iPhone・Mac・最近の Android) では、その分の色が出る。
 * sRGB の画面ではブラウザがプロファイルを見て sRGB に直すので、色がずれることはない。
 *
 * 原本が sRGB のときは従来どおり (プロファイルを付けない)。
 * 付けても見た目は変わらず、1ファイルあたり数百バイト〜3KB 増えるだけなので。
 * つまり、いま載っている写真の配信画像は1枚も変わらない。
 * 効くのは「Capture One の書き出しを Display P3 にした写真」を追加・再生成したときだけ。
 *
 * ぼかした下地 (_w40b) には付けない。数百バイトの画像にプロファイルを足すと倍以上になる。
 */
import sharp from "sharp";

/** ICC プロファイルの説明文 (例: "Display P3", "sRGB IEC61966-2.1")。読めなければ "" */
export function iccDescription(icc) {
  try {
    if (!icc || icc.length < 132) return "";
    const n = icc.readUInt32BE(128);
    for (let i = 0; i < n; i++) {
      const at = 132 + i * 12;
      if (at + 12 > icc.length) break;
      if (icc.toString("latin1", at, at + 4) !== "desc") continue;
      const off = icc.readUInt32BE(at + 4), size = icc.readUInt32BE(at + 8);
      if (off + size > icc.length || size < 12) return "";
      const type = icc.toString("latin1", off, off + 4);
      if (type === "desc") {                       /* ICC v2: ASCII */
        const len = icc.readUInt32BE(off + 8);
        return icc.toString("latin1", off + 12, off + 12 + Math.max(0, len - 1)).trim();
      }
      if (type === "mluc") {                       /* ICC v4: UTF-16BE の多言語文字列。最初の1件を読む */
        const recs = icc.readUInt32BE(off + 8);
        if (!recs) return "";
        const len = icc.readUInt32BE(off + 20), so = icc.readUInt32BE(off + 24);
        const buf = Buffer.from(icc.subarray(off + so, off + so + len));
        buf.swap16();
        return buf.toString("utf16le").replace(/\0+$/, "").trim();
      }
      return "";
    }
  } catch { /* 壊れたプロファイルは「不明」として扱う */ }
  return "";
}

/**
 * 原本が sRGB より広い色域のプロファイルを持っていれば、その説明文を返す。
 * プロファイルが無い・sRGB・読めない ときは null (= 従来どおり sRGB で出す)。
 */
export async function wideGamutOf(input) {
  try {
    const meta = await sharp(input, { failOn: "none" }).metadata();
    if (!meta.icc) return null;
    const desc = iccDescription(meta.icc);
    if (!desc || /srgb/i.test(desc)) return null;
    return desc;
  } catch { return null; }
}

/** 配信画像の変換。wide が真のときだけ原本のプロファイルを残す */
export const keepColor = (pipeline, wide) => (wide ? pipeline.keepIccProfile() : pipeline);
