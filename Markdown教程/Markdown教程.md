

# Markdown语法

&emsp;&emsp;大家在网络上写文章如果喜欢跨平台转载，那么用Markdown格式来写是一个非常好的选择，本文是对Markdown常用的格式的介绍。

<!-- TOC -->

- [标题](#标题)
- [文字样式](#文字样式)
- [引用](#引用)
- [分割线](#分割线)
- [无序列表](#无序列表)
- [代码块](#代码块)
- [图片](#图片)
- [超链接](#超链接)
- [添加空格](#添加空格)
- [表格](#表格)
- [跳转](#跳转)

<!-- /TOC -->

---
## 标题

'#'是标题，一共6级，可以和其他样式混用

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

效果：

![20200731155141](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200731155141.png)

---
 ## 文字样式

```
**文字加粗**

*文字倾斜*

***加粗&倾斜***

~~加删除线~~
```

效果：

**文字加粗**

*文字倾斜*

***加粗&倾斜***

~~加删除线~~

--- 
## 引用

```
> 引用
> > 引用
> > > > >多级引用
```

效果：

> 引用
> > 引用
> > > > >多级引用

---
## 分割线

以下两种都可以

```
***
---
```
效果：

***

---


## 无序列表

以下三种都可以，注意加空格

```
* 无序列表
- 无序列表
+ 无序列表
```

效果：

* 无序列表
- 无序列表
+ 无序列表

---
## 代码块

单行代码用“`”,多行代码用“```”

- 单行代码例子：

	```
	`单行代码`
	```
效果：

`单行代码`

- 多行代码例子：

	![20200714170646](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200714170646.png)

效果：

```
public static void main(String[] args) {
	system.out.println("Hello World!");
}
```

---
## 图片

```
格式：![图片名](图片URL)

例子：
![你的名字](https://upload-images.jianshu.io/upload_images/22982124-07d686a87602657d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
效果：
![你的名字](https://upload-images.jianshu.io/upload_images/22982124-07d686a87602657d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
## 超链接

```
格式：[链接名](链接URL)

例子：
[**百度**](http://www.baidu.com)
[*百度*](http://www.baidu.com)
[***百度***](http://www.baidu.com)
[~~百度~~](http://www.baidu.com)
```

效果：

[**百度**](http://www.baidu.com)

[*百度*](http://www.baidu.com)

[***百度***](http://www.baidu.com)

[~~百度~~](http://www.baidu.com)

---
## 添加空格

```
半方大的空白&ensp;或&#8194;
全方大的空白&emsp;或&#8195;
不断行的空白&nbsp;或&#160;

例子：
&ensp;半方大的空白
&emsp;全方大的空白
&nbsp;不断行的空白
```
效果：

&ensp;半方大的空白

&emsp;全方大的空白

&nbsp;不断行的空白

---
## 表格

```
|表格以竖线划分|第一行是标题|~~可以加效果~~|
|:--|:-:|--:|
|第二行是格式|以-:设置对齐格式|总共不少于三个|
|左对齐|中间对齐|右对齐|
```
效果：
|表格以竖线划分|第一行是标题|~~可以加效果~~|
|:--|:-:|--:|
|第二行是格式|以-:设置对齐格式|总共不少于三个|
|左对齐|中间对齐|右对齐|


---
## 跳转

1. 同文件跳转

```
[Markdown语法](#test) //目录位置

test>Markdown语法 //要跳转到的位置
```
效果：

[Markdown语法](#Markdown语法)

2. 不同文件跳转

采用相对路径来实现

```
[Windows指令](./Windows教程/Windows指令.md)
```


