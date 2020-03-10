# new干了什么

> new Function(..args) new 构造函数
> new Object(..args)   new 对象

#### new 分解步骤 

+ 创建1个新的对象
+ 将原parent函数的原型赋值给新对象的__proto__中
+ 调用apply，劫持另外一个对象的方法，继承另外一个对象的属性
+ 返回新的对象

 ```js
function cutomerNew(parent, ...agrs) {
    let obj = {}
    obj.__proto__ = parent.prototype;
    parent.apply(obj, agrs);
    return obj;
}
 ```

#### 注意细节

+ 1 全部的 `属性` 、`对象方法` 、`原型方法` 会通过 new 的原型进行传递
+ 2 `原型方法` 需要 `newFn.__proto__._prototypeFunction` 才可以获取
+ 2 parent的 `私有变量` 、`私有方法` 、`类方法` 将不会被传递