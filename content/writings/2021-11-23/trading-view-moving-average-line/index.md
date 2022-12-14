---
title: TradingViewで移動平均線を引く
description: TradingViewで移動平均線を引くメモ
createdAt: 2021-11-23T16:35:25+09:00
---

TradingView で移動平均線を引くメモ。

TradingView では Pine 言語なるスクリプト言語を書くことでインジケータを引くことができる。

移動平均線にもいろいろあり、TradingView のコミュニティでも様々なものが公開されており利用することができる。

自分は 50 日と 200 日の単純移動平均線を一度に引けるものが欲しかったため、自作することにした。

```
//@version=5
indicator(title="$MA", shorttitle="MA", overlay=true)

src = input.source(close, title="closing price")

ma_50_length = input.int(50, title="50-day", minval=1)
ma_200_length = input.int(200, title="200-day", minval=1)

ma_50 = ta.sma(src, ma_50_length)
ma_200 = ta.sma(src, ma_200_length)

plot(ma_50, color=color.orange, title="50-day moving average")
plot(ma_200, color=color.blue, title="200-day moving average")

```

参考

- <https://tradetech.online/tradingview-indicator-ma3/>
- <https://www.tradingview.com/pine-script-docs/en/v5/Introduction.html>
- <https://jp.tradingview.com/pine-script-reference/v5/>
