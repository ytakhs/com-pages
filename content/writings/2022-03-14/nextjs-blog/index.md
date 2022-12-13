---
title: Next.jsでサイトを作り直した
description: Next.jsでサイトを作り直した話
createdAt: 2022-03-14T22:35:00+09:00
---

以前[Zola](https://www.getzola.org)で作ったこのサイトを Next.js で作り直した。

[https://ytakhs.com/entries/2021-11-10/first/](/entries/2021-11-10/first)

ちょうど諸事状で Next.js のプロジェクトに関わる機会があり、その素振りとして試しに使ってみている。

また今回はソースコードも public にした。

<https://github.com/ytakhs/ytakhs.com-frontend>

↑ はソースコードのみで実際のコンテンツはそのうちまた Next.js から別の実装にリプレイスすることを想定し別のリポジトリに分割した。一緒にしておくとリプレイス時に倒そうなので。

コンテンツは今の所 private のままだがそのうち public にする予定。

## 主に使用した技術

- 言語

  - TypeScript

- フレームワーク

  - [Next.js](https://nextjs.org)

- スタイル

  - [tailwindcss](https://tailwindcss.com)

- Markdown パーサー
  - [react-markdown](https://github.com/remarkjs/react-markdown)
  - 内部で[remark](https://github.com/remarkjs/remark)が使われている。

上記にプラスして linter などいろいろ試しに入れてみた。

また、インフラは S3 + Cloudfront から変更してない。

コンテンツのディレクトリ構成としては以下のように`/entries/yyyy-MM-dd/slug/`の中に index.md や画像を入れる構成にしている。

```
.
└── entries
    └── 2022-03-14
        └── nextjs-blog
            └── index.md
```

一点困った点として、Next.js は画像などの静的ファイルは public 配下に配置するしかなく、画像ファイルを index.md と同階層に置けないという問題が発生した。

[next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)というライブラリを使えば解決できるというような記事も見かけたが、このライブラリ自体数年メンテナンスが止まっており、中身も Webpack の設定追加を行うようなものだったため今後の Webpack 仕様変更などで壊れる可能性(そもそも現状でも動くかわからないが)もあり、採用を見送らざるを経なかった。

結局どうしたかというと、`public/entries`を Git 管理から外し、ビルド時にコンテンツから`public/entries`に画像をコピーする、という戦略を採用した。

画像を多用する予定は今の所ないため、これで一旦は大丈夫なはず。

あと一般的な静的ファイルのサイトを作るには`trailingSlash: true`の設定も必要だった。

これにより export 時に`xxx.html`ではなく`/xxx/index.html`を生成してくれるようになる。

<https://nextjs.org/docs/api-reference/next.config.js/trailing-slash>
