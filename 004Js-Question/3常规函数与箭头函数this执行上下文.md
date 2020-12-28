## 1
```js

const shape = {
  radius: 10,
  fn1() {
    return this.radius * 2
  },
  fn2: () => 2 * Math.PI * this.radius
}

shape.fn1()  // 20 , 最近上下文 shap
shape.fn2()  // NaN ， 变成了当前上下文  2 * Math.PI * undefined -> NaN

```