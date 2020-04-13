# data必须是一个函数 return 对象

> Object 是 引用数据类型，new fun()() 则是新的对象

实例相互独立，不会相互影响

```js
// 对象写法
const MyComponent = function() {};

MyComponent.prototype.data = {
    a: 1,
    b: 2
}

const component1 = new MyComponent();
const component2 = new MyComponent();
 
component1.data.a === component2.data.a; // true
component1.data.b = 5;
component2.data.b //5
```

```js
// 函数 return 对象
const MyComponent = function() {
    this.data = this.loadData();
};
 
MyComponent.prototype.loadData = function() {
    return {
        a:1,
        b:2
    }
};
```