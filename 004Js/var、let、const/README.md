# var、let、const


#### 使用建议

+ 大多数情况下都使用 const
+ for 循环里面，那么就是用 let
+ 拥抱 let

#### 具体分析

+ var 用于变量提升

```js
console.log(a)
var a = 1;

var a = undefined
console.log(a) // undefined
var a = 1;
```


+ let 块作用域声明

在变量声明之前就访问变量的话，会直接提示 ReferenceError，而不像 var 那样使用默认值 undefined:



+ const 块作用域声明，且不可以再次赋值

const 和 let 的作用域是一致的，不同的是 const 变量一旦被赋值，就不能再改变了