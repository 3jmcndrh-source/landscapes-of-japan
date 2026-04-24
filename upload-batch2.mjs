#!/usr/bin/env node
/**
 * バッチアップロード — 古墳・松本・諏訪 93枚
 */
import { v2 as cloudinary } from "cloudinary";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC1 = "C:/Users/3jmcn/Pictures/2025/20260412_古墳/書き出し";
const SRC2 = "C:/Users/3jmcn/Pictures/2025/20260413_諏訪湖/書き出し";

const BATCHES = [
  // === 4/12 古墳フォルダ ===
  { src: SRC1, pref: "長野県", loc: "弘法山古墳",       files: ["DSC01408_1","DSC01415_1","DSC01421","DSC01424","DSC01428","DSC01437","DSC01438_1","DSC01439","DSC01440","DSC01443","DSC01448"] },
  { src: SRC1, pref: "長野県", loc: "安養寺",           files: ["DSC01452","DSC01457","DSC01459","DSC01462","DSC01479","DSC01482"] },
  { src: SRC1, pref: "長野県", loc: "松本市新村",       files: ["DSC01488"] },
  { src: SRC1, pref: "長野県", loc: "城山公園(松本市)", files: ["DSC01492_1","DSC01495","DSC01500_1","DSC01501","DSC01509","DSC01510_1","DSC01512","DSC01518"] },
  { src: SRC1, pref: "長野県", loc: "中町通り(松本市)", files: ["DSC01529"] },
  { src: SRC1, pref: "長野県", loc: "高島公園(諏訪市)", files: ["DSC01536","DSC01540","DSC01544","DSC01545","DSC01551","DSC01553","DSC01560","DSC01569","DSC01571"] },
  { src: SRC1, pref: "長野県", loc: "諏訪湖",           files: ["DSC01577","DSC01578","DSC01579","DSC01581","DSC01582","DSC01583","DSC01585","DSC01586","DSC01588_1","DSC01589","DSC01595","DSC01596","DSC01601"] },
  { src: SRC1, pref: "長野県", loc: "立石公園",         files: ["DSC01610","DSC01613","DSC01614","DSC01619","DSC01620","DSC01622","DSC01623","DSC01625","DSC01626","DSC01628"] },
  // === 4/13 諏訪湖フォルダ ===
  { src: SRC2, pref: "長野県", loc: "諏訪湖",           files: ["DSC01635","DSC01637","DSC01638","DSC01639","DSC01642","DSC01643","DSC01645","DSC01648","DSC01649","DSC01650","DSC01651","DSC01654","DSC01656","DSC01657","DSC01658","DSC01659","DSC01660","DSC01662","DSC01664","DSC01665","DSC01666_1","DSC01669","DSC01670","DSC01675"] },
  { src: SRC2, pref: "長野県", loc: "立石公園",         files: ["DSC01676","DSC01678_1","DSC01680","DSC01682_1","DSC01685","DSC01689","DSC01692","DSC01695","DSC01696","DSC01697"] },
];

function loadEnv() {
  const envPath = resolve(__dirname, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const [k, ...rest] = t.split("=");
    if (!process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}
loadEnv();

cloudinary.config({
  cloud_name: "dr53c12fo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const total = BATCHES.reduce((s, b) => s + b.files.length, 0);
console.log(`=== ${total}枚アップロード開始 ===\n`);

let counter = 0;
const results = [];

for (const batch of BATCHES) {
  for (const fname of batch.files) {
    counter++;
    const fp = `${batch.src}/${fname}.jpg`;
    if (!existsSync(fp)) {
      console.log(`[${counter}/${total}] ✗ NOT FOUND: ${fname}.jpg`);
      continue;
    }
    process.stdout.write(`[${counter}/${total}] ${fname}.jpg → `);
    try {
      const r = await cloudinary.uploader.upload(fp, {
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
      });
      results.push({ id: r.public_id, loc: batch.loc });
      console.log(r.public_id);
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
}

console.log(`\n=== data.js 用エントリ (長野県 photos に追加) ===\n`);
for (const r of results) {
  console.log(`      { id: "${r.id}", loc: "${r.loc}", year: 2026 },`);
}
