#!/usr/bin/env node
/**
 * ⑦ 自由文検索の「状態の見せ方」の回帰テスト。
 *
 *   node scripts/check-free-state.mjs
 *
 * 見るのは今回直した不具合が戻っていないかどうかだけ。実装のなぞりはしない。
 *   - 検索していないのに「見つからない」と出ない
 *   - 提供していない言語を「未確認」ではなく「未対応」として扱う
 *   - 取得中は中止でき、0件とも成功とも区別される
 *   - 表示の有効・無効と、機能の有効・無効が同じ一覧を見ている
 */
import { freeView, initialFree, isBusy, formatSizeMB } from "../app/free-search-state.js";
import { TEXT_MODEL_TOTAL_BYTES, TEXT_DOWNLOAD_BYTES, ORT_WASM_BYTES } from "../app/text-model-meta.js";
import { TEXT_MODEL_LANGS, canUseFreeText } from "../app/text-encoder.js";
import { LANGS } from "../app/i18n-meta.js";
import { UI_STRINGS } from "../app/ui-strings.js";

const fail = [];
const pass = [];
const check = (name, cond, detail = "") => (cond ? pass : fail).push(`${name}${detail ? ` — ${detail}` : ""}`);

const view = (over = {}) =>
  freeView({ free: initialFree, text: "窓に映る街並み", supported: true, cached: false, ...over });

/* ---- 1. 探す前に「見つからない」と言わない (今回直した不具合) ---- */
{
  const v = view();
  check("未実行では実行方法だけを出す", v.showRun === true && v.note === null,
    `note=${v.note} showRun=${v.showRun}`);
  check("未実行で 0件 と言わない", v.note !== "empty");
  check("未実行では初回の取得量を知らせる", v.showBytes === true);
  check("取得済みなら取得量を出さない", view({ cached: true }).showBytes === false);
}

/* ---- 2. 未入力・未対応 ---- */
{
  const empty = view({ text: "" });
  check("未入力では何も足さない", empty.note === null && empty.showRun === false);
  const un = view({ supported: false });
  check("未対応の言語では未対応と伝える", un.note === "unsupported");
  check("未対応の言語に実行ボタンを出さない", un.showRun === false && un.showCancel === false);
}

/* ---- 3. 取得中・準備中・推論中 ---- */
{
  const dl = view({ free: { phase: "downloading", pct: 0.42, result: null } });
  check("取得中は中止できる", dl.showCancel === true && dl.note === "downloading");
  check("取得中の割合は実測値から出す", Math.abs(dl.pct - 0.42) < 1e-9, `pct=${dl.pct}`);
  check("取得中を 0件 と扱わない", dl.note !== "empty");

  const prep = view({ free: { phase: "preparing", pct: 1, result: null } });
  check("準備中は割合を出さない (総量が分からない)", prep.pct === null);
  check("準備中も中止できる", prep.showCancel === true);
  check("100% でも検索完了にしない", prep.note === "preparing");

  const run = view({ free: { phase: "running", pct: 1, result: null } });
  check("推論中は待機として見せる", run.note === "running" && run.showCancel === true);

  /* 入力を書き換えても、走っている通信の中止操作は隠れない */
  const changed = freeView({
    free: { phase: "downloading", pct: 0.5, result: null },
    text: "別の言葉", supported: true, cached: false,
  });
  check("入力が変わっても取得中の中止は出したまま", changed.showCancel === true);
  /* 未入力に戻しても同じ */
  const cleared = freeView({
    free: { phase: "downloading", pct: 0.5, result: null },
    text: "", supported: true, cached: false,
  });
  check("入力を消しても取得中の中止は出したまま", cleared.showCancel === true);
}

/* ---- 4. 終わったあと ---- */
{
  const done = view({ free: { phase: "done", pct: 1, result: { count: 12 } } });
  check("結果ありは注記なしで一覧を出す", done.note === null && done.resultForText === true);

  const empty = view({ free: { phase: "empty", pct: 1, result: null } });
  check("最後まで探して0件のときだけ見つからないと言う", empty.note === "empty");
  check("0件に再試行は出さない (やり直しても同じ)", empty.showRetry === false);

  const ab = view({ free: { phase: "aborted", pct: 0, result: null } });
  check("中止は 0件 と別に扱う", ab.note === "aborted" && ab.showRetry === true);

  const er = view({ free: { phase: "failed", pct: 0, result: null } });
  check("失敗は 0件 と別に扱う", er.note === "failed" && er.showRetry === true);

  check("中止・失敗のどちらも 0件 とは別の合図",
    ab.note !== empty.note && er.note !== empty.note && ab.note !== er.note);
}

