# 实用技巧

+ 数据类型判断

```js
Object.prototype.toString.call(obj)
typeof obj
```

+ 获取参数
   + ...args 剩余参数 `数组实例`
   + Array.prototype.slice.call(arguments)
    
```js
let sliceFn = function (...args) {
    var arr = Array.prototype.slice.call(arguments);
    console.log("arguments", arguments); // Arguments(4) [1, 2, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]
    console.log("...args", args); //[1, 2, 3, 4]
    console.log("Array.prototype.slice.call", arr); //[1, 2, 3, 4]
};
sliceFn(1, 2, 3, 4);
```


+ 参数是引用，所以建议浅拷贝

+ with 批量更新属性值
   + `缺点`
      + 数据泄露 ， 当传入对象没有定义，那么会暴露到作用域中
      + 执行效率低
    