# for-in与for-of

 
+ for in 是 ES5 标准，遍历 key 值，遍历对象和数组 `一般不推荐遍历数组`
+ for of 是 ES6 标准, 遍历 value 值，遍历数组    `不能遍历普通对象`

#### 为什么 for of 不能遍历普通对象

> 普通对象没有 Symbol.iterator 迭代器 属性，如果一个对象拥有Symbol.iterator属性，那么就可以使用for...of遍历

+ 1 通过自定义迭代器

```js
 let obj = {
        data: ['hello', 'world'],
        [Symbol.iterator]() {
            const self = this;
            let index = 0;
            return {
                next() {
                    if (index < self.data.length) {
                        return { value: self.data[index++], done: false };
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
        }
    }
```

+ 2 引用 [Symbol.iterator]: Array.prototype[Symbol.iterator] 迭代器
```js
let iterableObj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterableObj) {
    console.log(item); // 'a', 'b', 'c'
}
```