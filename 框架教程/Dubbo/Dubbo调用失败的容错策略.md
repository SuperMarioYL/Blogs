# Dubbo调用失败的容错策略

<!-- TOC -->

- [Failover Cluster 失败重试](#failover-cluster-失败重试)
- [Failfast Cluster 快速失败](#failfast-cluster-快速失败)
- [Failsafe Cluster 失败安全](#failsafe-cluster-失败安全)
- [Failback Cluster 失败自动恢复](#failback-cluster-失败自动恢复)
- [Forking Cluster 并行调用](#forking-cluster-并行调用)
- [Broadcast Cluster 广播调用](#broadcast-cluster-广播调用)

<!-- /TOC -->

## Failover Cluster 失败重试

- 当调用失败时会从存储的服务提供方的服务器中选择另一台重新调用
- 通常用于读操作或者具有幂等性的更新操作
- 可通过 `retries="2"` 来设置重试次数（不包括正常调用的那一次）

## Failfast Cluster 快速失败

- 当调用失败时立即抛出异常，通常用于非幂等性的操作

## Failsafe Cluster 失败安全

- 当调用失败时，忽略异常，并写入审计日志

## Failback Cluster 失败自动恢复

## Forking Cluster 并行调用

## Broadcast Cluster 广播调用