# 原型链

#### 基础

+ 1 prototype  是 函数所独有的
+ 2 proto 和 constructor属性 是 对象所独有的
+ 3 由于js 中函数也是一种对象，所以函数也拥有 proto 和 constructor 属性
+ 4 对象 的 prototype 是 undefined

#### 无中生有的 属性

`class.prototype.key2`

#### proto 详细说明

| key| 说明|
| :------ | :-------------------------------- |
| proto  |  classA对象属性与原型属性，constructor ，  父proto |
| 属性| classA 对象属性 与 classA原型上的  |
| constructor |  指向 instance 的构造函数 classA |





#### 原型链查找

当 instance 查找某个属性时

+ 1 会先从 自身的属性开始找
+ 2 没有就会从 proto 里面
+ 3 再没有就去 proto.proto 里面找