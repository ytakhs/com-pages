---
title: IMWheelでUbuntu環境のマウスのスクロールのスピードを調整した
description: IMWHeelでUbuntu環境のマウスのスクロールのスピードを調整した
createdAt: 2022-03-19T21:29:01+09:00
---

Ubuntu 環境でマウスのホイールを使ったスクロールが遅いので、imwheel を使って調整した。

やったことは基本すべて以下に載っている。

<https://wiki.archlinux.jp/index.php/Imwheel>

自分が行ったのは以下の設定。

- .imwheelrc を設定
- systemd のサービスとして IMWheel を起動

## 設定上の注意

Arch のドキュメントにも書いてあるが、戻る・進むボタンなどがマウスのボタンに割り当てられている場合 imwheel 起動時に`-b`オプションをつけないと、戻る・進むが効かなくなる可能性があるので注意(自分の環境だと効かなくなった)

`-b`は`--buttons`オプションで、imwheel がどのボタンを認識するかを制限できる。

引数には Button Number を指定する(以下`man imwheel`より引用)

```
Index   Interpreted As    Button Number   Name in imwheelrc
1       Wheel Up          4               Up
2       Wheel Down        5               Down
3       Wheel Left        6               Left
4       Wheel Right       7               Right
5       Thumb Button 1    8               Thumb1
6       Thumb Button 2    9               Thumb2
7       Extra Button 1    10              ExtBt7
8       Extra Button 2    11              ExtBt8
etc.
```

デフォルトだと`-b "4 5 6 7 8 9"`が設定されている。

尚、Arch のドキュメントでは`-b 45`と指定しているが、Ubuntu の`man`には以下のように書いてある。

> The button-spec must be sur‐rounded by quotes. Each button number must be separated by a space.

もしかしたら引数の指定方法は環境とかバージョンによって異なるのかもしれないので`man`を確認したほうが良さそう。

自分は上下左右のスピードを調整したかったので systemd に以下のように設定した。

```
ExecStart=/usr/bin/imwheel -b "4 5 6 7"
```

これでマウスのホイール操作がサクサク動くようになった。
