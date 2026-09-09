"use client";
/**
 * ⑦ 自由文検索の「いまどの状態か」を1か所で決める。
 *
 * 直した不具合:
 *   検索していないのに「この言葉に当たる見た目はありません」と出ていた。
 *   概念語に当てはまらないことと、写真が無いことは別のもの。
 *
 * 区別するもの (混ぜない):
 *   未入力 / 未実行 / 未対応の言語 / 取得中 / 準備中 / 推論中 /
 *   完了して結果あり / 完了して0件 / 中止 / 失敗
 *
 * 画面から切り離してあるのは、規則そのものを node で検査できるようにするため
 * (scripts/check-free-state.mjs)。
 */

/** 取得や検索が進行中で、押し直しても意味が無い状態 */
export const BUSY = ["downloading", "preparing", "running"];
export const isBusy = (phase) => BUSY.includes(phase);

export const initialFree = { phase: "idle", pct: 0, result: null };

/**
 * 画面に何を出すかを決める。
 *
 * @param {object}  a
 * @param {object}  a.free      { phase, pct, result }
 * @param {string}  a.text      入力欄の中身 (前後の空白を除いたもの)
 * @param {boolean} a.supported その言語で自由文検索を提供しているか
 * @param {boolean} a.cached    モデルを取得済みか (初回の大きな取得が要るか)
 * @returns {{
 *   note: null|"unsupported"|"downloading"|"preparing"|"running"|"empty"|"aborted"|"failed",
 *   showRun: boolean, showCancel: boolean, showRetry: boolean,
 *   showBytes: boolean, pct: number|null, resultForText: boolean,
 * }}
 */
export function freeView({ free, text, supported, cached }) {
  const phase = free?.phase || "idle";
  const busy = isBusy(phase);
  const none = {
    note: null, showRun: false, showCancel: false, showRetry: false,
    showBytes: false, pct: null, resultForText: false,
  };

  /* 取得・準備・推論は入力欄と切り離して扱う。
     入力を書き換えても通信は続いているので、中止できる状態を隠さない。 */
  if (busy) {
    return {
      ...none,
      note: phase,
      showCancel: true,
      /* 割合は実際に受け取ったバイト数からのみ出す。
         総量が分からない準備中・推論中は割合を出さない。 */
      pct: phase === "downloading" ? clamp01(free.pct) : null,
    };
  }

  if (!text) return none;                       /* 未入力: 通常の探索画面のまま */
  if (!supported) return { ...none, note: "unsupported" };

  switch (phase) {
    /* 正常に終わって、表示基準を満たす写真が0件。ここで初めて「見つからない」 */
    case "empty":
      return { ...none, note: "empty", showRetry: false };
    case "done":
      return { ...none, resultForText: true };
    case "aborted":
      return { ...none, note: "aborted", showRetry: true, showBytes: !cached };
    case "failed":
      return { ...none, note: "failed", showRetry: true, showBytes: !cached };
    /* 未実行。実行方法だけを示す。「該当なし」は出さない */
    default:
      return { ...none, showRun: true, showBytes: !cached };
  }
}

const clamp01 = (n) => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0);

/**
 * 画面に出す容量。**十進の MB (1 MB = 1,000,000 B)** で丸める。
 *
 * 以前は 1,048,576 で割った値 (実体は MiB) を「MB」と書いていた。
 * NIST の定義では 1 MB = 10^6 B、1 MiB = 2^20 B なので、
 * 表示単位を「MB」のままにするなら十進で計算するのが正しい。
 * https://physics.nist.gov/cuu/Units/binary.html
 *
 * 丸めは既存方針どおり `Math.round` (整数)。小数は出さない。
 * ここに渡すのは「これから取りに行く見込みの量」で、
 * 実際の通信量は配信側の圧縮やブラウザの再利用で変わりうる。
 * 技術記録では実バイト数と MiB を併記するが、画面には出さない。
 */
export const formatSizeMB = (bytes) => `${Math.round((Number(bytes) || 0) / 1e6)} MB`;
