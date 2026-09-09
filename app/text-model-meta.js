// 自動生成: node scripts/package-text-model.mjs (手で編集しない)
// ⑦ 自由文検索の文章モデルの目次。
// sentence-transformers/clip-ViT-B-32-multilingual-v1 (Apache-2.0) を
// int8 量子化した ONNX。既存の画像ベクトルと同じ512次元へ投影される。
// Cloudflare Pages の 1ファイル 25 MiB 制限のため分割してある。
// 取得は「自由文で探す」を押したときだけ。通常の閲覧・概念語検索では取らない。
export const TEXT_MODEL_BASE = "/models/mclip";
export const TEXT_MODEL_PARTS = ["model.onnx.000.gz","model.onnx.001.gz","model.onnx.002.gz","model.onnx.003.gz","model.onnx.004.gz","model.onnx.005.gz","model.onnx.006.gz"];
export const TEXT_MODEL_BYTES = 90351278;
export const TEXT_DENSE_BYTES = 1460339;
export const TEXT_TOKENIZER_BYTES = 547105;
export const ORT_WASM_BYTES = 2807643;
/** 初回に流れる量のめやす (gzip後のモデル + Dense + トークナイザ + 実行部1つ) */
export const TEXT_MODEL_TOTAL_BYTES = 95166365;
/** 進捗の分母。閲覧側が自分で数えられる分だけ (実行部は ORT が読むので数えられない)。
 *  gzip 後の値。画面の割合は「実際に受け取ったバイト数」で動く。 */
export const TEXT_DOWNLOAD_BYTES = 92358722;
/** 展開後の ONNX の大きさ。つなぎ終わったものがこの値でなければ使わない */
export const TEXT_MODEL_RAW_BYTES = 135377779;
/** ファイルごとの大きさ (gzip後)。取得済みを差し引いて「あと何MB要るか」を出す */
export const TEXT_MODEL_ASSET_BYTES = {"model.onnx.000.gz":12069905,"model.onnx.001.gz":12014660,"model.onnx.002.gz":11801270,"model.onnx.003.gz":11740864,"model.onnx.004.gz":15468767,"model.onnx.005.gz":18775435,"model.onnx.006.gz":8480377,"dense.bin.gz":1460339,"vocab.txt.gz":547105};
/** 取得済みの置き場を分ける鍵。モデルを入れ替えると値が変わる */
export const TEXT_MODEL_VERSION = "gz-90351278-1460339-547105";
export const TEXT_VOCAB_SIZE = 119547;
export const TEXT_HIDDEN = 768;
export const TEXT_OUT = 512;
/** 実測で自由文検索を有効にする言語 (docs/search-languages.md)。
 *  ここに無い言語では自由文をモデルへ渡さず、概念語だけで検索する。 */
export const TEXT_MODEL_LANGS = ["ja","en","zh","zh-tw","es","fr","de","pt","it","ru","vi","nl","uk"];
/** Worker の版。中身が変わると値が変わる。取得URLに付けて古い版を掴まないようにする */
export const TEXT_WORKER_VERSION = "bc1bb867bd70";
