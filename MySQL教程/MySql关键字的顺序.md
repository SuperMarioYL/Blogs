# MySql关键字的顺序

&emsp;mysql关键字有执行顺序与书写顺序，现总结如下：

---

## 1.执行顺序
- FROM
- WHERE
- SELECT
- GROUP BY
- HAVING
- ORDER BY

### 注：group by/having/order by 可以使用select的别名(select avg as a)
 
---

## 2.书写顺序
- SELECT
- FROM
- JOIN
- ON
- WHERE
- GROUP BY
- HAVING
- ORDER BY 
- UNION
### 特别注意：HAVING一定要放在GROUP BY后面

---

### 示例：

sql:

```
SELECT student_name,AVG(grade) as avg FROM grade WHERE course_name='数据结构' GROUP BY student_name HAVING avg>=60 ORDER BY avg;
```
grade表：

|id|course_name|student_name|grade|
|:--|:-:|:--|--:|
|1|数据结构|张三|60|
|2|计算机组成原理|张三|85|
|3|深入理解计算机系统|张三|87|
|4|计算方法|张三|50|
|5|高等数学|张三|43|
|6|数据结构|李四|56|
|7|计算机组成原理|李四|89|
|8|深入理解计算机系统|李四|23|
|9|计算方法|李四|45|
|10|高等数学|李四|56|
|11|数据结构|王五|78|
|12|计算机组成原理|王五|50|
|13|深入理解计算机系统|王五|87|
|14|计算方法|王五|80|
|15|高等数学|王五|90|

结果：

|student_name|avg|
|:-:|:-:|
|张三|60.0000|
|王五|78.0000|