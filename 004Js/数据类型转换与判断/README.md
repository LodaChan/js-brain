# 数据类型判断


#### js 中的基础数据类型 - 值类型


| 名称 | 说明 |
| :------ | :-------------------------------- |
| null | 是特殊的对象  |
| undefined |   |
| number | NaN是特殊的数字 |
| string |   |
| boolean |   |
| ES6 symbol |   |

#### js 中的  引用类型

> 注意作为参数传入的时候，执行时改变数据，需要考虑深拷贝

| 名称 | 说明 |
| :------ | :-------------------------------- |
| 数组 |  |
| 对象 |   |
| 函数 |   |


#### 常用判断逻辑与转换

+ null

```js
console.log(null === null, typeof null ,Object.prototype.toString.call(null)) // true "object" [object Null]
```

+ undefined

```js
console.log(undefined === undefined, typeof undefined) // true "undefined"
```

+ string / ""

```js
// str && str.length > 0
console.log("abc".length > 0, typeof "abc") // true "string"
console.log("".length > 0, typeof "") // true "string"
```

+ number/NaN/越界
```js
console.log(1, typeof 1)// 1 number
console.log(isNaN(NaN),NaN === NaN, typeof NaN)// true false "number"

Number.isFinite()  // 是否是无穷大
Number.isInteger() // 是否为整数
Number.isSafeInteger() // 如果一个值是一个 IEEE-754 双精度数字而不是四舍五入的不安全的整数的结果就说它是安全的

console.log(Number(undefined)) // NaN
```

+ boolean

```js
console.log(typeof true,Object.prototype.toString.call(true)) // boolean [object Boolean]
```

+ symbol
```js
let idSymbol = Symbol("id");
console.log(typeof idSymbol, Object.prototype.toString.call(idSymbol))// symbol [object Symbol]

let nameSymbol = Symbol("name");
let obj = {
    [idSymbol]: "I am id symbol",
    [nameSymbol]: "I am name symbol",
    ["array key"]: "test array_key" // 神奇使得 obj 有神奇的key
};

let objOwnPropertySymbolKeys = Object.getOwnPropertySymbols(obj);
console.log(objOwnPropertySymbolKeys); // [Symbol(id)]
console.log(obj[idSymbol]);  // I am id symbol
console.log(obj[objOwnPropertySymbolKeys[0]]);  // I am id symbol
console.log(obj[objOwnPropertySymbolKeys[1]]);  // I am name symbol
```


