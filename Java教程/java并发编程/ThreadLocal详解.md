# ThreadLocal详解


---
## ThreadLocal的作用

---
## ThreadLocalMap与HashMap的区别

&emsp;ThreadLocalMap是一个静态对象，所有线程的值都以线程为key,值为value存储在这一个ThreadLocalMap中。

- `key值不同`
  - 两者都是key-value形式的Map
  - ThreadLocalMap的key是线程
  - HashMap的key可以是随意值。
- `结构不同` 
  - ThreadLocalMap是数组结构
  - HashMap是数组+链表+红黑树结构
- `hash算法不同`
  - ThreadLocalMap的Hash值计算取自ThreadLocal对象中的threadLocalHashCode值
  - HashMap的hash值取自key的HashCode值
- `解决hash冲突的算法不同`
  - ThreadLocalMap采用到的是**开放寻址法**，遇到hash冲突时，会查看数组的下一个位置是否是空值，如果为空则放入，否则继续查找下一个位置，在get时只要从hash的位置查找到空值即可。
  - HashMap采用的是**链地址法**，遇到hash冲突会在当前位置形成链表。
