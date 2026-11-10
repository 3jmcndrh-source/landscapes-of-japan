#!/usr/bin/env node
/**
 * 広色域の原本が、配信画像まで広色域のまま届くかを確かめる。
 *
 *   node scripts/check-wide-gamut.mjs
 *
 * Display P3 のプロファイルを付けた試験画像を作り、配信用と同じ変換にかけて、
 *   - 広色域の原本 → 出力に同じプロファイルが残り、画素の値も変わらない
 *   - sRGB の原本   → 出力にプロファイルが付かない (従来どおり)
 * を確かめる。実際の写真や原本庫には触れない。
 */
import sharp from "sharp";
import { wideGamutOf, keepColor, iccDescription } from "./lib/wide-gamut.mjs";

const fail = (m) => { console.error("✗ " + m); process.exitCode = 1; };
/* 保存されている値そのものを読む (ignoreIcc)。色管理を通すと sRGB に直された値が返り、
   「sRGB に変換されてしまった出力」と「P3 のまま残った出力」の区別が付かない */
const px = async (buf) => [...(await sharp(buf, { ignoreIcc: true }).raw().toBuffer()).subarray(0, 3)];
const variant = async (input) =>
  keepColor(sharp(input, { failOn: "none" }).rotate().resize({ width: 32, withoutEnlargement: true }), await wideGamutOf(input))
    .webp({ quality: 100, lossless: true }).toBuffer();

/* sRGB の (200,50,50) を Display P3 に変換して P3 のプロファイルを付けた原本 */
const base = { create: { width: 64, height: 64, channels: 3, background: { r: 200, g: 50, b: 50 } } };
const p3 = await sharp(base).withIccProfile("p3").jpeg({ quality: 100, chromaSubsampling: "4:4:4" }).toBuffer();
const srgb = await sharp(base).jpeg({ quality: 100, chromaSubsampling: "4:4:4" }).toBuffer();

const p3In = await px(p3);
const p3Desc = await wideGamutOf(p3);
console.log(`P3 の原本:   プロファイル「${p3Desc}」 保存値 ${p3In}`);
if (!p3Desc) fail("P3 の原本を広色域と判定できていない");
/* 試験として成り立っているか: P3 での保存値は sRGB の (200,50,50) と違うはず */
if (Math.abs(p3In[0] - 200) < 5 && Math.abs(p3In[1] - 50) < 5) fail("試験画像が P3 の値になっていない (試験が成立していない)");

const out = await variant(p3);
const outMeta = await sharp(out).metadata();
const outDesc = outMeta.icc ? iccDescription(outMeta.icc) : "";
const outPx = await px(out);
console.log(`→ 配信画像:  プロファイル「${outDesc || "なし"}」 保存値 ${outPx}`);
if (!outDesc || /srgb/i.test(outDesc)) fail("配信画像に広色域のプロファイルが残っていない");
if (outPx.some((v, i) => Math.abs(v - p3In[i]) > 2)) fail("配信画像の画素が原本から変わっている (sRGB に変換されている)");

const sOut = await variant(srgb);
const sMeta = await sharp(sOut).metadata();
console.log(`sRGB の原本 → 配信画像: プロファイル「${sMeta.icc ? iccDescription(sMeta.icc) : "なし"}」 保存値 ${await px(sOut)}`);
if (sMeta.icc) fail("sRGB の原本なのにプロファイルが付いた (既存の写真の出力が変わってしまう)");
if (await wideGamutOf(srgb)) fail("sRGB の原本を広色域と判定している");

console.log(process.exitCode ? "\n広色域の確認: 失敗" : "\n広色域の確認: 問題なし");
