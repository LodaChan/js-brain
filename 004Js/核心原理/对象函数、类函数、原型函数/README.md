# 基础概念


#### 关于对象

> 无 prototype , 不能 new

 
+ 对象方法

```js
var obj = {
    a: 1,
    b: 2,
    objFn: function () {
        console.log("object function", this)
    }
}
```
+ 类方法

```js
obj.classFn = function () {
    console.log("class function", this)
}
```


#### 关于函数

独有 `prototype`

+ 对象方法

> 实例才可调用方法

> this - fn object

```js
function fn(){
    this.objectFn = () ={}
}

// 调用
var fnObj = new fn();
fnObj.objectFn();
```

+ 类方法 / 类处理时 静态方法

> 可直接使用

> this - fn

```js
function fn(){
     
}
fn.classFn = ()=>{}

// 调用
fn.classFn();
```

+ 原型方法 / 类处理时 类方法

> 实例才可调用方法,用于对象实例共享

> this - fnObj

```js
function fn(){

}
fn.prototype.prototypeFn = ()=>{}

// 调用
var fnObj = new fn();
fnObj.prototypeFn();// 实际在 fnObj 的 __proto__ 中
```