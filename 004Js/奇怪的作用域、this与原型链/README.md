# 奇怪的作用域与this


####  this 执行上下文中找属性与方法

> `注`：严格版中的默认的this不再是window，而是undefined

+ `this`  `最终指向的是那个调用它的对象`

   + 简单函数，this === window
   + 赋值对象, this === window
   
   + new fn(); this === function obj
   + 在对象内，this === obj
   + 在对象内对象，this === obj2
   
   + 当 遇到 return 
      + 是对象，  this === 生成的对象
      + 不是对象  this === 执行的对象 常常是window


#### 作用域 变量var xxx= 查找

+ `作用域嵌套` 在当前作用域中无法找到这个 vars 变量时，Js引擎就会在外层嵌套的作用域中继续找，直到找到该变量，或抵挡最外层的作用域位置



 ####  原型链 找属性与方法   this. prototype，__proto__

 + `prototype` 是 `函数所独有` 的，在定义构造函数时自动创建，它总是被 `__proto__` 所指

 + `__proto__` 是原型链查询中实际用到的，它总是指向 prototype
 
 + prototype对象默认有两个属性，constructor属性和__proto__属性。prototype属性可以给函数和对象添加可共享（继承）的方法、属性，而__proto__是查找某函数或对象的原型链方式。constructor，这个属性包含了一个指针，指回原构造函数。

 + `__proto__` 向上查找机制，直到Object.prototype的原型为止，如果没有就报不存在 undefined

 