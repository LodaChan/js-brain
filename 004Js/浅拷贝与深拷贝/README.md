# 浅拷贝与深拷贝

>深拷贝和浅拷贝只针对像 Object, Array 这样的复杂对象的

+ 浅拷贝:copy 当前object或array自身的属性
+ 深拷贝:递归拷贝了所有层级

#### 基础数据类型

值类型(基本类型)：
+ 字符串（String）
+ 数字(Number)
+ 布尔(Boolean)
+ 对空（Null）
+ 未定义（Undefined）
+ Symbol (ES6 new)

引用数据类型：
+ 对象(Object)
+ 数组(Array)
+ 函数(Function)。