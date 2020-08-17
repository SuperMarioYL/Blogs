# HashMap源码详解及面试题解析

<!-- TOC -->

- [**HashMap的源码分析**](#hashmap的源码分析)
  - [**默认参数**](#默认参数)
  - [**存储结构**](#存储结构)
  - [**增加元素的方法——put()**](#增加元素的方法put)
- [**面试题题解**](#面试题题解)
  - [***transient关键字的作用？***](#transient关键字的作用)

<!-- /TOC -->

---
## **HashMap的源码分析**

hashmap是java.util包下的一个集合类，支持序列化，作为一个面试热门考点，我以jdk1.8的源码为例，讲述一下我对于hashmap的理解

### **默认参数**

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

### **存储结构**

hashmap的存储结构是`数组+链表+红黑树`，默认的数组容量为16，每个容量都称为桶，即初始有16个桶，通过hash将键值对存储到桶中，如果发生hash冲突就会将值存储到该桶的下一位，即生成一个链表。当一个链表的数值超过树形阈值时，链表会自动转换为红黑树，以获取更高的查询效率。当有最大容量*加载因子个桶存在值时，数组将会扩容，具体的是增加到原来的一倍。

- 最基本的存储结构——Node

  node是hashmap最基础的存储结构，他是存储具体键值对的节点

  ```
      static class Node<K,V> implements Map.Entry<K,V> {
          final int hash;
          final K key;
          V value;
          Node<K,V> next;

          Node(int hash, K key, V value, Node<K,V> next) {
              this.hash = hash;
              this.key = key;
              this.value = value;
              this.next = next;
          }

          public final K getKey()        { return key; }
          public final V getValue()      { return value; }
          public final String toString() { return key + "=" + value; }

          public final int hashCode() {
              return Objects.hashCode(key) ^ Objects.hashCode(value);
          }

          public final V setValue(V newValue) {
              V oldValue = value;
              value = newValue;
              return oldValue;
          }

          public final boolean equals(Object o) {
              if (o == this)
                  return true;
              if (o instanceof Map.Entry) {
                  Map.Entry<?,?> e = (Map.Entry<?,?>)o;
                  if (Objects.equals(key, e.getKey()) &&
                      Objects.equals(value, e.getValue()))
                      return true;
              }
              return false;
          }
      }
  ```
- 数组结构

  在源码中。一个hashmap对象所有的键值对都是存储在table这个node数组中的，他的每一个元素都可以成为一个链表

  ```
  transient Node<K,V>[] table;
  ```

### **增加元素的方法——put()**



---
## **面试题题解**

### ***transient关键字的作用？***

加上transient关键字，在序列化的时候，这个属性就不会被序列化