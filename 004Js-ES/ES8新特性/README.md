# ES8新特性

+ 1 Object.entries()

```js
Object.entries({ one: 1, two: 2 })    //[['one', 1], ['two', 2]]
Object.entries([1, 2])                //[['0', 1], ['1', 2]]
Object.entries({[Symbol()]:1, two: 2})  //[['two', 2]]
Object.entries({ 3: 'a', 4: 'b', 1: 'c' })    //[['1', 'c'], ['3', 'a'], ['4', 'b']]


var obj = { foo: 'bar', baz: 42 };

var map1 = new Map([['foo', 'bar'], ['baz', 42]]); //原本的创建方式
var map2 = new Map(Object.entries(obj));    //等同于map1

console.log(map1);// Map { foo: "bar", baz: 42 }
console.log(map2);// Map { foo: "bar", baz: 42 }

```

+ 2  Object.values()
```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.keys(obj)) //["foo", "baz"]
console.log(Object.values(obj)) //["bar", 42]
```

+ 3 字符串填充 String.padStart(targetLength, padding)

```js
'Vue'.padStart(10)           //'       Vue'
'React'.padStart(10)         //'     React'
'JavaScript'.padStart(10)    //'JavaScript'

'Vue'.padEnd(10, '_*')           //'Vue_*_*_*_'
'React'.padEnd(10, 'Hello')      //'ReactHello'
'JavaScript'.padEnd(10, 'Hi')    //'JavaScript'
'JavaScript'.padEnd(8, 'Hi')     //'JavaScript'

```

+ 4 Object.getOwnPropertyDescriptors

返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能是从原型链继承来的

与 ES6 比较 一个是只返回知道属性名的描述对象,一个返回目标对象所有自身属性的描述对象

```js

var obj = {
    id:  1,
    name: 'obj name',
    get gender() {
        console.log('gender')
    },
    set grad(d) {
        console.log(d)
    }
}
console.log(Object.getOwnPropertyDescriptors(obj))

// ES7   
{
  gender: {
    configurable: true,
    enumerable: true,
    get: f gender(),
    set: undefined
  },
  grade: {
    configurable: true,
    enumerable: true,
    get: undefined,
    set: f grade(g)
  },
  id: {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  },
  name: {
    configurable: true,
    enumerable: true,
    value: 'obj name',
    writable: true
  }
}

// ES6
{
  id: {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  }
}
```

+ 5 函数参数支持尾部逗号

+ 6 修饰器/装饰器 Decorator

   + 函数修饰器
   + 类修饰器
   + 多个修饰器的执行顺序(从外到内进入，然后由内向外执行,1,2,2,1)
