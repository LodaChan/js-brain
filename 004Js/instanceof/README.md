# instanceof
>  检测一个对象 在 其原型链中 是否 存在一个构造函数的 prototype 属性

```js
function instanceOf(obj,ConstructorFn) {
    let proto = obj.__proto__;
    let prototype = ConstructorFn.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
```