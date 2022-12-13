---
title: "[TypeScript]AwaitedとReturnTypeを調べたメモ"
description: TypeScriptのAwaited, ReturnTypeの挙動について調べた
createdAt: 2022-05-10T23:01:37+09:00
emoji: 🖐
---

## 経緯

Remixのチュートリアルを眺めていたら、`Awaited<ReturnType<typeof getPosts>>`という型定義が出てきて気になったので調べた。

https://remix.run/docs/en/v1/tutorials/blog#a-little-refactoring

## Awaited型とは

TypeScript4.5から入ったAwaited型

<https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements>

導入されたPRは以下。

<https://github.com/microsoft/TypeScript/pull/45350>

この型ではネストしたPromiseを再帰的に評価した結果の型として表現できる。

※以下のコードは上記リリースノートのURLから抜粋

```typescript
// A = string
type A = Awaited<Promise<string>>;
// B = number
type B = Awaited<Promise<Promise<number>>>;
// C = boolean | number
type C = Awaited<boolean | Promise<number>>;
```

これにより、Promise.allなどの型定義が便利になるようだ。

Promise.resolveの型は`resolve<T>(value: T | PromiseLike<T>): Promise<T>`みたいな形になっており、TまたはPromiseLikeを受け取れる。

つまり、PromiseをラップしたPromiseは以下のような型になる。

```ts
type Foo = Promise<number | PromiseLike<number>>;
const foo: Foo = new Promise((r1) => r1(new Promise((r2) => r2(1))));
```

これを前提においた上で以下のような関数を定義を考える。

```ts
type Foo = Promise<number | PromiseLike<number>>;

async function foo(): Promise<[number]> {
  const foo: Foo = new Promise((r1) => r1(new Promise((r2) => r2(1))));

  return await Promise.all([foo]);
}
```

4.4以前だと、Promise.allにAwaitedがなかったため、`await Promise.all([foo])`の型が、`[number | PromiseLike<number>]`になってしまい、エラーになってしまう。

[TypeScript Playgroundで試した結果(4.4.4)](https://www.typescriptlang.org/play?ts=4.4.4#code/C4TwDgpgBAYg9nKBeKAFATnAtgSwM4QA8AdgK5YBGE6UAPmprgQDI4DWRZl1AfDwNwAoQQEM8IYgGMoAM1JTgOOMVkIAFAEoAXA2z4iAbS5V0AXR5QA3oKhRJyvMFVwd8RCmIQA7rqYQ1augAjBrIFsFqnj4YegQB6ABMoUjhCWohGplCNlDoEMCk6CoiXiI4TjF+AHQiADa1agYyCKYaQgC+gkA)

一方、4.5以上だとPromise.allにAwaitedが導入されているため、`Promise<[number]>`として評価され通るようになる、ということらしい。

[TypeScript Playgroundで試した結果(4.5.5)](https://www.typescriptlang.org/play?ts=4.5.5#code/C4TwDgpgBAYg9nKBeKAFATnAtgSwM4QA8AdgK5YBGE6UAPmprgQDI4DWRZl1AfDwNwAoQQEM8IYgGMoAM1JTgOOMVkIAFAEoAXA2z4iAbS5V0AXR5QA3oKhRJyvMFVwd8RCmIQA7rqYQ1augAjBrIFsFqnj4YegQB6ABMoUjhCWohGplCNlDoEMCk6CoiXiI4TjF+AHQiADa1agYyCKYaQgC+gkA)

## ReturnTypeとは

以下のドキュメントが全てではあるが、関数型の返り値を取得するUtility Types。

<https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype>

`typeof`と併用することで、関数の実体から型を抽出して使うこともできる。

<https://www.typescriptlang.org/docs/handbook/2/typeof-types.html>

```typescript
function foo(): string {
  return "foo";
}

// type Foo = string;
type Foo = ReturnType<typeof foo>;
// type Bar = string;
type Bar = ReturnType<() => string>;
```
