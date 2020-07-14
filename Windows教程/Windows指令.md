## windows指令

### 目录
- [切换盘符](#1)
- [切换文件夹](#2)
- [查看ip](#3)
  - 刷新缓存
- [查看端口占用](#4)

---
- <a id='1'>切换盘符</a>

![20200627174614](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627174614.png)

- `cd xx` <a id='2'>切换文件夹</a>

![20200627174649](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627174649.png)

- `ipconfig` <a id='3'>查看ip</a>
   - `ipconfig /flushdns` 刷新DNS缓存，修改hosts之后要执行

![20200627180230](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627180230.png)


- `netstat -ano` <a id='4'>查看端口占用</a>
   - `netstat -ano|findstr "1080"` 查询端口或者PID包括1080的数据

![20200627175129](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627175129.png)

![20200627175805](https://cdn.jsdelivr.net/gh/leiyu1997/PicBed@master/blogs/pictures/20200627175805.png)


