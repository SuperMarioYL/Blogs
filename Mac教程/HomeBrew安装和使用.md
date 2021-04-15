# HomeBrew安装和使用

&emsp;Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。

<!-- TOC -->

- [安装](#安装)
- [使用](#使用)
  - [安装任意包](#安装任意包)
  - [卸载任意包](#卸载任意包)
  - [查询可用包](#查询可用包)
  - [查看已安装包列表](#查看已安装包列表)
  - [查看任意包信息](#查看任意包信息)
  - [更新Homebrew](#更新homebrew)
  - [查看Homebrew版本](#查看homebrew版本)
  - [Homebrew帮助信息](#homebrew帮助信息)

<!-- /TOC -->

## 安装

&emsp;国内安装brew在控制台输入以下命令

```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

## 使用

### 安装任意包
```shell
$ brew install <packageName>

# 示例：安装node
$ brew install node 
```

### 卸载任意包
```shell
$ brew uninstall <packageName>

# 示例：卸载git
$ brew uninstall git
```

### 查询可用包
```shell
$ brew search <packageName>
```

### 查看已安装包列表
```shell
$ brew list
```

### 查看任意包信息
```shell
$ brew info <packageName>
```

### 更新Homebrew
```shell
$ brew update
```

### 查看Homebrew版本
```shell
$ brew -v
```

### Homebrew帮助信息
```shell
$ brew -h
```


