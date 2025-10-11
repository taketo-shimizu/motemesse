　# モテメッセ

マッチングアプリでのメッセージ返信を支援するAIアシスタントサービス（モノレポ版）

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

## 元のリポジトリ

- Frontend: https://github.com/YOUR_USERNAME/motemesse-front
- Backend: https://github.com/YOUR_USERNAME/motemesse-api

© 2025 清水 威斗 (Taketo Shimizu). All rights reserved.
