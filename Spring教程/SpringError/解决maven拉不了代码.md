# 解决maven拉不了代码

<!-- TOC -->

- [方法一](#方法一)

<!-- /TOC -->

## 方法一

如果你的 `maven安装目录\conf\settings.xml` 文件里配置了mirror代理，那么maven在拉取代码的时候只会从配置的mirror中查找，查不到就拉不到。所以，把mirror删掉就好了