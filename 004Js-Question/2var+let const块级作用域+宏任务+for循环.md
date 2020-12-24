
## 1
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

// 3
// 3
// 3
// i 相当于 window.i

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
// 0
// 1
// 2
// 每次执行都会有新的作用域
```

## 2
```js
var i = 0;
for (; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

// 3
// 3
// 3

let i = 0;
for (; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
// 3
// 3
// 3
// i 近似于 window.i
```

## 3
```js

for (var i = 0; i < 3; i++) {
  let index = i+'';
  setTimeout(() => {console.log(index,i)}, i * 10)
}
// 0 3
// 1 3
// 2 3
// 因为 for 循环执行非常快， 而 setTimeout 宏任务已经在消息队列中

for (var i = 0; i < 3; i++) {
  let index = i+'';
  setTimeout(() => {console.log(index,i)}, 0)
}
// 同理

```