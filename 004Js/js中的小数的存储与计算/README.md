# 小数的存储与科学计数法

```js
console.log(0.1 + 0.2 === 0.3) // false
```

#### 1 小数在 js 中的表示

IEEE754 , 计算机基本都是 二进制 存储的  js才用双精度   符号位1，指数位11，有效数52

+ 0.1 === 1   *10^-1 -> 1.1001*2^-4
+ 0.2 ->  2   *10^-1 -> 1.1001*2^-3

#### 2 解决

```js
(0.1+0.2).toFixed(1) // "0.3"
Number("0.3") // 0.3
```