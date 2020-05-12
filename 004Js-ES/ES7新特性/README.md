# ES7新特性

+ 1 Array.prototype.includes()

```js
['a', 'b', 'c'].includes('a')     // true
['a', 'b', 'c', 'd'].includes('b', 1)      // true

let demo = [1, NaN, 2, 3]

demo.indexOf(NaN)        //-1
demo.includes(NaN)       //true
```

+ 2 求幂运算符
```js
3 ** 2  //9
效果同
Math.pow(3, 2) //9
```
