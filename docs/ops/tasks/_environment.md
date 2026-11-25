# クラウド環境 `landscapes-ops` (A〜E で共通)

claude.ai/code の環境設定で1つ作り、すべてのタスクで同じものを選ぶ。

## ネットワーク
- **Network access**: `Limited` (2026-11-25 の登録では、所有者の判断で `Full` にした。どちらでも動く)
- **Allow package managers**: オン (npm・github.com・`*.googleapis.com` などが入る)
- **Allowed domains** (1行に1つ。下の6行を足す):
  ```
  uploads.github.com
  *.githubusercontent.com
  www.clarity.ms
  cdn.playwright.dev
  playwright.download.prss.microsoft.com
  playwright.azureedge.net
  ```
  - `uploads.github.com` / `*.githubusercontent.com` … 今は使っていない (基準画像は git の参照に置くよう変えた)。入れたままで害はない
  - `www.clarity.ms` … Clarity の API
  - `cdn.playwright.dev` ほか … Playwright のブラウザのダウンロード (セットアップ時だけ)
- **入れないもの**: `landscapes-of-japan.com`、`landscapes-of-japan.pages.dev`、`landscapes-images.pages.dev`。
  本番へのクロール禁止を、ネットワークの段階でも守るため。

## 環境変数 (Environment variables)
値はリポジトリに書かない。この画面にだけ入れる (`.env` 形式、1行に1つ)。
```
GA4_PROPERTY_ID=<手元の .env の GA4_PROPERTY_ID と同じ値>
CLARITY_PROJECT_ID=<手元の .env の CLARITY_PROJECT_ID と同じ値>
GA4_SA_JSON_B64=<下のコマンドの出力>
CLARITY_API_TOKEN=<手元の .env の CLARITY_API_TOKEN と同じ値>   (下のネットワークシークレットを使うなら、この行は不要)
```
2026-11-25 の登録では、4行とも環境変数に入れた (ネットワークシークレットは使っていない)。
`GA4_SA_JSON_B64` の作り方 (手元の PowerShell で。出力をそのまま貼る):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\Users\3jmcn\Downloads\files\landscapes-of-japan\gsc-service-account.json"))
```

## ネットワークシークレット (Network secrets) — 任意
- **Add secret** → 種類 `Bearer`
- **Allowed websites**: `www.clarity.ms`
- **Header name**: `Authorization` / **Prefix**: `Bearer` / **Value**: 手元の `.env` の `CLARITY_API_TOKEN` の値

(GA4 は鍵で署名してトークンを作る方式なので、ネットワークシークレットでは渡せない。環境変数で渡す。)

## セットアップスクリプト
```bash
#!/bin/bash
set -euo pipefail
node -v
# 監査用のブラウザ (package.json の playwright と同じ版)。ここで入れたものはスナップショットに残る
npx -y playwright@1.65.1 install --with-deps chromium
```
依存パッケージ (`npm ci`) はリポジトリの中身が毎日変わるので、各タスクの最初に行う。
Node は 20 以上が必要 (Next.js 16)。`node -v` が 20 未満なら、このスクリプトに Node の導入を足す。

## GitHub
- Claude GitHub App がこのリポジトリに入っていること (D の GitHub トリガーに必要)。
- gh の認証はプロキシが付ける。GraphQL は使えないので、スクリプトは REST (`gh api repos/...`) だけを使っている。
