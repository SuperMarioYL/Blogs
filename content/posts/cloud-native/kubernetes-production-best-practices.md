---
title: "Kubernetes 生产环境最佳实践"
date: 2024-01-08
draft: false
tags: ["Kubernetes", "DevOps", "云原生", "最佳实践"]
categories: ["Cloud Native"]
description: "总结在大规模 K8s 集群中踩过的坑和解决方案"
---

## 资源管理

### 始终设置 Resource Limits

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: my-app:v1.0
    resources:
      requests:
        memory: "256Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "500m"
```

**黄金法则**：
- `requests` = 应用正常运行所需资源
- `limits` = 应用最大可用资源
- `limits` / `requests` 比例建议 ≤ 2

### QoS 等级

```
┌─────────────────────────────────────────────┐
│  Guaranteed (最高优先级)                     │
│  requests == limits                          │
├─────────────────────────────────────────────┤
│  Burstable (中等优先级)                      │
│  requests < limits                           │
├─────────────────────────────────────────────┤
│  BestEffort (最低优先级)                     │
│  无 requests 和 limits                       │
└─────────────────────────────────────────────┘
```

## 健康检查

### 三种探针配置

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5

startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

**常见错误**：
- ❌ `initialDelaySeconds` 设置过短，导致容器反复重启
- ❌ 未区分 `liveness` 和 `readiness`
- ❌ 健康检查端点有依赖外部服务

## Pod 反亲和性

避免单点故障，确保 Pod 分散部署：

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
        - key: app
          operator: In
          values:
          - my-app
      topologyKey: kubernetes.io/hostname
```

## PodDisruptionBudget

保护服务在节点维护期间的可用性：

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: my-app-pdb
spec:
  minAvailable: 2  # 或使用 maxUnavailable
  selector:
    matchLabels:
      app: my-app
```

## 安全最佳实践

### 非 Root 运行

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  capabilities:
    drop:
      - ALL
```

### Network Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

## 监控告警

### 关键指标

```bash
# 节点资源
sum(rate(container_cpu_usage_seconds_total[5m])) by (node)
sum(container_memory_working_set_bytes) by (node)

# Pod 状态
kube_pod_status_phase{phase="Failed"}
kube_pod_container_status_restarts_total

# API Server
apiserver_request_duration_seconds_bucket
apiserver_request_total{code=~"5.."}
```

## 总结清单

```
□ 所有 Pod 设置 resources requests/limits
□ 配置 liveness 和 readiness 探针
□ 使用 PodDisruptionBudget
□ 配置 Pod 反亲和性
□ 使用 NetworkPolicy 限制流量
□ 容器以非 Root 用户运行
□ 配置 Prometheus + Grafana 监控
□ 设置关键告警规则
```

```bash
$ kubectl get pods --all-namespaces | grep -v Running
# 目标：输出为空
```
