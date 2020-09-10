# HashMap源码详解及面试题解析

<!-- TOC -->

- [**HashMap的源码分析**](#hashmap的源码分析)
  - [**默认参数**](#默认参数)
  - [**存储结构**](#存储结构)
  - [**决定存储位置的方法——hash()**](#决定存储位置的方法hash)
    - [**HashCode()方法是怎么获取值的？**](#hashcode方法是怎么获取值的)
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

  ```java
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

  ```java
  transient Node<K,V>[] table;
  ```

### **决定存储位置的方法——hash()**

将键值对存到桶中时，是通过对key进行hash，得到一个int值然后与容量与操作来获取这个键值对应该存放在哪个桶中的，而hash方法是怎么计算hash值的呢？
步骤如下：
1. 校验对象是否为null，如果是null，返回0
2. 通过hashcode方法获取这个key的hash值
3. 将这个hash值与这个hash值无符号右移16位的值做异或操作，获取最终的值

```java
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
```

#### **HashCode()方法是怎么获取值的？**

在object类中，hashcode方法是一个本地方法，在不同的系统中的实现是不同的，但总得来说是通过对象在虚拟机中的内存地址计算出来的，如果两个对象有不同的hashcode，那这两个对象一定不等，而hashcode相同也不代表两个对象相等。

```java
public native int hashCode();
```


### **增加元素的方法——put()**

put方法是调用了内部的putval方法的，将key、value、以及key的hash值等都传到了putval方法中

```java
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
```

putval方法源代码如下：

```java
    /**
     * Implements Map.put and related methods.
     *
     * @param hash hash for key
     * @param key the key
     * @param value the value to put
     * @param onlyIfAbsent if true, don't change existing value
     * @param evict if false, the table is in creation mode.
     * @return previous value, or null if none
     */
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
```

分行解析putval方法：

node数组tab指向本对象的table，p表示要存储的桶的第一个元素，n表示table数组的长度即容量大小,i表示要存储的位置
``` java
Node<K,V>[] tab; Node<K,V> p; int n, i;
```

将table、n赋值，如果此时table数组中还没有定初始化，则调用resize方法，将table数组初始化并扩容至初始容量（默认为16）,并将n赋值为容量大小

```java
if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;
```

如果table已经初始化了，则将key的hash值与n-1做与操作，获取一个肯定包含在n-1内的数，用i来表示，tab[i]便是将要存储的位置，p指向这个位置，如果tab[i]的值是空的，则用键值初始化一个node放入tab[i]中

```java
if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);
```

如果已经初始化，并且经过计算后的位置上也有了数据，则接着进行下一步的逻辑

```java
else{
    ...
}
```




```java        
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
```





---
## **面试题题解**

### ***transient关键字的作用？***

加上transient关键字，在序列化的时候，这个属性就不会被序列化