---
title: k8sのStatefulSet
description: k8sのStatefulSet
createdAt: 2022-04-08T22:47:11+09:00
---

<https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>

- Deployment とは異なり、管理する Pod の順序や唯一性を担保してくれる。
- volumeClaimTemplates によって定義される PersistentVolume を各 Pod が持つ。
  - すべての Pod に対して 1 つの PersistentVolume をもたせる場合は Deployment を使う。
- 各 Pod がそれぞれ Volume を持つことが保証されているので、DB のレプリケーションなどに向いてそう
- Headless Service が必要で、ClusterIP などは利用できない(2022/4 時点)
  - DNS は`<Pod名>-{0..N}.<Service名>.<Namepace名>.svc.cluster.local`のようになる
  - 例えば`<Pod名>-0`をプライマリ DB,それ以外をレプリカ DB、みたいな構成にできる
- MySQL を構築している例
  - <https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/>

## 参考

- <https://eng-blog.iij.ad.jp/archives/9998>
