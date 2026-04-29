#!/usr/bin/env node
/**
 * Landscapes of Japan — 写真アップロードツール
 *
 * 使い方:
 *   node upload.mjs <写真パス> --pref 京都府 --loc 清水寺
 *   node upload.mjs photo1.jpg photo2.jpg --pref 兵庫県 --loc 姫路城
 *
 * 初回のみ .env ファイルを作成:
 *   CLOUDINARY_API_KEY=あなたのAPIキー
 *   CLOUDINARY_API_SECRET=あなたのAPIシークレット
 */

import { v2 as cloudinary } from "cloudinary";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLOUD_NAME = "dr53c12fo";
const PAGE_JS = resolve(__dirname, "app", "data.js");

const PREF_COORDS = {
  "北海道": [43.06, 141.35], "青森県": [40.82, 140.74], "岩手県": [39.70, 141.15],
  "宮城県": [38.27, 140.87], "秋田県": [39.72, 140.10], "山形県": [38.24, 140.34],
  "福島県": [37.75, 140.47], "茨城県": [36.34, 140.45], "栃木県": [36.57, 139.88],
  "群馬県": [36.39, 139.06], "埼玉県": [35.86, 139.65], "千葉県": [35.61, 140.12],
  "東京都": [35.68, 139.69], "神奈川県": [35.45, 139.64], "新潟県": [37.90, 139.02],
  "富山県": [36.70, 137.21], "石川県": [36.59, 136.63], "福井県": [36.07, 136.22],
  "山梨県": [35.66, 138.57], "長野県": [36.23, 138.18], "岐阜県": [35.39, 136.72],
  "静岡県": [34.98, 138.38], "愛知県": [35.18, 136.91], "三重県": [34.73, 136.51],
  "滋賀県": [35.00, 135.87], "京都府": [35.01, 135.77], "大阪府": [34.69, 135.50],
  "兵庫県": [34.84, 134.69], "奈良県": [34.69, 135.83], "和歌山県": [34.23, 135.17],
  "鳥取県": [35.50, 134.24], "島根県": [35.47, 133.05], "岡山県": [34.66, 133.93],
  "広島県": [34.40, 132.46], "山口県": [34.19, 131.47], "徳島県": [34.07, 134.56],
  "香川県": [34.34, 134.04], "愛媛県": [33.84, 132.77], "高知県": [33.56, 133.53],
  "福岡県": [33.61, 130.42], "佐賀県": [33.25, 130.30], "長崎県": [32.74, 129.87],
  "熊本県": [32.79, 130.74], "大分県": [33.24, 131.61], "宮崎県": [31.91, 131.42],
  "鹿児島県": [31.56, 130.56], "沖縄県": [26.34, 127.77],
};

function loadEnv() {
  for (const dir of [process.cwd(), __dirname]) {
    const envPath = resolve(dir, ".env");
    if (existsSync(envPath)) {
      const lines = readFileSync(envPath, "utf-8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...rest] = trimmed.split("=");
          const val = rest.join("=").trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
      break;
    }
  }
}

function configureCloudinary() {
  loadEnv();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    console.error("エラー: CLOUDINARY_API_KEY と CLOUDINARY_API_SECRET を設定してください。");
    console.error("");
    console.error("landscapes-of-japan/.env ファイルを作成:");
    console.error("  CLOUDINARY_API_KEY=xxx");
    console.error("  CLOUDINARY_API_SECRET=xxx");
    process.exit(1);
  }
  cloudinary.config({ cloud_name: CLOUD_NAME, api_key: apiKey, api_secret: apiSecret });
}

async function uploadPhoto(filepath) {
  const result = await cloudinary.uploader.upload(filepath, {
    resource_type: "image",
    overwrite: false,
    unique_filename: true,
  });
  return result.public_id;
}

