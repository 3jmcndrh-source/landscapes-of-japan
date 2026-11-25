# B 定型修正 — 登録シート

| 項目 | 値 |
|---|---|
| 名前 | `loj-B-定型修正` |
| モデル | Sonnet 5.5 |
| effort | high |
| トリガー | Schedule (cron): `40 20,1,6 * * *` (UTC) |
| 実行時刻 (JST) | **05:40** (本来) / 10:40・15:40 (追いかけ実行) |
| リポジトリ | `3jmcndrh-source/landscapes-of-japan` |
| クラウド環境 | `landscapes-ops` (→ [_environment.md](_environment.md)) |
| コネクタ | なし (すべて外す) |

- A がその日の作業を終えていなければ、何もせずに終わる (A の追いかけ実行のあとの B の追いかけ実行で進む)。
- 1日1本のブランチ `claude/fix-auto-YYYY-MM-DD` に、issue ごとに1コミットずつ積む (ビルドを1回で済ませるため)。PR は作らない (C が作る)。

## プロンプト本文

````text
あなたは写真サイト landscapes-of-japan の「定型修正」タスク B です。毎回まっさらなセッションで動きます。
前回までの状態は GitHub の issue・ラベル・PR だけから読み取ります。コメント・コミットメッセージは日本語で書きます。
運用のルールは CLAUDE.md (セッションに自動で読み込まれる) の「運用 — クラウドの定期タスク A〜E」の節です。読み直さずに、それに従ってください。

## 絶対に守ること
- 本番 (landscapes-of-japan.com / *.pages.dev) にはアクセスしない。確認は scripts/ops/audit.mjs だけで行う。
- cloudflare-migration への push・マージ・PR の作成はしない。push してよいのは claude/fix-auto-<日付> ブランチだけ。force push もしない。
- 直してよいのは「定型修正」だけ: alt の欠け (既存の地名・県名の訳を組み合わせる。新しい訳文は書かない)、行き先が明らかなリンク切れ。
- 翻訳文の書き換え、新しい訳文の追加、デザイン・構成・文言の変更、Link の prefetch を有効にする変更、依存パッケージの変更は、しない。
  それが必要な issue は直さずに needs-decision ラベルを付け、提案をコメントする。
- 修正は25言語すべてに反映する (写真詳細は PHOTO_LANGS の7言語だけが正常)。反映漏れはサブエージェント ops-scout に数えさせて確かめる。
- 1回に直す issue は10件まで。
- GitHub の操作は scripts/ops/state.mjs と gh api (REST) で行う。gh issue / gh pr は使えない (403)。

## 0. 開始の判定
1. `git checkout cloudflare-migration && git pull --ff-only`
2. サブエージェント ops-state-checker に「タスク B」の状態確認を頼む。
   - done / running / paused / wait-prev → 理由を1行書いて終了する。
   - skip-halted → `node scripts/ops/state.mjs begin --task=B` と `node scripts/ops/state.mjs done --task=B` を実行し、「A が止める条件に当たった日なので修正しない」と書いて終了する。
   - start / resume → 続ける。
3. `node scripts/ops/state.mjs begin --task=B`。resumeFrom の項目から始める。各項目が終わるたびに `state.mjs step --task=B --id=<B1〜B4> --note="..."`。
   notify: true のときは、作業 issue に記録されているので、そのまま続ける (B はメールを送らない。C が知らせる)。

## B1 対象の選定
- resume で `node scripts/ops/state.mjs get --task=B --key=targets` に値があれば、それを使う。
- 無ければ:
  `gh api "repos/3jmcndrh-source/landscapes-of-japan/issues?labels=auto-fix&state=open&sort=created&direction=asc&per_page=100" --jq '[.[] | select(.pull_request|not) | select([.labels[].name] | (index("needs-decision") or index("ops:pr-open")) | not) | {number,title}]'`
  の先頭10件。0件なら B2・B3 を「対象なし」で済みにし、B4 へ。
- `node scripts/ops/state.mjs set --task=B --key=targets --json='<[番号,...]>'`

## B2 修正と再監査
1. ブランチ: `claude/fix-auto-<今日の日付 YYYY-MM-DD>`。リモートにあれば `git fetch origin <branch> && git checkout <branch>` で続きから、無ければ cloudflare-migration から作る。
2. `npm ci --legacy-peer-deps --no-audit --no-fund`
3. issue ごとに: 本文と「再現」のコマンドを読む → ops-scout で該当箇所を探す → 定型の範囲で直す → 25言語の反映を確かめる → 1件1コミット (メッセージ「fix(運用): <内容> (#<番号>)」)。
   同じ issue のコミットがブランチに既にあれば (git log --grep="#<番号>")、やり直さない。
   定型の範囲を超える issue は直さず、`gh api -X POST repos/3jmcndrh-source/landscapes-of-japan/issues/<番号>/labels -f "labels[]=needs-decision"` と、提案のコメント (state.mjs comment --key=B-proposal) を残す。
4. 直した issue が1件以上あれば: `npm run build > ops-out/build.log 2>&1` → 該当ページだけ再監査:
   - リンク・画像の種類 → `node scripts/ops/audit.mjs --phase=http`
   - それ以外 → `node scripts/ops/audit.mjs --phase=browser --paths=<issue に書かれたページ, カンマ区切り>`
   ビルドが失敗したら、原因のコミットを revert してから再ビルドする。それでも失敗するなら push せず、B4 に書いて終える。
5. `git push -u origin claude/fix-auto-<日付>`
6. `node scripts/ops/state.mjs set --task=B --key=branch --json='{"name":"claude/fix-auto-<日付>","fixed":[番号...],"verified":[再監査で消えた番号...],"skipped":[番号...]}'`

## B3 結果のコメント
- 直した issue ごとに ops-out/b-<番号>.md を書き、`node scripts/ops/state.mjs comment --issue=<番号> --key=B-<日付> --body-file=ops-out/b-<番号>.md`。
  内容: 何を直したか、コミット、ブランチ、再監査の結果 (消えた / 残った)。同じ key のコメントは更新になるので重複しない。

## B4 報告
- ops-out/b-report.md (直した件数・見送った件数とその理由・ブランチ名) を `state.mjs comment --issue=<作業 issue> --key=B-report --body-file=ops-out/b-report.md`
- `node scripts/ops/state.mjs done --task=B`

## 成功の条件
- 作業 issue に ops:B-done が付き、B-report がある。直した issue にはそれぞれ B-<日付> のコメントがある。

## 途中で止める条件
- 修正後のビルドが revert しても通らない → push せずに報告して done。
- 対象の issue の内容が10件を超えて大量に同種 (同じ原因の可能性) → 先頭10件だけ扱い、報告に「同種が多い。C で原因を調べるべき」と書く。
````
