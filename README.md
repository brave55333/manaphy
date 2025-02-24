# manaphy

## 概要

## Live Demo

[https://manaphy-nine.vercel.app/](https://manaphy-nine.vercel.app/)

## How to work

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

- **フロントエンドのビルド**

  ```bash
  yarn frontend build
  ```

- **フロントエンドの起動**

  ```bash
  yarn frontend dev
  ```