## 在本地初始化的项目怎么上传到GitHub


```
//远端增加origin
git remote add origin "刚刚创建的代码仓库网址，如github的仓库地址"

//推送一次代码
git add xxx
git commit -m sss
git push -u origin master
```
- 把本地仓库push一次到远程仓库即可完成上传
- 第一次推送必须要指定远端的分支,以后可以不加
- `-u`为第一次推送时要加的，以后可以不加