# 详解箭头函数与匿名函数

+ 箭头函数不绑定arguments
+ 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
+ 箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响
+ 箭头函数没有原型属性
+ 能当做Generator函数,不能使用yield关键字