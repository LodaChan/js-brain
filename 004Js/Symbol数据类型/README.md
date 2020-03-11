# Symbol数据类型


#### 一、基本用法

+ 1 本质上是一种`唯一标识符`，可用作对象的唯一属性名

```js
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1, typeof id1);// Symbol(id)
console.log(id2, typeof id2);// Symbol(id)
console.log(id1 == id2);  //false
console.log(id1 === id2);  //false
```

+ 2 `隐藏性`，`for key in obj`，`object.keys()` 不能访问
+ 3 当作为 obj 的key 需要用 `[]` 进行包裹

```js
let idSymbol = Symbol("id");
let nameSymbol = Symbol("name");
let obj = {
    [idSymbol]: "I am id symbol",
    [nameSymbol]: "I am name symbol",
    ["array key"]:"test array_key" // 神奇使得 obj 有神奇的key
};
console.log(obj);// {Symbol(id): "I am symbol"}
console.log(Object.keys(obj));// []
for (let key in obj) {
    // symbol no console
    console.log(key,obj[key]);// array key test array_key
}
```

+ 4 只能通过 `getOwnPropertySymbols` 来获取对应 symbol keys

```js
let objOwnPropertySymbolKeys = Object.getOwnPropertySymbols(obj);
console.log(objOwnPropertySymbolKeys); // [Symbol(id)]
console.log(obj[objOwnPropertySymbolKeys[0]]);  // I am id symbol
console.log(obj[objOwnPropertySymbolKeys[1]]);  // I am name symbol
```


#### 二、其他用法

+ 1 `Symbol("key")` 永远都是新创建

+ 2 `Symbol.for` 检测是否已有 对应的 key 登记 ， 未创建后新建 ，已创建后返回

```js
let dupekey1 = Symbol.for('dupekey'); //检测到未创建后新建
let dupekey2 = Symbol.for('dupekey'); //检测到已创建后返回
console.log(dupekey1 == dupekey2); // true
console.log(dupekey1 === dupekey2); // true
```

+ 3 获取原来的 `Symbol.keyFor(symbolObj)`
```js
let dupekey1 = Symbol.for('dupekey'); //检测到未创建后新建
let dupekey2 = Symbol.for('dupekey'); //检测到已创建后返回
console.log(dupekey1 == dupekey2); // true
console.log(dupekey1 === dupekey2); // true

console.log(Symbol.keyFor(dupekey1));  // 'dupekey'
console.log(Symbol.keyFor(dupekey2));  // 'dupekey'
```
