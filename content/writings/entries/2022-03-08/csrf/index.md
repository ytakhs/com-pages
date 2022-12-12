---
title: WebAPIのCSRF対策を調べた
description: WebAPIのCSRF対策を調べたときのメモ
createdAt: 2022-03-08T08:23:50+09:00
---

ブラウザから WebAPI 作る際に、CSRF 対策どうすればよいのかイマイチ自信がなかったので調査した。

## CSRF とは

以下がわかりやすそう。

<https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_6.html>

## 対策方法

いろいろなサイト調べてそこそこの分量の文章を書いたけど結局 OWASP Cheet Sheet にいろいろなパターンあったのでこれを読むのが良さそうと思い全部消しました。

<https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html>

OWASP とは、Open Web Application Security Project の略で、Web アプリケーションのセキュリティ向上を目的としたコミュニティ。

<https://owasp.org>

Cheet Sheet には CSRF 以外の脆弱性についても書いてあるので困ったら参照すると良さそう。

## まとめ

- 原則フレームワークが提供している防御機能を使う
- それが難しい場合は OWASP にいろいろな対策が掲載されているのでそれらを検討する
  - その他セキュリティに詳しい人や団体の情報を参考にする
- 間違ってもその辺のブログに書いてあるような対策方法をそのまま真似しない

という心づもりでいるのが良さそう。
