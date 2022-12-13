---
title: Next.jsのRenderingパターン
description: Next.jsのRenderingパターン
createdAt: 2022-03-09T22:08:30+09:00
---

以下に SSG と SSR とが紹介されているものの、Next.js は静的ファイル生成もサーバー起動もでき、何がどの機能に属しているのか混乱したので自分用にまとめた。

<https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering>

## Pre-rendering

### 静的ファイル生成

`next export`で HTML,CSS, JS などを生成し CDN などから配信する方法。

以下にあるようにいくつか利用できない機能がある。

<https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features>

### サーバー起動

`next start`でサーバーを立ち上げる方法。

#### SSG

`next start`を実行する前に、`next build`を実行する必要があるが、そこで生成されたものをそのままレスポンスとして返す。

`getServerSideProps`関数を定義しなければ自動的にこれになると思われる。

なお、動的なルーティングのページ(`/pages/:id`など)は通常 SSG できないが、Next.js では`getStaticPaths`関数の fallback オプションを true もしくは blocking にすることで静的に生成できなかったページをレンダリングすることができる。

<https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false>

<https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration>

#### SSR

これは Next.js のサーバーへのリクエスト時に HTML を生成する。

`getServerSideProps`関数内で、外部サーバーからデータを取得できたりする。

## CSR

Pre-rendering で生成した HTML に対して JS で動きがつけられる。よくあるブラウザ上での JS の DOM 操作。
