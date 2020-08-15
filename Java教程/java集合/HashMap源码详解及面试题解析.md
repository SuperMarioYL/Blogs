# HashMap源码详解及面试题解析

<!-- TOC -->

- [HashMap的源码分析](#hashmap的源码分析)
  - [默认参数](#默认参数)
  - [存储结构](#存储结构)
- [面试题题解](#面试题题解)

<!-- /TOC -->

---
## HashMap的源码分析

hashmap是java.util包下的一个集合类，支持序列化，作为一个面试热门考点，我以jdk1.8的源码为例，讲述一下我对于hashmap的理解

### 默认参数

hashmap的在初始化的时候，有许多的默认参数，这些参数的含义为：

```
/**默认初始容量
 * 值为16，日后扩容时容量必须以2的倍数增加
 */
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; * aka 16

/**最大容量
 * 含义为hashmap存储的键值对个数不能超过2^30个
 */
static final int MAXIMUM_CAPACITY = 1 << 30;

/**默认加载因子
 * 当hashmap中存储的键值对个数大于容量乘以加载因子的值时，hashmap
 * 就需要扩容了。以初始容量16为例，当键值对个数超过16*0.75=12时，
 * 会触发hashmap的resize方法，进行扩容
 */
static final float DEFAULT_LOAD_FACTOR = 0.75f;

/**树形阈值
 * hashmap由数组+链表+红黑树结构组成，树形阈值就是链表转红黑树的
 * 临界点，当链表的长度超过8时，就会将链表转为红黑树
 */
static final int TREEIFY_THRESHOLD = 8;

/**
 * The bin count threshold for untreeifying a (split) bin during a
 * resize operation. Should be less than TREEIFY_THRESHOLD, and at
 * most 6 to mesh with shrinkage detection under removal.
 */
static final int UNTREEIFY_THRESHOLD = 6;

/**
 * The smallest table capacity for which bins may be treeified.
 * (Otherwise the table is resized if too many nodes in a bin.)
 * Should be at least 4 * TREEIFY_THRESHOLD to avoid conflicts
 * between resizing and treeification thresholds.
 */
static final int MIN_TREEIFY_CAPACITY = 64;
```

### 存储结构

---
## 面试题题解