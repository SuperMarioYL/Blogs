.PHONY: help install dev build serve clean deploy test

# 默认目标
.DEFAULT_GOAL := help

# 颜色定义
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)

# 帮助信息
help: ## 显示帮助信息
	@echo ''
	@echo '使用方法:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo '目标:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)

## 依赖管理
install: ## 安装依赖
	@echo "${GREEN}安装依赖...${RESET}"
	npm install

install-clean: ## 清理并重新安装依赖
	@echo "${GREEN}清理并重新安装依赖...${RESET}"
	rm -rf node_modules package-lock.json
	npm install

## 开发
dev: ## 启动开发服务器
	@echo "${GREEN}启动开发服务器...${RESET}"
	npm start

start: dev ## 启动开发服务器（别名）

## 构建
build: ## 构建生产版本
	@echo "${GREEN}构建生产版本...${RESET}"
	npm run build

build-analyze: ## 构建并分析打包大小
	@echo "${GREEN}构建并分析...${RESET}"
	ANALYZE=true npm run build

## 预览
serve: ## 预览构建结果
	@echo "${GREEN}预览构建结果...${RESET}"
	npm run serve

## 清理
clean: ## 清理构建文件
	@echo "${GREEN}清理构建文件...${RESET}"
	npm run clear
	rm -rf build .docusaurus

clean-all: clean ## 清理所有生成文件（包括 node_modules）
	@echo "${GREEN}清理所有文件...${RESET}"
	rm -rf node_modules package-lock.json

## 测试
test: ## 运行测试
	@echo "${GREEN}运行测试...${RESET}"
	npm test

## 代码质量
lint: ## 运行代码检查
	@echo "${GREEN}运行代码检查...${RESET}"
	npm run lint || echo "${YELLOW}未配置 lint 脚本${RESET}"

format: ## 格式化代码
	@echo "${GREEN}格式化代码...${RESET}"
	npx prettier --write "**/*.{js,jsx,ts,tsx,md,mdx,css,json}"

## Git 操作
commit: ## 提交所有更改
	@echo "${GREEN}提交更改...${RESET}"
	git add .
	@read -p "输入提交信息: " msg; \
	git commit -m "$$msg"

push: ## 推送到远程仓库
	@echo "${GREEN}推送到远程仓库...${RESET}"
	git push origin master

deploy: build ## 构建并部署（推送会触发 GitHub Actions）
	@echo "${GREEN}构建并部署...${RESET}"
	@$(MAKE) commit
	@$(MAKE) push

## 文档
new-blog: ## 创建新的博客文章
	@read -p "输入文章 slug (例如: my-new-post): " slug; \
	date=$$(date +%Y-%m-%d); \
	mkdir -p blog/$$date-$$slug; \
	echo "---\nslug: $$slug\ntitle: \nauthor: lei\ntags: []\n---\n\n# \n\n<!--truncate-->\n" > blog/$$date-$$slug/index.md; \
	echo "${GREEN}已创建: blog/$$date-$$slug/index.md${RESET}"

new-doc: ## 创建新的文档
	@echo "${CYAN}选择领域:${RESET}"
	@echo "  1) ai-llm"
	@echo "  2) infrastructure"
	@echo "  3) backend"
	@read -p "输入选项 (1-3): " domain; \
	case $$domain in \
		1) dir="ai-llm" ;; \
		2) dir="infrastructure" ;; \
		3) dir="backend" ;; \
		*) echo "${YELLOW}无效选项${RESET}"; exit 1 ;; \
	esac; \
	read -p "输入文件名 (例如: my-topic.md): " filename; \
	echo "---\nsidebar_position: 1\ntitle: \ndescription: \nkeywords: []\n---\n\n# \n" > docs/$$dir/$$filename; \
	echo "${GREEN}已创建: docs/$$dir/$$filename${RESET}"

## 信息
info: ## 显示项目信息
	@echo "${CYAN}项目信息:${RESET}"
	@echo "  名称: leo-tech-blog"
	@echo "  Node 版本: $$(node -v)"
	@echo "  NPM 版本: $$(npm -v)"
	@echo "  工作目录: $$(pwd)"
	@if [ -d ".git" ]; then \
		echo "  Git 分支: $$(git branch --show-current)"; \
		echo "  Git 提交: $$(git rev-parse --short HEAD)"; \
	fi

## 工具
open: ## 在浏览器中打开网站
	@echo "${GREEN}打开浏览器...${RESET}"
	@if command -v open > /dev/null; then \
		open http://localhost:3000/blogs/; \
	elif command -v xdg-open > /dev/null; then \
		xdg-open http://localhost:3000/blogs/; \
	else \
		echo "${YELLOW}无法自动打开浏览器${RESET}"; \
	fi

github: ## 打开 GitHub 仓库
	@if command -v open > /dev/null; then \
		open https://github.com/SuperMarioYL/Blogs; \
	elif command -v xdg-open > /dev/null; then \
		xdg-open https://github.com/SuperMarioYL/Blogs; \
	fi

## 快捷组合
quick-start: install dev ## 安装依赖并启动开发服务器

full-deploy: clean install build push ## 完整部署流程
