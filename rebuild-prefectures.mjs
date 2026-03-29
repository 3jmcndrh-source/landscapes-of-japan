#!/usr/bin/env node
/**
 * Cloudinaryの写真IDをpage.jsのPREFECTURESに再追加する（既存の県に追加 or 新規県作成）
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGE_JS = resolve(__dirname, "app", "page.js");

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

// 追加すべきエントリ
const toAdd = [
  // 北海道
  { pref: "北海道", photos: [
    { id: "rj0whx4syklikykwjq6z", loc: "さっぽろ雪まつり", year: 2026 },
    { id: "cgazaabjctzmga9yojla", loc: "さっぽろ雪まつり", year: 2026 },
    { id: "rqjb5xgid4vochyrrpie", loc: "さっぽろ雪まつり", year: 2026 },
    { id: "usvnljzznwmqu93sftg1", loc: "さっぽろ雪まつり", year: 2026 },
  ]},
  // 高知県
  { pref: "高知県", photos: [
    { id: "zxpnph1zw30vn5ce3hws", loc: "桂浜", year: 2025 },
    { id: "p0z0vmdnqz4ptqiwgtwl", loc: "桂浜", year: 2025 },
    { id: "x7zziur8nq5gx2vksgzr", loc: "桂浜", year: 2025 },
    { id: "w43utexm5kjyu54hducu", loc: "高知城", year: 2025 },
    { id: "pkszsvhktqyiwlyfurkd", loc: "高知城", year: 2025 },
    { id: "pk5nouibsptedo8wds3h", loc: "高知城", year: 2025 },
    { id: "z5dppj2tdaf1ovyjq3id", loc: "高知城", year: 2025 },
    { id: "yhenlvvvz5kucqldydfm", loc: "高知城", year: 2025 },
    { id: "ekyaldwcry9gqiy9tgre", loc: "高知城", year: 2025 },
    { id: "cpucwtmknaneef6uw8en", loc: "名越屋沈下橋", year: 2025 },
    { id: "opof4iv0ksb7hyyxwd0g", loc: "にこ淵", year: 2025 },
  ]},
  // 愛媛県
  { pref: "愛媛県", photos: [
    { id: "milp580j3b6uspkm7l8z", loc: "道後温泉", year: 2025 },
    { id: "t4witz3if3ox7tl0vips", loc: "道後温泉", year: 2025 },
    { id: "kbsiyecqjwzzyzurmddz", loc: "道後温泉", year: 2025 },
    { id: "jizpq9o0ag6bt1nmynv4", loc: "道後温泉", year: 2025 },
    { id: "pebdpfzj17kk1ssl62dc", loc: "松山城", year: 2025 },
    { id: "ghweftqojjonv5zb6elq", loc: "松山城", year: 2025 },
    { id: "alukivsd5rv3gvo7c6sh", loc: "松山城", year: 2025 },
    { id: "wibx41ebmy2hxovs8wv1", loc: "松山城", year: 2025 },
    { id: "e55oicb01uyyhukixdss", loc: "来島海峡大橋", year: 2025 },
    { id: "b3uqemt85nz8gcxz4mrs", loc: "亀老山展望台", year: 2025 },
  ]},
  // 徳島県
  { pref: "徳島県", photos: [
    { id: "psuhikljduldvl7jmox7", loc: "大鳴門橋", year: 2025 },
    { id: "iy3ljfosdadc2xabf8ly", loc: "鳴門海峡", year: 2025 },
  ]},
  // 沖縄県
  { pref: "沖縄県", photos: [
    { id: "jvxvv4qs8b5sot8hcaka", loc: "宮古島", year: 2025 },
    { id: "axgmmojhbauycrqe0ihk", loc: "宮古島", year: 2025 },
    { id: "sgzeqvsvqk2whkqjlbbi", loc: "宮古島", year: 2025 },
    { id: "oes9giyouydgsdqq0f4t", loc: "宮古島", year: 2025 },
    { id: "afjaenvla1eya7kiv5zh", loc: "宮古島", year: 2025 },
    { id: "ovui6gb8bdpvlc2gd9gl", loc: "宮古島", year: 2025 },
    { id: "mztgcepivlstffevagwz", loc: "宮古島", year: 2025 },
    { id: "uotk9tgqbswqr1ennalv", loc: "宮古島", year: 2025 },
    { id: "yj9bzxco6ntjdxqfxvwe", loc: "宮古島", year: 2025 },
    { id: "bti9ugmg2jr2874wglyy", loc: "宮古島", year: 2025 },
    { id: "hx1ucufb7xc2hbcvpfsb", loc: "宮古島", year: 2025 },
    { id: "k1eg8vwxkgjugoffr8mf", loc: "宮古島", year: 2025 },
    { id: "t3gq5xm4udnrgmnwyibs", loc: "宮古島", year: 2025 },
    { id: "hu3psnou05kneq6nvna1", loc: "宮古島", year: 2025 },
    { id: "oxgq7nub2ad0mixlkgdj", loc: "宮古島", year: 2025 },
    { id: "iyxrkq7ojni4adbkd2id", loc: "宮古島", year: 2025 },
    { id: "jg5yb3rx5vvn2c9v0jlv", loc: "宮古島", year: 2025 },
    { id: "ksrpgxpsgmiffx3krp8n", loc: "宮古島", year: 2025 },
    { id: "e3kwo6gyrnbspcplkmnc", loc: "宮古島", year: 2025 },
    { id: "sd95do3wwohnsnevmfod", loc: "宮古島", year: 2025 },
    { id: "ccggglphvsgibbj9bdmn", loc: "宮古島", year: 2025 },
    { id: "iutfwnyuojdgmm3zvghl", loc: "宮古島", year: 2025 },
    { id: "akk660cretzdipzyhoz1", loc: "宮古島", year: 2025 },
    { id: "gcmokjrl4gjekujs3sws", loc: "宮古島", year: 2025 },
    { id: "pprmxtxaj53r93mkk7f3", loc: "宮古島", year: 2025 },
    { id: "lcfe4zz4xvxjzruda1yo", loc: "宮古島", year: 2025 },
    { id: "hfyo4tn30ahh2xz3asnn", loc: "宮古島", year: 2025 },
    { id: "l1ihzzfw2lkah7rim3hk", loc: "宮古島", year: 2025 },
    { id: "jwirovp2d1kqfae6gqti", loc: "宮古島", year: 2025 },
    { id: "vnduczpwqmgjkhll1l0z", loc: "宮古島", year: 2025 },
    { id: "zo1fxoj920zvxfgavwuo", loc: "宮古島", year: 2025 },
    { id: "asrmh4euv3ntt5saqm0o", loc: "宮古島", year: 2025 },
    { id: "ccthpmmrxzfv9fgctuws", loc: "宮古島", year: 2025 },
    { id: "noogzrhpbx4h8uk6wet5", loc: "宮古島", year: 2025 },
    { id: "iw0ue8i6asslgwkredsv", loc: "宮古島", year: 2025 },
    { id: "wt6ow9shewohl0dm0lnj", loc: "宮古島", year: 2025 },
    { id: "kgk6jnvbfx3wvqgjia9m", loc: "宮古島", year: 2025 },
    { id: "eb6mwk1ahcoubidkfh36", loc: "宮古島", year: 2025 },
  ]},
];

let content = readFileSync(PAGE_JS, "utf-8");

for (const entry of toAdd) {
  const { pref, photos } = entry;
  const coords = PREF_COORDS[pref];

  const photosStr = photos
    .map(p => `      { id: "${p.id}", loc: "${p.loc}", year: ${p.year} },`)
    .join("\n");

  const newBlock = `  {
    pref: "${pref}",
    lat: ${coords[0]}, lng: ${coords[1]},
    photos: [
${photosStr}
    ]
  },`;

  // PREFECTURES配列の閉じ括弧の前に追加
  const prefStart = content.indexOf("const PREFECTURES = [");
  // ブラケット深さで正確に閉じを見つける
  let depth = 0, closeIdx = -1;
  for (let i = prefStart + "const PREFECTURES = [".length; i < content.length; i++) {
    if (content[i] === "[") depth++;
    else if (content[i] === "]") {
      if (depth === 0) { closeIdx = i; break; }
      depth--;
    }
  }
  if (closeIdx >= 0) {
    content = content.slice(0, closeIdx) + "\n" + newBlock + "\n" + content.slice(closeIdx);
    console.log(`${pref}: ${photos.length}枚を追加`);
  }
}

writeFileSync(PAGE_JS, content, "utf-8");
console.log("page.js を更新しました。");
