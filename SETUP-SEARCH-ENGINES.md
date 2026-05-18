# Yandex / Naver / Bing 直接登録ガイド

GSC (Google) と IndexNow (Bing/Yandex/Naver/Seznam 経由) は既に稼働中。さらに各検索エンジンに **直接プロパティ登録** することで、エンジン固有の analytics + sitemap 提出 + 問題検出が可能になります。

---

## 1. Yandex Webmaster

- **対象市場**: ロシア + CIS (旧ソ連諸国)、東欧の一部
- **URL**: https://webmaster.yandex.com/
- **アカウント**: Yandex アカウントが必要 (新規作成 1 分、または Apple ID 連携)

### 手順

1. https://webmaster.yandex.com/ にログイン
2. 上部 **「Add site」** → `landscapes-of-japan.com` を入力
3. 認証方法を選択:
   - 推奨: **DNS TXT レコード** (`yandex-verification: xxxxxxx` を Cloudflare DNS に追加)
4. Yandex が表示する TXT 値を私に貼り付け → 私が Cloudflare DNS に自動追加
5. 戻って「Verify」クリック
6. 認証後、**Sitemap** タブで `https://landscapes-of-japan.com/sitemap.xml` 提出

### 期待
- ロシア + CIS の Yandex 検索結果に表示
- 流氷・温泉・冬景色は Yandex でも検索需要あり

---

## 2. Naver Search Advisor

- **対象市場**: 韓国 (Naver は韓国検索シェア 60%+、Google は ~25%)
- **URL**: https://searchadvisor.naver.com/
- **アカウント**: Naver アカウントが必要 (Korean ID 入力ほぼ必須、海外ユーザーには時間かかる)

### 手順

1. https://searchadvisor.naver.com/ にログイン
2. **「웹마스터 도구」** (Webmaster Tools) → **사이트 등록** (Site Registration)
3. `https://landscapes-of-japan.com/` を入力
4. 認証方法: **HTML 파일 업로드** (HTML file upload) を選択
5. Naver が指定するファイル名 (例: `naverXXXXXX.html`) と内容を私に貼り付け
6. 私が `public/` に追加 → ビルド + デプロイ (~10 分)
7. Naver で「소유확인」(Ownership confirm) クリック
8. 認証後、**「수집 요청」** タブで `sitemap.xml` 提出

### 期待
- KO 翻訳ページがある (시레토코・무로란・후지산 등) → 韓国市場直撃
- 現在 GSC で /ko impression 16/月 → 数倍に成長可能

---

## 3. Bing Webmaster Tools

- **対象市場**: 北米 + 欧州 (Bing シェア ~3%、ただし **ChatGPT/Copilot のソース** なので AI 経由流入で重要)
- **URL**: https://www.bing.com/webmasters/
- **アカウント**: Microsoft アカウント (またはGoogle/Facebook OAuth)
- **注**: CLAUDE.md によると以前 GSC から imported 済み。新ドメインで再認証必要かも

### 手順

1. https://www.bing.com/webmasters/ にログイン
2. 既に旧 vercel.app プロパティがある場合: ダッシュボードで確認 → 新規追加
3. **「Add a site」** → `https://landscapes-of-japan.com/` 入力
4. 認証方法:
   - 推奨 A: **「Import from Google Search Console」** — GSC で sc-domain プロパティ追加済みなので最速
   - 推奨 B: DNS TXT `BingSiteAuth.xml`
5. TXT or ファイル内容を私に貼り付け → 自動追加
6. 認証後、**Sitemaps** で `sitemap.xml` 提出
7. **「URL Submission」** で個別 URL も最大 10,000/日 即時インデックス申請可能

### 期待
- ChatGPT (Bing 経由) + Copilot 引用元
- AI 検索からの流入が今後増加見込み (2025-26 で年 +50% 予測)

---

## 私が自動化できる部分

| ステップ | 私 | あなた |
|---|---|---|
| 各サービスでアカウント作成 + サイト追加 | ❌ | ✅ |
| 認証値 (TXT/file/meta) の取得 | ❌ | ✅ |
| **Cloudflare DNS に TXT 自動追加** | ✅ (要 DNS:Edit token) | - |
| **HTML 認証ファイルを public/ に追加 + デプロイ** | ✅ | - |
| 認証ボタンクリック | ❌ | ✅ |
| Sitemap 提出 (画面操作) | ❌ | ✅ |

→ あなた: 各サービスでアカウント作成 → 認証画面で値を取得 → 私に貼り付け → 私が DNS/ファイル追加 → あなたが「Verify」クリック

---

## 開始順

1. **Bing** から (Microsoft アカウントが既存、最速、Import from GSC で楽)
2. **Yandex** (DNS TXT 1 行で完了)
3. **Naver** (アカウント作成にやや時間、後回し OK)

各サービス所要 5-10 分。
