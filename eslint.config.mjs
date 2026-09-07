/**
 * ⑧ 公開前の自動チェック。
 *
 * いちばんの目的は「未定義変数・import漏れ」を公開前に落とすこと。
 * 過去に本番で起きた不具合はどちらもこの型だった:
 *   - jsonLd が削除済み変数を参照して ReferenceError (写真ページが500)
 *   - LocClient の photoLang の import 漏れ (撮影地ページが白画面)
 *   - CollectionClient / PrefClient の hasPhotoPages の import 漏れ
 *     (Lightbox を開くと Application error)
 * いずれもビルドは成功していた。矢印関数の中は実行されるまで評価されないため。
 *
 * 方針: no-undef を error にする。警告の一括無効化はしない。
 */
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "**/out/**", "**/.next/**", "**/node_modules/**", "images-dist/**",
      /* 以前の誤操作でできた入れ子ディレクトリ */
      "landscapes-of-japan/**",
      "docs/**", "*.log",
      /* 自動生成物 (巨大なデータのみ。手で直さないのでチェック対象外) */
      "app/photo-dates.js", "app/photo-months.js", "app/photo-colors.js",
      "app/photo-palette.js", "app/photo-dims.js", "app/photo-added.js",
      "public/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["app/**/*.js", "scripts/**/*.mjs", "*.mjs", "proxy.js"],
    /* コード中の eslint-disable コメントが参照しているプラグインを登録しておく
       (未登録だと「そのルールは存在しない」で落ちる) */
    plugins: { "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      /* 本命。未定義の参照は公開前に止める */
      "no-undef": "error",
      /* import したのに使っていない / 変数の消し忘れ。args は無視 */
      "no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }],
      /* 実害のあるものだけ error に残す */
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
      "no-unreachable": "error",
      "no-const-assign": "error",
      "no-self-assign": "error",
      /* JSX 内での未使用判定が効かないため、React 由来の誤検知は落とす */
      "no-empty": ["warn", { allowEmptyCatch: true }],
      /* フックの依存配列は既存コードに意図的な省略があるため警告にとどめる */
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
