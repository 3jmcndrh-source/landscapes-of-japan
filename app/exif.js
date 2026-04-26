/**
 * 自動生成 — Cloudinary Admin APIから取得したEXIFメタデータ
 * Generated: 2026-04-25T07:29:27.784Z
 * 更新: node fetch-exif.mjs
 */
export const EXIF = {};

export function getExif(photoId) {
  return EXIF[photoId] || null;
}

// EXIF値を人間に読める形式に
export function formatFNumber(raw) {
  if (!raw) return null;
  if (typeof raw === "string" && raw.includes("/")) {
    const [n, d] = raw.split("/").map(Number);
    return d ? `f/${(n / d).toFixed(1).replace(/\.0$/, "")}` : null;
  }
  return `f/${raw}`;
}

export function formatFocalLength(raw) {
  if (!raw) return null;
  if (typeof raw === "string" && raw.includes("/")) {
    const [n, d] = raw.split("/").map(Number);
    return d ? `${Math.round(n / d)}mm` : null;
  }
  return `${raw}mm`;
}

export function formatExposure(raw) {
  if (!raw) return null;
  return raw;
}

export function formatIso(raw) {
  if (!raw) return null;
  return `ISO ${raw}`;
}
