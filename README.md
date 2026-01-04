# Leo's Tech Blog

基于 Hugo + Terminal 主题的个人技术博客。

## 快速开始

### 本地开发

```bash
# 启动开发服务器（含草稿）
hugo server -D

# 访问 http://localhost:1313
```

或使用 VSCode：按 `F5` 选择 "Hugo Server"

### 新建文章

```bash
# 创建新文章
hugo new posts/ai-infra/my-article.md
hugo new posts/cloud-native/my-article.md
hugo new posts/thoughts/my-article.md
```

### 文章格式

```yaml
---
title: "文章标题"
date: 2024-01-15
draft: false                    # true=草稿，不发布
tags: ["标签1", "标签2"]
categories: ["AI Infra"]        # AI Infra / Cloud Native / 随想
description: "文章摘要"
---

正文内容...
```

### 构建发布

```bash
# 本地构建
hugo --minify

# 推送到 GitHub 自动部署
git add .
git commit -m "add: new article"
git push
```

## 目录结构

```
.
├── config.toml          # 站点配置
├── content/
│   ├── posts/           # 博客文章
│   │   ├── ai-infra/    # AI 基础设施
│   │   ├── cloud-native/# 云原生
│   │   └── thoughts/    # 随想
│   ├── about.md         # 关于页面
│   └── search.md        # 搜索页面
├── layouts/             # 自定义模板（覆盖主题）
├── static/              # 静态资源
│   └── CNAME            # 自定义域名
└── themes/terminal/     # 主题（Git submodule）
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `hugo server -D` | 启动开发服务器（含草稿） |
| `hugo server -D -F` | 含草稿 + 未来日期文章 |
| `hugo --minify` | 构建生产版本 |
| `hugo new posts/xxx.md` | 新建文章 |
| `hugo list all` | 列出所有文章 |
| `hugo list drafts` | 列出草稿 |

## 部署

推送到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

站点地址：https://blog.lei6393.com
