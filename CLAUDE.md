# Landscapes of Japan - Claude Code ガイド

## プロジェクト概要
日本の風景写真ポートフォリオサイト。Next.js + Cloudinary + Vercel。

## 本番URL
https://landscapes-of-japan.vercel.app

## 主要ファイル
- `app/page.js` — メインコンポーネント（PREFECTURES データ、地図、ギャラリー、ライトボックス）
- `app/globals.css` — 全スタイル
- `upload.mjs` — Cloudinary写真アップロードツール
- `sort-photos.mjs` — 写真を撮影日時順にソート

## PREFECTURESデータ構造
```js
{ pref: "京都府", lat: 35.01, lng: 135.77, photos: [
  { id: "DSC07601_cocitq", loc: "清水寺周辺", year: 2025 },
  ...
]}
```

## Cloudinary
- Cloud Name: `dr53c12fo`
- URL形式: `https://res.cloudinary.com/dr53c12fo/image/upload/w_{幅},f_auto,q_auto/{public_id}.jpg`

## デプロイ手順
```bash
git add <変更ファイル>
git commit -m "変更内容"
git push
# Vercelが自動デプロイ。手動の場合:
npx vercel --prod --yes
```

## 現在の構成（88枚）
- 京都府 18枚（清水寺、金閣寺、平等院、東福寺）
- 奈良県 3枚（法隆寺）
- 兵庫県 5枚（姫路城）
- 愛知県 24枚（東山動物園）
- 三重県 38枚（鳥羽水族館、伊勢神宮、おはらい町、朝熊山、横山、梅林公園、夫婦岩）

## 20言語対応
ja, en, zh, zh-tw, ko, es, fr, de, pt, it, ru, ar, hi, th, vi, id, tr, nl, pl, sv

## 注意事項
- .env にCloudinary API認証情報あり（gitignore済み）
- 写真の並び順は撮影日時の新しい順（左が新しい）
