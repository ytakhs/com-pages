---
title: Web Linking
description: Web Linkingについて調べた
createdAt: 2022-04-08T08:28:22+09:00
---

HTTP ヘッダで、リソース間の関係を表現するための仕様で、`Link`というフィールドを定義している。

<https://datatracker.ietf.org/doc/html/rfc8288>

Web アプリケーションを作る上では REST API のオフセット形式のページネーションで使われている印象。

例えば GitHub の REST API にもページネーションの仕様として Link ヘッダが利用されている。

<https://docs.github.com/en/github-ae@latest/rest/overview/resources-in-the-rest-api#link-header>

このサイトは特にページネーションを実装してないが、仮に Web Linkng で実装するとしたら以下のようになりそう。

```
Link: <https://ytakhs.com/entries?page=3>; rel="next",
      <https://ytakhs.com/entries?page=2>; rel="prev",
      <https://ytakhs.com/entries?page=1>; rel="first",
      <https://ytakhs.com/entries?page=99>; rel="last"
```

GitLab も同様に API のオフセット形式のページネーションで WebLinking を利用していて、こちらはオープンソースなので実装も見れる。

<https://gitlab.com/gitlab-org/gitlab/-/blob/4784d4e4607a8876feffc85935ba8dc0c29496a2/lib/gitlab/pagination/offset_header_builder.rb#L36>

なお、実際にこれでページネーションを作るとなると、結局ページ数やレコード数の合計も返す必要があるが、その仕様はないので独自ヘッダを作る必要がありそう。

## 余談: 独自ヘッダの命名

ページ数やレコード数の合計を独自ヘッダで返すとなった場合、どんなフィールド名にするかという議論になると思われる。

GitLab は`X-Total-Pages`,`X-Total`のようなヘッダで表現しているが、独自ヘッダに`X-`というプレフィックスはやめようという話もあるようだ。

- <https://zenn.dev/ys/articles/a58b02e3cbc2f839f7f1>
- <https://datatracker.ietf.org/doc/html/rfc6648>

だからどうすべきという話ではないが、頭の片隅には入れておいてよさそう。
