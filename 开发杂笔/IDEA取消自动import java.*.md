# IDEA取消自动import java.*

打开设置 > Editor > Code Style > Java > Scheme Default > Imports

1. 将 Class count to use import with "*" 改为 99 （导入同一个包的类超过这个数值自动变为 * ）

2. 将 Names count to use static import with "*" 改为 99 （同上，但这是静态导入的）

3. 将 Package to Use import with "*" 删掉默认的这两个包 （不管使用多少个类，只要在这个列表里都会变为 * ）