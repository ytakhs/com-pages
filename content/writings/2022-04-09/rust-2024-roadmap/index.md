---
title: Rust 2024に向けてのロードマップを読んだ
description: Rust 2024に向けてのロードマップを読んだ
createdAt: 2022-04-09T22:23:04+09:00
---

<https://blog.rust-lang.org/inside-rust/2022/04/04/lang-roadmap-2024.html>
<https://lang-team.rust-lang.org/roadmaps/roadmap-2024.html>

Rust 2024 に向けてのロードマップとして 以下の 3 つの題目それぞれのビジョンや未来について書いてある。

- Flatten the (learning) curve
- Help Rust's users help each other
- Help the Rust project scale

## 所感

各題目に対して`How you can help`のセクションがあるなど、オープンな姿勢が感じられて良かったし自分も何かコントリビュートしたくなった。

直近で検討中の新機能として紹介されている`let-else`や`let-chains`はあったら便利そうだなと思った。

[`let-else`](https://github.com/rust-lang/rfcs/pull/3137)は以下のような構文。

```rust
let a = foo.bar() else {
  return Err("error");
};
```

[`let-chains`](https://github.com/rust-lang/rust/issues/53667)は以下のような構文。

```rust
if let Some(bar) = foo.bar()
  && let Some(baz) = foo.baz()
  {
    return Ok(());
  }
```

他にも色々検討中のものが紹介されていた。

- <https://rust-lang.github.io/impl-trait-initiative/explainer/tait.html>
- <https://rust-lang.github.io/generic-associated-types-initiative/>
- <https://rust-lang.github.io/async-fundamentals-initiative/explainer/async_fn_in_traits.html>
- <https://github.com/rust-lang/lang-team/issues/88>
- <https://github.com/rust-lang/lang-team/issues/137>

Rust 開発チームが鋭意進行中のプロジェクトは以下のサイトを見るのが良さそう。

<https://lang-team.rust-lang.org/initiatives.html>

Rust は好きな言語だけど、なかなか学習にもコストがかかったり書くのが大変だったりは感じてたので、今後どう進化していくのか楽しみ。
