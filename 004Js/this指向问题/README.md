# this指向问题

 
 

| 场景| 例子|说明|
| :------ | :-------------------------------- |:-------------------------------- |
| 1 直接调用| fn()| window |
| 2 对象调用| obj.fn() 或者 arguments[0]() | 距离方法最近的一层对象 obj 或 arguments |
| 3 new操作符| new class() | 实例化的 classObj  |
| 4 apply,call,bind|   | 对应指定的this  |
| 5 箭头函数|   |  undefined  |
| 6 匿名函数|   |  window  |
| 7 定时器|   |  window  |
| 8 eval|   |  当前作用域的this  |
| 9 html onclick|   |  window  |
