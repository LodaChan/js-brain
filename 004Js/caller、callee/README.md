# caller、callee

#### caller

> 返回一个函数的引用，这个函数调用了当前的函数


#### callee

> 返回正在执行的函数本身的引用，它是arguments的一个属性

+ 函数才有
+ arguments.callee.length 看到参数的个数

严格模式下异常

```bash
Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```