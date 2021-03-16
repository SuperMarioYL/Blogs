# 解决Mac的Vim乱码问题

修改zshrc

```
vi ~/.zshrc
```

加入

```
export LC_ALL=en_US.UTF-8  
export LANG=en_US.UTF-8
```

然后

```
source ~/.zshrc
```
