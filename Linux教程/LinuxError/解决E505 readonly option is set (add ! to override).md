# 解决E505:readonly option is set (add ! to override)

如果在文件编辑之后出现这个提示：

![20200803205024](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200803205024.png)

有如下解决办法：

---
## 有root权限

wq后边加!即可保存退出

```
:wq!
```

## 没有root权限

如果没有root权限而执行 `:wq!` 会报E212错误，如下图所示：

![20200803205827](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200803205827.png)

解决办法如下：

在 `vi filename` 前加上sudo 使用超级管理员权限来进行修改，就可以正常保存了

![20200803210239](https://cdn.jsdelivr.net/gh/leiyu1997/ImageHostingService@master/resources/blogs/20200803210239.png)