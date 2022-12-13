---
title: k8sのlabelsが色々ある件
description: k8sのlabelsが色々ある件
createdAt: 2022-04-08T13:25:48+09:00
---

<https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>

例えば ↑ のドキュメントから拝借した Deployment に、`metadata.labels`, `spec.selector.matchLables`,`spec.template.metadata.labels`の 3 つがある。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

それぞれ、以下のような役割になっているようだ。

- `metadata.labels`
  - Deployment 自体に付与される label
- `spec.selector.matchLabel`
  - Deployment に所属させる対象の Pod の label
- `spec.template.metadata.labels`
  - Pod に付与される label

特に`matchLabel`は`template.metadata.label`から拝借してくれないのか、という疑問はある。

が、Deployment 自体が ReplicaSet、ひいては Pod のラッパー？みたいなものだと考えると、まあそんなもんかとも思う。

## 参考

- <https://medium.com/@zwhitchcox/matchlabels-labels-and-selectors-explained-in-detail-for-beginners-d421bdd05362>
