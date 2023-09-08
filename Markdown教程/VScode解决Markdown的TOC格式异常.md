# VScode解决Markdown的TOC格式异常

## 生成异常解决办法

在用vscode写Markdown文件时，我们经常用Markdown TOC插件给我们的文件加目录，可是自动生成的目录往往是这样的：

![20200731201128](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200731201128.png)

这是由于vscode默认的换行格式和插件不兼容导致的，解决办法如下：

在设置里搜索`eol`然后把换行符改为`\n`就好了

![20200731201106](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200731201106.png)

效果如下：

![20200731201317](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200731201317.png)

## 保存时异常解决办法

保存时异常我碰到的问题是：

`Markdown all in one` 和 `Markdown TOC` 这两个插件冲突了

![20200731223819](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200731223819.png)

![20200731224035](https://cdn.jsdelivr.net/gh/SuperMarioYL/ImageHostingService@master/resources/blogs/20200731224035.png)

这两个插件各自都有关于TOC格式的定义，解决办法：

要么把其中一个的`update on save`属性的勾选去掉，要么让他俩的格式保持一致