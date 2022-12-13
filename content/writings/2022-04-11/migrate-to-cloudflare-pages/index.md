---
title: Cloudflare Pagesに移行した
description: サイトのインフラをCloudflare Pagesに移行した
createdAt: 2022-04-11T22:57:51+09:00
---

元々S3 + Cloudfrontで構築していたこのサイトだが、今日思い立ってCloudflare Pagesに移行した。

<https://pages.cloudflare.com/>


## 元々の構成について

以前の構成は以下の記事に書いた。

[このサイトの構築に関して](/entries/2021-11-14/about-backend-of-this-site/)

自分で構築したほうがカスタマイズできるというのと、Cloudfront周りの素振りをしたかったのでこの構成にした記憶がある。

## 移行した理由

- 気分が乗った
  - これが一番でかい
- Cloudflare Workersを今後使ってみたかった
  - このサイトに使うかはわからないが、Pagesなど周辺サービスの理解にはなりそうかなと
- デプロイが若干面倒だった
  - 記事を書き終わったあと、`aws s3 sync --delete`で毎回手動デプロイしていた
  - 自動化しろって話ではあるんだが、GitHub Actionsの枠を気にしたくなかったり、CodeBuildはあまり使いたくなかったしで気が乗らなかった
- 前の構成に満足した

## デプロイに関して

[コンテンツ](https://github.com/ytakhs.com)と[サイト実装](https://github.com/ytakhs/ytakhs.com-frontend)とでリポジトリが別れているので、新しくリポジトリを作りsubmoduleで束ねる形にした。

`git submodule update --remote`してプッシュすればCloudflare Pagesの方で自動的にデプロイが始まる。

リポジトリが別れてるせいでこれでも若干面倒だが許容範囲ではある。

## 所感

これからCloudflare Workersとか色々触ってみたい。

今このサイトはNext.jsで作っているが、[Remix](https://remix.run)とかで作り直すのも良さそうと思っている。
