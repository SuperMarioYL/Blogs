# 如何在GitHub上搜索开源项目？
&emsp; 作为一个程序员，在学习完基础知识后，想要提升自己的话，找比较好的开源项目练手是非常好的途径，GitHub作为世界上最大的开源项目管理平台，拥有丰富的开源资源，那么，怎么才能在上找到我们需要的项目呢？

&emsp; 我们需要善用GitHub的搜索功能。比如我想在GitHub上搜索有关springboot的内容，我们一般会这么做：
![](https://upload-images.jianshu.io/upload_images/22982124-826809e7606bea37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但是只是这样搜索的话，结果是非常多的：
![](https://upload-images.jianshu.io/upload_images/22982124-c0f419c78cfb7112.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有十多万的项目，那我们到底要怎么从这十多万的项目中找出我们需要的呢？我们可以在搜索时添加更多的限定内容，以缩小搜索的范围。

通常一个开源项目都会有这这几个方面的内容：
![](https://upload-images.jianshu.io/upload_images/22982124-b0f39b9ffaf92045.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以及readme
![](https://upload-images.jianshu.io/upload_images/22982124-b125104f9d7ac687.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们在默认搜索时是将name,description,readme等内容一起搜索的，也没有对starts和forks的数据进行限制，在缩小搜索范围时，我们可以指定stars的数量范围和要搜索的内容范围，比我我要搜索名字包含spring，并且stars大于10k的项目，便可以进行如下搜索：
```
in:name spring stars:>10000
```
结果如下：
![](https://upload-images.jianshu.io/upload_images/22982124-5ad5aa161260ab77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，只剩下11个结果了

我们也可以搜索描述里和名字里都有spring的项目：
```
in:name spring in:description spring stars:>10000
```
---

## 总结
这便是GitHub精确搜索开源项目的方法，希望大家一起加油。