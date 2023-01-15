---
title: Type ChallengeのIsNeverをみる
description: Type ChallengeのIsNeverをみる
createdAt: 2023-01-15 21:56:49+09:00
---

Type Challenge の [IsNever](https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md) をやっていたときの学びのメモ。

IsNever はＴを渡した時にそのＴが never 型か否かを判定し、never 型であれば true を、そうでなければ false を返すという問題。

ぱっと考えると以下のように実装すればよさそうにも思える。

が、(難易度が medium なので当然といえば当然なのだが)これだと上手くいかない。

```typescript
type IsNever<T> = T extends never ? true : false;

type A = IsNever<never>;
// => type A = never;
```

## Distributive Conditional Types とは

これは期待される動作らしい。

以下の Issue にも解説がある。

<https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919>

Conditional Types が Generic type に適用されるとき、それは Distributive Conditional Types と呼ばれるになるらしい。

公式ドキュメントには以下に記載されている。

<https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types>

> When conditional types act on a generic type, they become distributive when given a union type.

つまり、以下のような動作になる。(公式の例を拝借)

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type Foo = ToArray<string | number>;
// => type Foo = string[] | number[] のようになる
// (type Foo = (string | number)[] ではない)
```

また、never は空の Union type として定義されているらしい。

これは以下のように never と他の型 の union をつくると never 型が消えてしまうことからも、確かにそれっぽい挙動をしている。

```typescript
type Bar = string | never;
// => type Bar = stringとなる
// => type Bar = neverなどにはならない
```

この前提をもとに、IsNever の挙動を見る。

IsNever に never が代入された場合、never は空の union で分配する中身がないため never として判定される、ということのよう。(多分)

## IsNever の実装

Distributive Conditional Types の挙動を避ける方法もあり、それは`[]`で extends のオペランドを囲えばよい。

つまり、IsNever は以下のように実装すると想定通りの挙動になる。

```typescript
type IsNever<T> = [T] extends [never] ? true : false;

type A = IsNever<never>;
// => type A = true;
```
