// 自動生成: node scripts/package-text-model.mjs (手で編集しない)
// ⑦ 自由文検索の文章モデルの目次。
// sentence-transformers/clip-ViT-B-32-multilingual-v1 (Apache-2.0) を
// int8 量子化した ONNX。既存の画像ベクトルと同じ512次元へ投影される。
// Cloudflare Pages の 1ファイル 25 MiB 制限のため分割してある。
// 取得は「自由文で探す」を押したときだけ。通常の閲覧・概念語検索では取らない。
export const TEXT_MODEL_BASE = "/models/mclip";
export const TEXT_MODEL_PARTS = ["model.onnx.000","model.onnx.001","model.onnx.002","model.onnx.003","model.onnx.004","model.onnx.005","model.onnx.006"];
export const TEXT_MODEL_BYTES = 135377779;
export const TEXT_DENSE_BYTES = 1572864;
export const TEXT_TOKENIZER_BYTES = 995525;
export const ORT_WASM_BYTES = 10014674;
/** 初回に取得する量のめやす (モデル + Dense + トークナイザ + 実行部1つ) */
export const TEXT_MODEL_TOTAL_BYTES = 147960842;
export const TEXT_VOCAB_SIZE = 119547;
export const TEXT_HIDDEN = 768;
export const TEXT_OUT = 512;
/** 実測で自由文検索を有効にする言語 (docs/search-languages.md)。
 *  ここに無い言語では自由文をモデルへ渡さず、概念語だけで検索する。 */
export const TEXT_MODEL_LANGS = ["ja","en","zh","zh-tw","es","fr","de","pt","it","ru","vi","nl","uk"];