function updatePageJs(newIds, pref, loc) {
  let content = readFileSync(PAGE_JS, "utf-8");

  // 既存の都道府県を探す
  const prefEscaped = pref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefRegex = new RegExp(
    `(pref:\\s*"${prefEscaped}".*?photos:\\s*\\[)(.*?)(\\s*\\])`,
    "s"
  );
  const match = content.match(prefRegex);

  if (match) {
    // 既存の都道府県に写真を追加
    const newEntries = newIds
      .map(id => `\n      { id: "${id}", loc: "${loc}" },`)
      .join("");
    const updated = match[1] + match[2] + newEntries + match[3];
    content = content.replace(match[0], updated);
  } else {
    // 新しい都道府県エントリを追加
    const coords = PREF_COORDS[pref] || [35.0, 135.0];
    if (!PREF_COORDS[pref]) {
      console.warn(`警告: ${pref} の座標が見つかりません。デフォルト座標を使用します。`);
    }

    const photosStr = newIds
      .map(id => `      { id: "${id}", loc: "${loc}" },`)
      .join("\n");

    const newBlock = `  {
    pref: "${pref}",
    lat: ${coords[0]}, lng: ${coords[1]},
    photos: [
${photosStr}
    ]
  },`;

    // PREFECTURES配列の閉じ括弧の前に追加
    const closingMatch = content.match(/(\n\];\s*\n\s*\/\* Helper)/);
    if (closingMatch) {
      content = content.replace(closingMatch[0], "\n" + newBlock + closingMatch[0]);
    } else {
      // フォールバック
      const prefStart = content.indexOf("const PREFECTURES = [");
      if (prefStart >= 0) {
        const closingIdx = content.indexOf("];", prefStart);
        if (closingIdx >= 0) {
          content = content.slice(0, closingIdx) + "\n" + newBlock + "\n" + content.slice(closingIdx);
        }
      }
    }
  }

  writeFileSync(PAGE_JS, content, "utf-8");
}

function parseArgs(argv) {
  const args = { photos: [], pref: null, loc: null, dryRun: false };
  let i = 0;
  while (i < argv.length) {
    if (argv[i] === "--pref" && i + 1 < argv.length) {
      args.pref = argv[++i];
    } else if (argv[i] === "--loc" && i + 1 < argv.length) {
      args.loc = argv[++i];
    } else if (argv[i] === "--dry-run") {
      args.dryRun = true;
    } else if (!argv[i].startsWith("--")) {
      args.photos.push(argv[i]);
    }
    i++;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.photos.length === 0 || !args.pref || !args.loc) {
    console.log("使い方:");
    console.log("  node upload.mjs <写真> --pref 都道府県名 --loc 撮影地名");
    console.log("");
    console.log("例:");
    console.log('  node upload.mjs DSC07601.jpg --pref 京都府 --loc 清水寺');
    console.log('  node upload.mjs *.jpg --pref 兵庫県 --loc 姫路城');
    console.log("");
    console.log("オプション:");
    console.log("  --pref  都道府県名（必須）");
    console.log("  --loc   撮影地名（必須）");
    console.log("  --dry-run  アップロードせずに確認のみ");
    process.exit(1);
  }

  // ファイル存在チェック
  const validExts = [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".arw"];
  for (const p of args.photos) {
    if (!existsSync(p)) {
      console.error(`エラー: ファイルが見つかりません: ${p}`);
      process.exit(1);
    }
    const ext = extname(p).toLowerCase();
    if (!validExts.includes(ext)) {
      console.warn(`警告: サポート外の形式かもしれません: ${basename(p)}`);
    }
  }

  // 都道府県チェック
  if (!PREF_COORDS[args.pref]) {
    console.warn(`警告: '${args.pref}' は標準の都道府県名にありません。`);
  }

  console.log("=== Landscapes of Japan アップロードツール ===");
  console.log(`  都道府県: ${args.pref}`);
  console.log(`  撮影地:   ${args.loc}`);
  console.log(`  写真数:   ${args.photos.length}枚`);
  console.log();

  if (args.dryRun) {
    console.log("[DRY RUN] アップロードは行いません。");
    args.photos.forEach(p => console.log(`  - ${basename(p)}`));
    return;
  }

  configureCloudinary();

  const uploadedIds = [];
  for (let i = 0; i < args.photos.length; i++) {
    const photo = args.photos[i];
    process.stdout.write(`[${i + 1}/${args.photos.length}] アップロード中: ${basename(photo)} ... `);
    try {
      const publicId = await uploadPhoto(resolve(photo));
      uploadedIds.push(publicId);
      console.log(`OK -> ${publicId}`);
    } catch (e) {
      console.log(`失敗: ${e.message}`);
    }
  }

  if (uploadedIds.length === 0) {
    console.log("\nアップロードされた写真がありません。");
    return;
  }

  console.log(`\n${uploadedIds.length}枚のアップロード完了。page.js を更新中...`);
  updatePageJs(uploadedIds, args.pref, args.loc);
  console.log("page.js を更新しました。");
  console.log();
  console.log("次のステップ:");
  console.log("  1. git add -A && git commit -m '写真追加'");
  console.log("  2. git push  (Vercelが自動デプロイ)");
  console.log();
  console.log("追加されたエントリ:");
  for (const pid of uploadedIds) {
    console.log(`  { id: "${pid}", loc: "${args.loc}" }`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
