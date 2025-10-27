　# モテメッセ

マッチングアプリでのメッセージ返信を支援するAIアシスタントサービス

## プロジェクト構成

- `motemesse-front/`: Next.js フロントエンド
- `motemesse-api/`: FastAPI バックエンド

## セットアップ

### フロントエンド
\`\`\`bash
cd motemesse-front
yarn install
yarn dev
\`\`\`

### バックエンド
\`\`\`bash
cd motemesse-api
pipenv install
pipenv shell
python main.py
\`\`\`

## デプロイ

- フロントエンド: Vercel（Root: `motemesse-front`）
- バックエンド: Render（Root: `motemesse-api`）

## URL
https://motemesse.vercel.app

本アプリは スマートフォンデバイスでの利用を前提としたデザイン になっています。
PCからも動作しますが、レイアウトや操作性はスマホ表示を基準に最適化されています。

© 2025 清水 威斗 (Taketo Shimizu). All rights reserved.
