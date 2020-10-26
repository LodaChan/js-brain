# ES6扩展运算符妙用 不是线程安全的，不建议使用

#### 神奇的使用场景 - 对象

+ 1 对象复制 实现快速浅拷贝

```js
var obj1 = { x: 1, y: 2, z: 3 }
var obj2 = { ...obj1 }
```

+ 2 对象合并
    + key 值建议不重复
    + key 值重复以 最后 结构的Obj key-value 为最新

```js
let obj3 = { a: 1 }
let obj4 = { b: 2 }
let obj5 = { ...obj3, ...obj4 }
```

+ 3 快速添加自定义属性
```js
let obj6 = { x: 1 }
let customerObj = { ...obj6, a: 4, b: 5 }
console.log(customerObj)//  {x: 1, a: 4, b: 5}
```

#### 神奇的使用场景 - 数组

+ 4 数组复制 实现快速浅拷贝
```js
let array1 = [1, 2, 3]
let array2 = [...array1]
console.log(array2) // [1, 2, 3]
console.log(array1 == array2) // false
console.log(array1 === array2) // false
```

+ 5 数组合并
```js
let array3 = [1, 2, 3]
let array4 = [1, 2, 3, 4]
let mergeArray = [...array3, ...array4]
console.log(mergeArray) // [1, 2, 3, 1, 2, 3, 4]
```

+ 6 字符串快速变数组
```js
let str = "hellow world"
let charArray = [...str]
console.log(charArray)// ["h", "e", "l", "l", "o", "w", " ", "w", "o", "r", "l", "d"]
console.log(charArray.join(''))// hellow world
```

