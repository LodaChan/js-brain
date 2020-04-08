# 判断是否支持CSS3


+ 1 如果支持的话, 会输出 ""
+ 2 如果不支持的话, 会输出 undefined  ， typeof(reValue) === undefined
+ 3 需要注意浏览器的核心

```js
var div = document.createElement('div');
// chrome 为 WebkitTransition 
console.log(div.style.transition);
```

