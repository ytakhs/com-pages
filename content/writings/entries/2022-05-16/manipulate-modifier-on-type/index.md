---
title: "[TypeScript]型のmodifierを操作する"
description: 型のmodifierを操作する
createdAt: 2022-05-16T21:04:05+09:00
---

<https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers>

```ts
type Foo {
  readonly bar: string;
  baz?: number;
}
```

modifierとは上記でいう、`readonly`や`?`。

これらは`+`と`-`を使うことで、型に付与したり、削除したりできる。

(尤も、`+`に関しては特に指定が場合に自動付与されているため、明示的に使うのはもっぱら`-`の方かと思う。)

例えば強制的にmodifierを消す型は以下のようになる。


```ts
type Foo = {
  readonly bar: string;
  baz?: number;
}

type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
}
type WritableFoo = RemoveReadonly<Foo>;

type RemoveOptional<T> = {
  [P in keyof T]-?: T[P];
}
type RequiredFoo = RemoveOptional<Foo>
```

[Playgroundでの実行結果](https://www.typescriptlang.org/play?ssl=14&ssc=1&pln=14&pc=39#code/C4TwDgpgBAYg9nKBeKBvAUFKAnCBDAEzgDsAbEKAIz2wC4oBnYbAS2IHMBuTKvALwD89YgFcAtpQjZuAX3TpQkKACUIYuADcIqwiXIAeACoA+ZGh4BaXLrIUA2gAUobKAGsIIOADMohgLr0ho5+sgrg0ADqrMB4lKQQ8IgoqupaOkS2+onG3GFKKZoQAPJgwCwkeKRGpigYWI7OxG4e3r5+FkK+waGK0KoAjiIsuASJZgVaJWUVVdlAA)
