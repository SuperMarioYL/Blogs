# Git基本概念理解

&emsp;Git对于程序员来说想必都不陌生，作为目前最广泛使用的版本管理工具，如果不会使用，往往会让人觉得你这个程序员不专业，今天我们来了解一下git的相关概念。

&emsp;在初始化（`git init`）或者克隆（`git clone`）一个仓库之后，在我们的本地文件夹里，我们会发现除了文件以外，还有一个`.git`文件，这个文件便是我们的版本库，这个仓库关于版本管理的所有文件都存放在这里，也就是说，如果执行`rm -rf .git`将这个文件删掉的话，就把这个Git仓库给删除了。

&emsp;由上，我们可以知道，一个Git仓库分为两部分：
- 工作区，即我们的文件
- 版本库，关于git管理有关的内容

&emsp;反映在我们的文件里便如下图所示

![20200711012643](https://cdn.jsdelivr.net/gh/leiyu1997/Blogs@master/Resources/pictures/20200711012643.png)

打开.git文件，会发现里面有很多内容，其实，版本库也是划分了许多区域的，比如我们进行add操作会把我们在工作区修改的内容放到暂存区，提交会把暂存区的内容提交到本地仓库，那么这些概念到底是什么意思呢？

![20200711012925](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711012925.png)

我们来讲解一下几个重要的概念：
- **对象库（objects）**
  - git版本管理工具相比较于其他版本管理工具成功的地方在于，git只保存有改动的地方，这样他的开销就小很多，对象库就是Git存放具体修改的地方

    ![20200711013912](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711013912.png)

- **暂存区（staged/index）** 
  - 暂存区staged是仓库存放工作区改动的地方，通过`git add`操作将工作区的修改存储到暂存区，存放的操作具体是
    1. 首先将修改存储到对象库生成一个对象
    2. 生成一个索引指向该对象，并把指针存放于.git的index文件中
  - 由于存放索引的地方是index文件，故`staged`也被叫做`index`
  - 文件提交到暂存区对于本地分支没有做任何修改。

    ![20200711162120](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711162120.png)

- **本地仓库（repo）**
  - 本地仓库其实就是你当前的本地分支，在commit之后，暂存区的文件修改会被提交到本地仓库，在git中的实际操作如下：
    1. commit之后，git会在对象库中生成一个commitid,记录下这里提交的修改
    2. 当前分支本来是指向上一个commitid的，在commit之后，指向当点最新的commitid
- **分支**
  - 分支其实就是一个个的索引，指向了不同的commitID
  - 本地分支存放于`.git/ref/heads`文件夹中，可以有多个本地分支

    ![20200711021634](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711021634.png)

- **HEAD**
  - 理解了分支，其实head就不难理解了，head其实就是指向你当前本地分支的一个索引，存放于.git的head文件中,本地是可以有多个分支的，git怎么知道你当前的分支呢？head指向的分支便是本地分支。

    ![20200711021742](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711021742.png)

相信如果对上面几个概念都理解了的话，git对大家就都不算难了，对于各个命令是干嘛的也就大概清楚了，下图是对于Git版本库的一个总结：

![20200711020235](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200711020235.png)

下图是文件的操作命令，不同的命令操作的区域是不一样的：

![20200708011253](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/1090617-20181008212245877-52530897.png)