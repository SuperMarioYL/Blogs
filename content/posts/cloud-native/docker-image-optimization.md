---
title: "Docker 镜像优化：从 1GB 到 100MB"
date: 2024-01-03
draft: false
tags: ["Docker", "容器化", "性能优化"]
categories: ["Cloud Native"]
description: "Docker 镜像瘦身实战技巧"
---

## 问题：为什么镜像这么大？

```bash
$ docker images
REPOSITORY    TAG       SIZE
my-python-app latest    1.2GB  # 太大了！
```

## 优化策略

### 1. 选择合适的基础镜像

```dockerfile
# ❌ 不推荐：完整版镜像
FROM python:3.11          # 约 1GB

# ✅ 推荐：slim 版本
FROM python:3.11-slim     # 约 150MB

# ✅ 更推荐：alpine 版本
FROM python:3.11-alpine   # 约 50MB
```

### 2. 多阶段构建

```dockerfile
# === 构建阶段 ===
FROM golang:1.21 AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /app/server

# === 运行阶段 ===
FROM alpine:3.18

COPY --from=builder /app/server /server
EXPOSE 8080
CMD ["/server"]
```

**效果**：
- 构建镜像：~800MB
- 最终镜像：~15MB ✓

### 3. 合并 RUN 指令

```dockerfile
# ❌ 不推荐：多个 RUN
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# ✅ 推荐：合并 RUN
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
```

### 4. 利用构建缓存

```dockerfile
# ✅ 依赖文件单独 COPY
COPY requirements.txt .
RUN pip install -r requirements.txt

# 源代码后 COPY（经常变动）
COPY . .
```

### 5. 使用 .dockerignore

```bash
# .dockerignore
.git
.gitignore
node_modules
__pycache__
*.pyc
.env
.vscode
*.md
tests/
docs/
```

## Python 项目最佳实践

```dockerfile
FROM python:3.11-slim AS builder

WORKDIR /app

# 安装编译依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 创建虚拟环境
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# === 最终镜像 ===
FROM python:3.11-slim

# 复制虚拟环境
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
COPY . .

# 非 root 用户
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000
CMD ["python", "main.py"]
```

## Node.js 项目最佳实践

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# === 最终镜像 ===
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

## 镜像分析工具

### dive

```bash
# 安装
brew install dive

# 分析镜像
dive my-python-app:latest
```

```
┌─────────────────────────────────────────┐
│ Layer Details                           │
├─────────────────────────────────────────┤
│ Size: 156 MB                            │
│ Command: RUN pip install -r req.txt     │
│                                         │
│ Potential wasted space: 23 MB           │
│ - /root/.cache/pip (23 MB)              │
└─────────────────────────────────────────┘
```

### docker history

```bash
$ docker history my-app:latest --no-trunc
IMAGE          CREATED        SIZE      COMMAND
abc123         2 hours ago    156MB     pip install...
def456         2 hours ago    50MB      apt-get install...
```

## 优化效果对比

```
优化前                    优化后
────────────────────────────────────────
FROM python:3.11         FROM python:3.11-slim
多个 RUN 指令            合并 RUN 指令
无 .dockerignore         有 .dockerignore
单阶段构建               多阶段构建
────────────────────────────────────────
1.2 GB                   120 MB  (↓90%)
```

## 检查清单

```bash
□ 使用 slim/alpine 基础镜像
□ 使用多阶段构建
□ 合并 RUN 指令
□ 清理缓存和临时文件
□ 添加 .dockerignore
□ 使用 dive 分析镜像层
□ 以非 root 用户运行
```

```bash
$ docker images | awk '{print $1, $7}'
my-app 120MB  # 目标达成！
```
