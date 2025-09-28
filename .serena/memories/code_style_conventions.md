# コードスタイルと規約

## 共通規約

### Prettier設定
- **セミコロン**: なし (`"semi": false`)
- **インポート自動整理**: prettier-plugin-organize-imports使用
- 両プロジェクト（web/crawler）で同じ設定

### TypeScript設定
- **厳密モード**: 有効 (`"strict": true`)
- **ES Module 互換**: 有効 (`"esModuleInterop": true`)

## Web プロジェクト固有

### ESLint設定
- **ベース**: @eslint/js推奨設定 + TypeScript ESLint推奨設定
- **対象ファイル**: `**/*.{ts,tsx}`
- **ECMAScript**: ES2020
- **プラグイン**:
  - react-hooks (推奨ルール適用)
  - react-refresh (コンポーネントエクスポート警告)

### TypeScript設定
- **プロジェクト参照**: tsconfig.app.json, tsconfig.node.json使用
- **モジュールシステム**: ES Module

### React規約
- React 19使用
- React Hooks推奨ルール適用
- Fast Refresh対応

## Crawler プロジェクト固有

### TypeScript設定
- **ターゲット**: ES2020
- **モジュールシステム**: CommonJS
- **出力ディレクトリ**: ./dist
- **ソースディレクトリ**: ./src

## ファイル命名規約
- **React コンポーネント**: PascalCase (`App.tsx`)
- **一般ファイル**: camelCase (`index.ts`, `scraper.ts`)
- **設定ファイル**: kebab-case (`.prettierrc`, `eslint.config.js`)

## インポート規約
- prettier-plugin-organize-importsにより自動整理
- 外部ライブラリ → 内部モジュール の順序