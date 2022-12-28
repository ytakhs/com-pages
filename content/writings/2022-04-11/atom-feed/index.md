---
title: Atom1.0のフィードに対応した
description: サイトを自前実装でAtom1.0に対応させた記録
createdAt: 2022-04-11T20:09:44+09:00
---

このサイトを Atom1.0 のフィードに対応させた。

Atom の仕様把握も兼ねて、RSS 対応する便利 package とかは使わずに、自分で XML を組み立てた。

## 仕様

仕様は以下を軽く読んだ。

- <https://datatracker.ietf.org/doc/html/rfc4287>
- <https://validator.w3.org/feed/docs/atom.html>
  - こっちのほうがわかりやすかった

また ValidatorW3C の方には Validator も整備されており、書いた XML が仕様的に問題ないかを確認できる。

- <https://validator.w3.org/feed/check.cgi>

## 実装

実装は node-xml を使った。

<https://github.com/dylang/node-xml>

パッケージ名は`xml`で、これと Typescript 用`@types/xml`しか依存が増えず、軽量でよい。(更新は止まってるようだが)

以下みたいに実装すればよい。

```typescript
import xml from "xml";

const feed = {
  feed: [
    { _attr: { xmlns: "http://www.w3.org/2005/Atom" } },
    { id: baseURL },
    { title: [{ _attr: { type: "text" } }, "foo"] },
    { link: [{ _attr: { rel: "alternate", href: baseURL } }] },
    {
      link: [
        {
          _attr: {
            rel: "self",
            href: new URL("/atom.xml", baseURL).href,
          },
        },
      ],
    },
    { author: [{ name: "bar" }] },
    { updated: updatedAt },
    ...entries.map((entry) => {
      return {
        entry: [
          { id: entry.permalink },
          { title: { _cdata: entry.title } },
          { updated: entry.createdAt },
          { summary: { _cdata: entry.summary } },
          { link: [{ _attr: { rel: "alternate", href: entry.permalink } }] },
          { published: entry.publishedAt },
        ],
      };
    }),
  ],
};

xml(feed, { declaration: { encoding: "UTF-8" } });
```

`xml`メソッドに `declaration` オプションをつけると`<?xml version="1.0" encoding="UTF-8" ?>`みたいな宣言を先頭に付与してくれる。

`declaration` はなくてもよいが、推奨されているのでつけておくのが良さそう。

<https://www.w3.org/TR/xml/#sec-prolog-dtd>

> Definition: XML documents should begin with an XML declaration which specifies the version of XML being used.