/* ---- 5. 連打・重複取得の入口 ---- */
{
  check("取得中・準備中・推論中は進行中として扱う",
    isBusy("downloading") && isBusy("preparing") && isBusy("running"));
  check("終わった状態を進行中とみなさない",
    !isBusy("idle") && !isBusy("done") && !isBusy("empty") && !isBusy("aborted") && !isBusy("failed"));
}

/* ---- 6. 言語の一覧が食い違わない ---- */
{
  check("自由文の対応言語は13", TEXT_MODEL_LANGS.length === 13, TEXT_MODEL_LANGS.join(","));
  const unknown = TEXT_MODEL_LANGS.filter((l) => !LANGS.includes(l));
  check("対応言語はすべてサイトの言語にある", unknown.length === 0, unknown.join(","));
  /* 表示の判定と機能の判定が同じ一覧を見ていること */
  const mismatch = LANGS.filter((l) => canUseFreeText(l) !== TEXT_MODEL_LANGS.includes(l));
  check("表示と機能で同じ一覧を見ている", mismatch.length === 0, mismatch.join(","));
  /* 未対応の12言語ぶんの文言が、その言語で用意されていること */
  const off = LANGS.filter((l) => !canUseFreeText(l));
  check("自由文を出さない言語は12", off.length === 12, off.join(","));
  for (const key of ["freeUnsupported", "freeNoResults", "freeDownloading", "freeCancel", "freeAborted", "freeRetry"]) {
    const missing = LANGS.filter((l) => !UI_STRINGS[key]?.[l]);
    check(`${key} が25言語ぶんある`, missing.length === 0, missing.join(","));
  }
  /* 提供していないものを「未確認」と書かない。
     ここでは日本語・英語・韓国語の実文だけを見る (他言語は目視で確認する) */
  const un = UI_STRINGS.freeUnsupported;
  check("日本語の未対応文が『確認』ではなく『対応』の言い方", !un.ja.includes("確認"), un.ja);
  check("英語の未対応文が verified ではない", !/verif/i.test(un.en), un.en);
  check("韓国語の未対応文が『확인』ではない", !un.ko.includes("확인"), un.ko);
  check("未対応文が代わりの探し方に触れている",
    un.ja.includes("絞り込み") && /filter/i.test(un.en), `${un.ja} / ${un.en}`);
}

/* ---- 7. 容量表示の単位 ----
   画面に出す「MB」は十進 (1 MB = 1,000,000 B)。
   以前は 1,048,576 で割った値 (実体は MiB) を「MB」と書いていた。 */
{
  check("1 MB = 1,000,000 B で丸める", formatSizeMB(95_166_365) === "95 MB", formatSizeMB(95_166_365));
  check("MiB 換算の値を出していない", formatSizeMB(95_166_365) !== "91 MB");
  check("2進で割っていない (1,048,576 B は 1 MB)", formatSizeMB(1_048_576) === "1 MB", formatSizeMB(1_048_576));
  check("四捨五入 (既存方針)", formatSizeMB(1_500_000) === "2 MB" && formatSizeMB(1_400_000) === "1 MB",
    `${formatSizeMB(1_500_000)} / ${formatSizeMB(1_400_000)}`);
  check("0 と壊れた値で落ちない", formatSizeMB(0) === "0 MB" && formatSizeMB(undefined) === "0 MB");
  check("単位は MB とだけ書く (MiB を画面に出さない)", !formatSizeMB(1).includes("MiB"));

  /* 進捗の分母は Worker が数えられる分だけ。表示単位を変えるために wasm を足さない */
  check("進捗の分母に実行部 wasm を含めない",
    TEXT_DOWNLOAD_BYTES + ORT_WASM_BYTES === TEXT_MODEL_TOTAL_BYTES && TEXT_DOWNLOAD_BYTES < TEXT_MODEL_TOTAL_BYTES,
    `分母 ${TEXT_DOWNLOAD_BYTES} + wasm ${ORT_WASM_BYTES} = 案内 ${TEXT_MODEL_TOTAL_BYTES}`);
}

/* ---- 出力 ---- */
console.log(`[check-free-state] 通った ${pass.length}件`);
for (const p of pass) console.log(`  ✓ ${p}`);
if (fail.length) {
  console.log(`\n直すもの (${fail.length}件):`);
  for (const f of fail) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\n自由文検索の状態の見せ方: 問題なし");
