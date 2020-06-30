# VSCode+PicGo+AliyunOss搭建Markdown图床

&emsp;vscode是一个扩展性极强的编辑器，插件非常丰富，在下载了`Markdown All in One
`插件之后作为Markdown编辑器非常好用。既可以预览，对语法的支持也非常好，唯一的一点缺点就是不能上传图片，以至于每次写博客的时候都要切到网站上粘图片再拷贝连接回来，非常麻烦。

![20200527214215](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527214215.png)
![20200527214505](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527214505.png)

## picgo介绍
&emsp;好在，vscode上有一个picgo插件，可以让我们用快捷键即可上传图片到默认的免费服务器，具体的使用方法是，安装完成后：
![20200527215147](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527215147.png)
windows下`ctrl+alt+U`从剪贴板粘贴图片，`ctrl+alt+E`打开资源管理器选择图片，这是最常用的两个快捷键，其他快捷键如图所示。
但是还有一个很要命的问题是，由于picgo默认上传的服务器是`SM.MS`服务器，由于你懂得原因，国内的访问速度让人抓狂，于是，我们不得不自建图床，好在picgo支持aliyun,于是我选择了用阿里云oss作为我的图床，阿里云oss我认为非常有优势的地方在于

1. 稳定，阿里云在国内的访问速度都是很稳定的
2. 便宜，40G的oss一年也才9块钱，用来做图床再合适不过了

--- 


## 阿里云oss 购买以及图床设置

1. 注册阿里云并登陆
    - 略过
2. 登陆之后如图所示，找到对象存储oss并点击进去

   ![20200527220316](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527220316.png)

3. 选择折扣套餐

    ![20200527220442](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527220442.png)

4. 如图所示，一年只需9块钱，选择自己需要的套餐后购买即可
   
   ![20200527220542](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527220542.png)

5. 购买完成后回到首页，点击右上方的控制台，进入个人控制台

    ![20200527220702](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527220702.png)

6. 点击左上角，然后点击产品与服务，然后找到对象存储oss,可以收藏到左边收藏栏。
    
    ![20200527220823](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527220823.png)

7. 控制台右侧有`Bucket 管理`,点击创建

    ![20200527221203](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527221203.png)

8. 需要注意的是，我们想要作为图床的话，必须要将读写权限选择为公共读，否则别人是看不到的
   
   ![20200527221417](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527221417.png)

9. bucket创建之后，左侧工具栏就有了我们创建的bucket，这就是我们自己的上传URL，只有URL还不够，想要作为图床，还需要有key让服务器认识我们，让我们可以上传图片，在创建bucket的下方有`access key`,点击进入
    
    ![20200527221834](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527221834.png)

10. 选择开始使用子用户access key

    ![20200527221931](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527221931.png)

11. 输入名称然后选择编程访问，创建即可
    
    ![20200527222101](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527222101.png)

12. 出现的keyid 以及keySecret记得保存到其他地方，关闭页面之后就找不到了，picgo里还需要用到这两串字符，一定要保存

13. key 创建完后回到对象存储的控制台，选择我们创建的bucket选择授权
    
    ![20200527222459](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527222459.png)

14. 新增授权，授权用户选择子账号，然后选取我们刚刚创建的用户，授权为读写，这样，oss作为图床的基本设置就都设置完了
    
    ![20200527222646](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527222646.png)

15. 新建目录这里可以创建目录，以便于我们对于文件进行分类管理

    ![20200527222950](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527222950.png)

---

## picgo设置

&emsp; 阿里云oss设置完之后，我们需要修改picgo插件的设置，把服务器编程我们的图床，具体设置如下：

1. vscode右下角选择设置

    ![20200527223227](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527223227.png)

2. 打开扩展里的picgo

    ![20200527223316](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527223316.png)

3. 将current设置为aliyun,其他具体设置为：

    ![20200527223444](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527223444.png)

    - `Access Key ID`和`Access Key Secret`是我们之前存的用户字符串
    - `Area`是我们的地域（英文），在我们的阿里云bucket概览中可以看到，如`oss-cn-beijing`
    - `Bucket` 使我们创建的bucket名称
    - `Custom Url`是我们阿里云bucket概览中的bucket域名，记得加http头,如` https://XXXXXXXXXXXXX.oss-cn-beijing.aliyuncs.com/`
        
        ![20200527224057](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527224057.png)
    - path是我们文件目录，在bucket中新建目录目录的话可以在这里设置，比如我的目录便是`blogs/pictures/`

        ![20200527224257](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200527224257.png)
`

---

设置完之后，我们就可以愉快的在Markdown插入图片啦！
