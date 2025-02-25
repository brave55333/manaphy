# manaphy

## 概要

## Live Demo

[https://manaphy-nine.vercel.app/](https://manaphy-nine.vercel.app/)

## How to work

- **セットアップ**

  `pkgs/contract/.env` に 以下の環境変数を設定する。

  ```txt
  PRIVATE_KEY=""
  BASESCAN_API_KEY=""
  ALCHEMY_API_KEY=""
  GAS_REPORT=true
  COINMARKETCAP_API_KEY=""
  SPLITS_API_KEY=
  ```

- **インストール**

  ```bash
  yarn
  ```

- **スマートコントラクトのテスト**

  ```bash
  yarn contract test
  ```

- **SplitsWarehouseコントラクトのデプロイ**

  ```bash
  yarn contract deploy:Split --network baseSepolia
  ```

- **PullSplitFactoryとPushSplitFactoryコントラクトのデプロイ**

  ```bash
  yarn contract deploy:SplitFactories --network baseSepolia
  ```

- **Splitコントラクトの作成**

  ```bash
  yarn contract createSplit --network baseSepolia
  ```

- **Splitコントラクトのトークンの残高確認**

  ```bash
  yarn contract getSplitBalance --network baseSepolia
  ```

- **Splitコントラクトを使ってトークンを分配する**

  ```bash
  yarn contract distribute --network baseSepolia
  ```

- **フロントエンドのビルド**

  ```bash
  yarn frontend build
  ```

- **フロントエンドの起動**

  ```bash
  yarn frontend dev
  ```