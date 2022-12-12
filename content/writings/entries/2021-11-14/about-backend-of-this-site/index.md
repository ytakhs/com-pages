---
title: このサイトの構築に関して
createdAt: 2021-11-14 10:31:24+09:00
---

このサイトは S3 + CloudFront で構築している。(2021/11/14 時点)

GitHub Pages とか Netlify とか他にも選択肢はあったが、自分で構築してカスタマイズしたいという気持ちがあったので自前で構築した。

この S3 + CloudFront 構成に関して主に 2 つの選択肢が存在する。

1. S3 の Website Hosting 機能を使い、前段に CloudFront を配置する
2. CloudFront の OriginAccessIdentity 経由で配信する

---

<https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html>

1 の Website Hosting は構築は 2 と比較して楽。

ただし、S3 バケットのコンテンツを public な状態にする必要があったり、CF との通信が http になったりする点がイマイチ。

別に重要な情報を扱うわけではないのでそれでも問題はないのだが、あまり妥協したくもなかったので 1 は選択肢から外した。

---

<https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html>

2 はコンテンツを public にする必要はなく、CloudFront の Origin Access Identity に対するポリシーだけ付与すればよいためセキュアにはなる。

ただし、S3 の Website Hosting と違い、CloudFront のコンテンツ配信だけだとルートディレクトリ以外の index.html を補完してくれない。

例)

- Expected
  - /foo/bar => /foo/bar/index.html を読み取ってほしい
- Actual
  - /foo/bar => /foo/bar を読みとろうとし、403 エラーになる

これを解決するために、CloudFront Functions でリクエストされたパスを変換するような構成にした。

CloudFront Functions は 2021/5 月に利用できるようになった機能。

<https://aws.amazon.com/jp/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/>

Lambda@Edge よりも制約はあるものの 1/6 のコストで実行することができるため、パス変換くらいの軽い処理であればこれで十分。

あとロールとかポリシーとかの管理も不要なので楽。

実装は以下の記事を参考にした。

<https://aws.amazon.com/jp/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/>

S3 + CloudFront 構成のパス変換 Lambda@Edge で対応する記事だが、CloudFront Functions でも同様にできた。

実際に CloudFront Functions に設定したコードは以下。

```js
function handler(event) {
  var request = event.request;

  var oldUri = request.uri;
  var newUri = oldUri.replace(/\/$/, "/index.html");

  request.uri = newUri;

  return request;
}
```

注意点としては、CloudFront Functions では ECMAScript 5.1 準拠な JS しか使えないため、新しい JS の機能は利用できない。

そのため変数宣言も`const`ではなく`var`を使っている。

---

そのうち飽きたら別の構成になってる可能性はあるが、しばらくはこの構成でいきたい。
