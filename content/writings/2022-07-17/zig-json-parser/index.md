---
title: ZigでJSONパーサーを書いた
description: ZigでJSONパーサーを書いた
createdAt: 2022-07-17T22:04:20+09:00
emoji: 🦖
---

ZigでJSONパーサーを書いたみた。

<https://github.com/ytakhs/zig-json-parser>

といっても、[RFC](https://www.rfc-editor.org/info/rfc8259)の通りに実装したわけではなく雰囲気で実装したものなので、真の意味でのJSONパーサーとは言えないかもしれない。

特に文字列部分はエスケープ処理などを行ってなかったりと結構処理を端折ってるので、これはそのうち対応したい気持ちはある。

実は今年の2月に一度ZigでJSONパーサーを書いてみてたのだが、テスト中に発生するメモリリーク周りでハマって上手く直すことができず、放置していた。

<https://github.com/ytakhs/json-parser-zig>

(リポジトリの名前が紛らわしいが、消すのももったいないので戒めに残してある)

## 実装に関して

パーサー実装素人ながら結構シンプルに実装できた気はしている。

以前の実装では字句解析と構文解析を別々に行っていたが、今回は特に分けずに行った。JSONパーサーくらいの簡単なものなら分ける必要がなかった。

また、細かい話だと、Zigではwhile文で他の言語のfor文のように後処理を追加できるので、それを使ってみた。

具体的には以下の`end += 1`の部分。

<https://github.com/ytakhs/zig-json-parser/blob/51f7246518b872da64afc8525691a58dd3dd4bc4/src/main.zig#L117-L121>


```zig
while (self.buf[end] != '"') : (end += 1) {
    if (end >= self.buf.len) {
        return Error.ParserError;
    }
}
```

今回使ってはみたものの、他の言語にはない独特な文法な気がしていて、わかりにくい気もしているが、自分がまだZigになれてないだけかもしれない。
