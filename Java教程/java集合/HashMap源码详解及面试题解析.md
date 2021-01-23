# HashMap源码详解及面试题解析

<!-- TOC -->

- [**HashMap的源码分析**](#hashmap的源码分析)
  - [**默认参数**](#默认参数)
  - [**存储结构**](#存储结构)
  - [**决定存储位置的方法——hash()**](#决定存储位置的方法hash)
    - [**HashCode()方法是怎么获取值的？**](#hashcode方法是怎么获取值的)
  - [**增加元素的方法——put()**](#增加元素的方法put)
  - [**HashMap的扩容机制resize()**](#hashmap的扩容机制resize)
- [**面试题题解**](#面试题题解)
  - [***transient关键字的作用？***](#transient关键字的作用)
  - [***hashmap为什么线程不安全？***](#hashmap为什么线程不安全)

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

putval方法源代码解析如下：

```java
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        /*node数组tab指向本对象的table，
        p表示要存储的桶的第一个元素，
        n表示table数组的长度即容量大小,
        i表示要存储的位置*/
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        /*如果此时table数组中还没有定初始化，则调用resize()方法，
        将table数组初始化并扩容至初始容量（默认为16）,并将n赋值为容量大小*/
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        /*如果table已经初始化了，则将key的hash值与n-1做与操作，
        获取一个肯定包含在n-1内的数，用i来表示，tab[i]便是将要存储的位置，
        p指向这个位置，即p指向tab[i]的第一个元素，
        如果tab[i]的值是空的，则用键值初始化一个node放入tab[i]中*/
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            /*如果tab[i]中已经有了元素，即发生了hash冲突，则进行else代码块中的操作
            e为该位置与当前key相同的元素，即若有相同可key则e不为空，否则为空
            k为tab[i]位置收个元素的key
            */
            Node<K,V> e; K k;
            /*如果当前桶的第一个元素的hash值与要插入元素和hash值相同，
            且，key也相同，则将e指向第一个元素*/
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            /*如果p是树节点，则调用树节点put方法putTreeVal()来put值，
            如果有重复key则返回e,
            如果没有重复的key,则在树上新加上一个元素并返回空值*/
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                /*若以上条件都不成立，则说明该位置是一段链表，
                用for循环遍历该链表，bincount为遍历的链表深度*/
                for (int binCount = 0; ; ++binCount) {
                    /*如果全部遍历完没有key是相同的，
                    则将要入的元素挂到链表末尾，即尾插法，然后中断循环*/
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        /*如果添加上元素后，发现已经达到了树型阈值，
                        则调用treeifyBin()方法将链表转换成红黑树*/
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break;
                    }
                    /*如果遍历到有key和要插入的元素key一样，
                    则中断循环，此时e指向key值相同的元素*/
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    /*此时e=p.next,所以这句代码的意思是：
                    将p指针沿链表指向下一个元素*/
                    p = e;
                }
            }
            /*如果e不为空，那么说明在tab[i]位置上有元素key值和要插入的元素相同，e指向旧元素，所以进行value值的修改，返回旧的元素值*/
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        /*
        modcount:记录该map修改的次数
        size:记录该map的容量大小
        threshold:要调整的大小值，默认为table数组容量*负载因子（如16*0.75=12）

        即put值之后，修改次数modcount加一，当前容量size加一，
        如果当前容量比容量*负载因子要大，则触发扩容机制。
        */
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
```

### **HashMap的扩容机制resize()**

&emsp;hashmap的扩容机制就是加倍扩容，即如果容量为16，扩容完之后会变为32，里面的元素会重新用key的hash值与新的n-1进行与（&）操作，重新修改位置。


下面是代码分析：
```java
    /*返回扩容后的数组*/
    final Node<K,V>[] resize() {
        /*
        oldTab  当前数组
        oldCap  当前数组容量
        oldThr  当前数组要调整的大小值
        newCap  扩容后的容量
        newThr  扩容后的要调整大小值
        */
        Node<K,V>[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1; // double threshold
        }
        else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        else {               // zero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
        if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }

```




---
## **面试题题解**

### ***transient关键字的作用？***

&emsp;加上transient关键字，在序列化的时候，这个属性就不会被序列化

### ***hashmap为什么线程不安全？***

&emsp;两个并发的线程，其本质其实是CPU时间片的串行进行，所以在jdk1.8中,并发put操作时会造成数据覆盖的情况，主要有以下两点：

1. 在进行hash碰撞时产生的数据覆盖情况
    
    &emsp;两个并发的线程，其本质其实是CPU时间片的串行进行，所以在jdk1.8中,并发put操作时会造成数据覆盖的情况。假设现在线程A获取到了CPU时间片并进行了hash验算，得知tab[i]的位置没有元素，然后时间片结束，线程B获取到了时间片，并同时进行了hash验算，也算出了tab[i]的位置，同样得到了没有元素的结果并将B的元素赋值到了tab[i]的位置，这时CPU时间到了A线程，A进行了赋值操作，这样，B的元素就被覆盖掉了。
    ```java
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    ```

2. 在进行++size操作会产生size计算错误的情况

    &emsp;java的内存模型中，分为主内存和工作内存，size的值存储在主内存中，而进行++操作要从主内存获取值到工作内存，然后在工作内存进行+1操作，然后将修改传回主内存。若此时线程A从主内存获取了size为10，然后CPU时间片耗尽，线程B也从主内存获取了size为10并进行了+1操作并回传主内存，然后CPU时间轮到线程A，线程A将11的值传回了主内存，这样，有一次++操作便被覆盖了。
    
    &emsp;由于size的值会影响扩容时机，所以出现覆盖的情况会影响map的扩容。
