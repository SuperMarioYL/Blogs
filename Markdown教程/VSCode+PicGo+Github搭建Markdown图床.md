# VSCode+PicGo+Github搭建Markdown图床

&emsp;vscode是一个扩展性极强的编辑器，插件非常丰富，在下载了`Markdown All in One
`插件之后作为Markdown编辑器非常好用。既可以预览，对语法的支持也非常好，唯一的一点缺点就是不能上传图片，以至于每次写博客的时候都要切到网站上粘图片再拷贝连接回来，非常麻烦。

![20200527214215](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200527214215.png)

<!-- TOC -->

- [1. picgo介绍](#1-picgo介绍)
- [2. Github图床设置](#2-github图床设置)
- [3. picgo设置](#3-picgo设置)

<!-- /TOC -->

## 1. picgo介绍
&emsp;好在，vscode上有一个picgo插件，可以让我们用快捷键即可上传图片到默认的免费服务器，具体的使用方法是，安装完成后：
![20200527215147](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200527215147.png)
windows下`ctrl+alt+U`从剪贴板粘贴图片，`ctrl+alt+E`打开资源管理器选择图片，这是最常用的两个快捷键，其他快捷键如图所示。
但是还有一个很要命的问题是，由于picgo默认上传的服务器是`SM.MS`服务器，由于你懂得原因，国内的访问速度让人抓狂，但是picgo支持GitHub作为图床，上一篇文章我已经介绍了用阿里云作为图床，这篇文章我将介绍一下用GitHub作为图床应该如何设置，GitHub有如下优点

1. 稳定，用到微软破产应该不是问题
2. 不花钱，这点很赞
3. 容量大，一个仓库的上限是100G，用作图床是够用了
4. 用了cdn加速之后速度还是可以的

--- 


## 2. Github图床设置

1. 注册登录GitHub
   1. 略
2. 创建新仓库，必须是**public**
   
   ![20200529200826](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529200826.png)

3. 进入个人设置页面，选择开发者设置
   
   ![20200529201236](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529201236.png)

4. 选择Personal access tokens，选择生成新token，此token是图床上传时验证身份用的

    ![20200529201401](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529201401.png)

5.  添加描述，然后将repo选上

    ![20200529201549](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529201549.png)

6. 将生成的字符串保存，**关闭页面后将再也无法看到这个字符串了**

    ![20200529201704](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529201704.png)

---

## 3. picgo设置

&emsp;GitHub设置完之后，我们需要修改picgo插件的设置，把服务器编程我们的图床，具体设置如下：

1. vscode右下角选择设置

    ![20200527223227](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200527223227.png)

2. 打开扩展里的picgo

    ![20200527223316](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200527223316.png)

3. 其他具体设置为：

    ![20200529201941](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529201941.png)

    - `current`设置为GitHub
    - `Branch`是我们仓库的分支，默认为`master`
    - `custom url` 使我们图片上传的连接，有两种方式可以使用
      - 原生方式
        - 使用GitHub原生连接，格式为`https://raw.githubusercontent.com/[用户名]/[仓库名]/[分支名]`
        - 我的例子`https://raw.githubusercontent.com/leiyu1997/PicBed/master`
        - 原生方式有一个弊端就是，国内速度比较慢
      - cdn加速方式
        - 格式为`https://cdn.jsdelivr.net/gh/[用户名]/[仓库名]@[分支名]`
        - 我的例子`https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master`
        - cdn加速的优点是国内访问速度比较快
    - `path`是我们的图片存储在仓库中的路径，比如我的是`blogs/pictures/`
  
        ![20200529203127](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529203127.png)
        
    - `Repo`是我们的仓库，比如我的是`leiyu1997/PicBed`

        ![20200529203406](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200529203406.png)
`

---

设置完之后，我们就可以愉快的在Markdown插入图片啦！
