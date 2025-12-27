# Leo's Tech Blog

基于 Docusaurus 3 构建的现代化技术博客，采用 Apple 简约设计风格。专注于 AI Infra、推理加速、云原生与平台架构。

## 🌟 特性

- ✨ **Apple 风格设计**: 简约、优雅的 UI 设计
- 🎨 **炫酷首页**: 大色块、动态渐变、流畅动画
- 📱 **响应式布局**: 完美适配桌面和移动设备
- 🚀 **快速部署**: GitHub Pages 自动化部署
- 📝 **Markdown 写作**: 支持 MDX，方便内容创作
- 🎯 **多领域分类**: AI & LLM、Infrastructure、Backend、随笔

## 🛠️ 技术栈

- **框架**: Docusaurus 3
- **语言**: TypeScript
- **样式**: CSS Modules
- **部署**: GitHub Actions + GitHub Pages

## 📦 快速开始

### 使用 Makefile (推荐)

```bash
# 查看所有可用命令
make help

# 安装依赖
make install

# 启动开发服务器
make dev

# 构建生产版本
make build

# 预览构建结果
make serve

# 清理构建文件
make clean

# 创建新博客
make new-blog

# 创建新文档
make new-doc
```

### 使用 NPM

```bash
# 安装依赖
npm install

# 本地开发
npm start

# 构建
npm run build

# 预览构建结果
npm run serve
```

访问 http://localhost:3000/blogs/ 查看网站。

## 📁 项目结构

```
Blogs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── .vscode/                    # VSCode 配置
│   ├── settings.json          # 编辑器设置
│   ├── launch.json            # 调试配置
│   ├── tasks.json             # 任务配置
│   └── extensions.json        # 推荐扩展
├── blog/                       # 博客文章（时间线组织）
│   ├── authors.yml
│   └── 2024-12-27-welcome/
├── docs/                       # 技术文档（领域组织）
│   ├── ai-llm/                # AI & LLM 领域
│   ├── infrastructure/         # Infrastructure 领域
│   └── backend/                # Backend 领域
├── src/
│   ├── components/             # React 组件
│   │   ├── HomepageHero/      # 首页 Hero 区
│   │   ├── DomainCards/       # 领域卡片
│   │   ├── RecentArticles/    # 最新文章
│   │   └── ProjectShowcase/   # 项目展示
│   ├── css/                    # 全局样式
│   │   ├── custom.css
│   │   └── apple-theme.css
│   └── pages/
│       └── index.tsx           # 自定义首页
├── static/                     # 静态资源
│   └── img/
├── docusaurus.config.js        # Docusaurus 配置
├── sidebars.js                 # 侧边栏配置
├── Makefile                    # Make 命令
└── package.json
```

## ✍️ 写作指南

### 添加文档

在 `docs/` 对应的领域文件夹下创建 Markdown 文件：

```markdown
---
sidebar_position: 1
title: 文章标题
description: 文章描述
keywords: [关键词1, 关键词2]
---

# 文章标题

文章内容...
```

### 添加博客文章

在 `blog/` 目录下创建文件夹：

```markdown
---
slug: article-slug
title: 文章标题
authors: [lei]
tags: [tag1, tag2]
---

文章摘要（会在列表页显示）

<!--truncate-->

文章正文...
```

## 🎨 自定义资源

### 替换 Logo

替换 `static/img/logo.svg` 文件。建议尺寸：200x200px

### 替换 Favicon

将 favicon.ico 文件放在 `static/` 目录下。

### 项目展示图片

将项目图片放在 `static/img/projects/` 目录下，然后更新 `src/components/ProjectShowcase/index.tsx` 中的图片路径。

## 🚀 部署

### GitHub Pages 部署

#### 1. 配置 GitHub Pages

进入 GitHub 仓库设置：
- Settings → Pages
- Source 选择 "GitHub Actions"

#### 2. 推送代码

```bash
# 使用 Makefile
make deploy

# 或手动推送
git add .
git commit -m "Your commit message"
git push origin master
```

#### 3. 自动部署

推送到 `master` 分支后，GitHub Actions 会自动：
1. 安装依赖
2. 构建网站
3. 部署到 GitHub Pages

部署完成后，访问: `https://supermarioyl.github.io/blogs/`

### VSCode 调试

项目已配置 VSCode 调试环境：

1. 按 `F5` 或点击调试按钮
2. 选择 "Launch Chrome (Development)"
3. 自动启动开发服务器并打开 Chrome 调试

### Makefile 常用命令

```bash
make help        # 查看所有命令
make dev         # 启动开发服务器
make build       # 构建生产版本
make clean       # 清理构建文件
make new-blog    # 创建新博客文章
make new-doc     # 创建新文档
make deploy      # 构建并部署
```

## 📝 待办事项

- [ ] 添加更多技术文章
- [ ] 集成 Algolia DocSearch 搜索功能
- [ ] 添加评论系统（Giscus）
- [ ] 添加 Google Analytics
- [ ] 优化 SEO
- [ ] 添加更多动画效果

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

**Built with ❤️ using Docusaurus**
