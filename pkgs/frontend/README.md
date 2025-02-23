# ブロックチェーン物流システム

## 概要

このプロジェクトは、ブロックチェーン技術を活用した物流管理システムのプロトタイプです。農家、購入者、配送業者の3つの主要なステークホルダーのためのインターフェースを提供し、物流プロセスの透明性と効率性を向上させることを目的としています。

## 主な機能

1. 農家ダッシュボード
2. 購入者ダッシュボード
3. 配送業者ダッシュボード
4. QRコードスキャン機能
5. 注文詳細表示

## 技術スタック

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui コンポーネント
- react-qr-reader (QRコードスキャン用)

## プロジェクト構造

```
app/
├── components/
│   └── Header.tsx
├── farmer/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── create-order/
│   │   └── page.tsx
│   └── order/
│       └── [id]/
│           └── page.tsx
├── buyer/
│   ├── dashboard/
│   │   └── page.tsx
│   └── pay/
│       └── [id]/
│           └── page.tsx
├── delivery/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── scan/
│   │   └── page.tsx
│   └── order/
│       └── [id]/
│           └── page.tsx
├── globals.css
├── layout.tsx
├── manifest.ts
├── page.tsx
└── service-worker.ts
```

## 主要コンポーネントの解説

### Header.tsx

- アプリケーション全体で使用されるヘッダーコンポーネント
- レスポンシブデザインに対応したナビゲーションメニューを実装
- モバイル表示時にはハンバーガーメニューを使用

### 農家ダッシュボード (farmer/dashboard/page.tsx)

- 農家が作成した注文のリストを表示
- 新規注文作成ページへのリンクを提供

### 購入者ダッシュボード (buyer/dashboard/page.tsx)

- 購入者の注文リストを表示
- 支払いページへのリンクを提供

### 配送業者ダッシュボード (delivery/dashboard/page.tsx)

- 配送業者が担当する注文のリストを表示
- QRコードスキャンページへのリンクを提供

### QRコードスキャン機能 (delivery/scan/page.tsx)

- `react-qr-reader` ライブラリを使用してQRコードスキャン機能を実装
- デバイスのカメラにアクセスしてQRコードをスキャン
- スキャン結果に基づいて配送状況を更新

#### 実装の詳細

1. `useState` フックを使用して、スキャンデータとスキャナーの状態を管理
2. `dynamic` インポートを使用して `QrReader` コンポーネントをクライアントサイドでのみ読み込む
3. `handleScan` 関数でスキャン結果を処理
4. `handleConfirm` 関数でスキャンデータを確認し、適切なアクションを実行

### PWA対応

- `manifest.ts` ファイルでWebアプリのマニフェストを定義
- `service-worker.ts` でService Workerを実装し、オフライン機能とキャッシュ戦略を提供

## セットアップと実行方法

1. リポジトリをクローン:
   ```
   git clone [リポジトリURL]
   ```

2. 依存関係をインストール:
   ```
   npm install
   ```

3. 開発サーバーを起動:
   ```
   npm run dev
   ```

4. ブラウザで `http://localhost:3000` にアクセス

## 注意点

- QRコードスキャン機能はHTTPS環境下でのみ正常に動作します（セキュリティ上の制約）
- 実際の運用では、スキャンされたデータの検証やエラーハンドリングを強化する必要があります
- ブロックチェーン統合やデータベース接続は、このプロトタイプには含まれていません

## 今後の展望

- ブロックチェーン技術の統合
- リアルタイムの配送追跡機能の実装
- ユーザー認証システムの強化
- パフォーマンスの最適化とスケーラビリティの向上


