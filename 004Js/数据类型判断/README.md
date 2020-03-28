# 数据类型判断

+ null
```
console.log(null === null , typeof null) // true "object"
```

+ undefined
```
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
```


+ boolean

+ symbol




