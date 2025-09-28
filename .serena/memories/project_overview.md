# 松江市リサイクルマップ (matsue-recycle-map)

## プロジェクトの目的
松江市のリサイクル関連施設をマップ上で表示するWebアプリケーション。
デプロイ先: https://matsue-recycle-map.web.app/

## プロジェクト構成
- **web**: フロントエンドWebアプリケーション
- **crawler**: データ収集用のクローラー

## 技術スタック

### Web (フロントエンド)
- **フレームワーク**: React 19.0.0 with TypeScript
- **ビルドツール**: Vite 6.2.0
- **スタイリング**: Tailwind CSS 4.0.17, DaisyUI 5.0.9
- **マップ**: Mapbox GL JS 3.10.0
- **ホスティング**: Firebase Hosting
- **アナリティクス**: Google Analytics
- **その他**: React Icons, Firebase SDK

### Crawler (データ収集)
- **ランタイム**: Node.js with TypeScript
- **スクレイピング**: Playwright 1.51.1
- **HTMLパーサー**: Cheerio 1.0.0
- **HTTP クライアント**: Axios 1.8.4

## ファイル構造
```
matsue-recycle-map/
├── web/                 # フロントエンドアプリ
│   ├── src/
│   │   ├── components/  # Reactコンポーネント
│   │   ├── lib/         # ライブラリ・ユーティリティ
│   │   ├── data/        # データファイル
│   │   ├── App.tsx      # メインアプリコンポーネント
│   │   └── main.tsx     # エントリポイント
│   └── public/          # 静的アセット
├── crawler/             # データクローラー
│   └── src/
│       ├── data/        # 収集したデータ
│       ├── index.ts     # エントリポイント
│       ├── scraper.ts   # スクレイピング機能
│       └── parser.ts    # データパース機能
└── README.md
```