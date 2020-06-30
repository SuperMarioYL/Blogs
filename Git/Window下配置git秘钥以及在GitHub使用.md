# windows下配置git密钥以及在GitHub使用

## 1.git配置公钥私钥

&emsp;git在使用过程中，如果没有配置秘钥，那么每次提交代码的时候都需要验证密码，非常麻烦，所以，我们需要配置秘钥，并把公钥放到要推送的远端仓库中。步骤如下：

1. 配置用户名以及邮箱
   - 配置的用户名以及邮箱便是以后你提交代码时的身份

```
$ git config --globa user.name "yourname"
$ git config --globa user.email "youremail@xxxxx.com"
```
2. 查看配置

```
$ git config --get user.name
```
![20200625160703](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625160703.png)

3. 生成秘钥文件
    - 注：命令点击以后需要点三次确认
      - 首先要你确认文件要放到的文件夹，一般是`/c/Users/用户/.ssh/id_rsa`
      - 随后让你输入密码，如果每次提交不想输入密码的话，可以为空，直接点确定
      - 随后再输入一遍密码
```
ssh-keygen -t rsa -b 4096 -C "youremail@xxxxx.com"
```

4. 秘钥会在之前确认过的目录下生成

![20200625161205](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625161205.png)

打开`id_rsa.pub`文件，将内容复制，稍后将内容粘贴到GitHub上。

---

## 2.将秘钥放到GitHub中

1. 打开GitHub，打开右上角的settings

![20200625161701](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625161701.png)

2. 选择`SSH and GPG keys`,选择`NEW SSH keys`

![20200625161830](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625161830.png)

3. 将复制的`id_rsa.pub`的内容粘贴到key中，起一个名字，然后点`add ssh key`

![20200625162052](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625162052.png)

4. 这样,秘钥就可以在GitHub使用啦

![20200625162324](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200625162324.png)


  

