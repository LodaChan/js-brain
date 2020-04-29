# ES6Class

## 类的声明

```js
// 匿名类
let Example1 = class {
    constructor(a) {
        this.a = a;
    }
}
// 命名类
let Example2 = class Example {
    constructor(a) {
        this.a = a;
    }
}
```

## 类

#### constructor

> constructor 方法如果没有显式定义，会隐式生成一个constructor方法。所以即使你没有添加构造函数，构造函数也是存在的

```js
console.log(Person.prototype);// constructor,__proto__,fns
```


#### 其他

+ 类自身指向的就是构造函数，所以本质上就是函数

```js
console.log(Person === Person.prototype.constructor)// true
```

+ 所有的类实例__proto__都是相同的

```js
// 1  __proto__和constructor属性 是 对象所独有的

// 2 当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（可以理解为父对象）里找，如果父对象也不存在这个属性，则继续往父对象的__proto__属性所指向的那个对象

// 3 通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链

// 4 调用的字符串方法、数组方法、对象方法、函数方法等都是靠__proto__继承而来
```


```js
//  所有的类实例__proto__都是相等的，所以不建议通过 __proto__ 添加方法
console.log(obj.__proto__ === newObj.__proto__) 
obj.__proto__.__protoSay = function () {
    return `__proto__${this.name} ${this.age}`;
}
console.log(obj.__protoSay());
console.log(newObj.__protoSay());
```


#### 动态增加方法

```js
// 动态给类增加方法
Object.assign(Person.prototype, {
    getName: function () {
        return this.name;
    },
    getAge: function () {
        return this.age;
    }
})
```

#### static 静态方法

> 可以有静态方法，但是没有静态属性


#### class不存在变量提升

```js
//ES5可以先使用再定义,存在变量提升
new A();
function A(){

}
//ES6不能先使用再定义,不存在变量提升 会报错
new B();//B is not defined
class B{

}
```