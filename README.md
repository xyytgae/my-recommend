# My recommend

## 概要

Instagramを写真を共有するアプリケーションです。  
Instagramにあるような写真投稿、いいね、検索機能に加えて、ソートやハッシュタッグを写真上に表示する機能があります。

![スクリーンショット 2023-03-14 213704](https://user-images.githubusercontent.com/51901346/225003459-e14405bf-7cb0-40e9-99c2-c1874339c7ed.png)
![スクリーンショット 2023-03-14 213801](https://user-images.githubusercontent.com/51901346/225003465-57acbbdd-f677-40c8-8fbc-00e42bb8f534.png)
![スクリーンショット 2023-03-14 213818](https://user-images.githubusercontent.com/51901346/225003473-94003961-3f4c-40c6-afcd-7463e8d48094.png)

- 検索、ソート  

https://user-images.githubusercontent.com/51901346/225002538-6d0a45b8-2453-4a46-873c-e5d8533ca46a.mp4

- 写真投稿

https://user-images.githubusercontent.com/51901346/225002575-3ab753a9-d995-4ec3-955b-40b7b5d91995.mp4


## 機能一覧
- 写真、ハッシュタグ投稿
- いいね
- 検索
- ソート

## 実装予定機能
- 複数写真投稿
- 編集
- 削除
- ハッシュタグカラー変更

## 環境構築

```bash
# クローン
$ git clone https://github.com/xyytgae/my-recommend.git

# パッケージインストール
$ yarn

# localhost:3000でサーバー立ち上げ
$ yarn dev
```

## 技術
- Nuxt.js
- Vuetify.js
- Supabase
- GraphQL

## 開発中によく使うコマンド
```bash
# git czを使用しgit commitを行う
$ yarn commit

# GraphQLの型を生成
$ yarn codegen

# Supabaseから型を生成
$ yarn supabase:types
```


## ER図

```mermaid
erDiagram
  users {
    uuid id PK
    timestamp updated_at
    text user_name
    text name
    text avatar_url
    text twitter_url
    text instagram_url
    text email
  }

  recommends {
    uuid id PK
    timestamp created_at
    uuid user_id FK
  }

  images {
    uuid id PK
    timestamp created_at
    varchar(2083) url
    uuid recommend_id FK
  }

  hashtags {
    uuid id PK
    timestamp created_at
    text text
    varchar(8) x
    varchar(8) y
    uuid image_id FK
  }

  likes {
    uuid id PK
    timestamp created_at
    uuid user_id FK
    uuid recommend_id FK
  }

  users ||--o{ recommends : "1人のユーザーは0以上の投稿を持つ"
  users ||--o{ likes : "1人のユーザーは0以上のいいねを持つ"
  recommends ||--|{ images : "1つの投稿は1つ以上の画像を持つ"
  images ||--o{ hashtags : "1つの画像は0以上のハッシュタグを持つ"
  recommends ||--o{ likes : "1つの投稿は0以上のいいねを持つ"
```

## ディレクトリ構成

```
.
├─apis // コントローラー
├─assets
├─components  // 使い回すコンポーネント
├─config  // envファイル
├─fragments  // apiに直接アクセス可能な使い回さないコンポーネント
├─graphql  // GraphQLのquery、mutation
├─layouts
├─middleware
├─modules  // 共通関数
├─pages
├─plugins
├─public
│  └─images
├─sql  // セットアップSQL
├─src
│  └─gql  // 自動生成したGraphQLの型
├─store  // 状態管理
└─types  // 手動で作成した型、自動生成したSupabaseの型

```