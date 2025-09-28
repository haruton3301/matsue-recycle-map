# 推奨コマンド一覧

## Web (フロントエンド) 開発コマンド
```bash
cd web

# 開発サーバー起動
yarn dev

# プロダクションビルド
yarn build

# リント・フォーマット
yarn lint

# プレビュー
yarn preview

# Firebase へデプロイ
yarn deploy
```

## Crawler (データ収集) 開発コマンド
```bash
cd crawler

# クローラー実行
yarn start

# リント・フォーマット
yarn lint
```

## Git コマンド
```bash
# 基本的なGitコマンド (macOS)
git status
git add .
git commit -m "メッセージ"
git push
git pull
```

## システムコマンド (macOS)
```bash
# ファイル・ディレクトリ操作
ls -la          # ファイル一覧
cd <directory>  # ディレクトリ移動
mkdir <name>    # ディレクトリ作成
rm <file>       # ファイル削除
rm -rf <dir>    # ディレクトリ削除

# 検索
find . -name "*.ts"     # ファイル検索
grep -r "検索文字列" .   # 文字列検索
```

## 依存関係管理
```bash
# 新しい依存関係のインストール
yarn add <package>      # 本番依存関係
yarn add -D <package>   # 開発依存関係

# 依存関係の更新
yarn install
```