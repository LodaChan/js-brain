# 执行效率

+ `>-1` 比 >=0 执行起来更快

+  do-while、while 、for、for-in 从快到慢

```js
// 比较高效的js遍历
var props = ['prop1', 'prop2'],i = 0;
whlie(i < props.length){
   precess(object[props[i++]]);
}
```

+ 简单判断时，switch比if-else快

+ 避免使用with、try-catch中的catch语句，因为它会改变执行环境的作用域链

+ 尽量少用嵌套对象、避免对象嵌套过深，结构压平

+ 避免在循环中操作element或者改变其样式，会引起 一大串的 回流/重绘
```
childNodes -> children
childElementCount -> childNodes.length
firstElementChild -> firstChild
lastElementChild -> last Child
getElementByTagName  ->querySelectorAll
```

+  合并多次对DOM和样式的修改
```js
var el = document.getElementById('mydiv');
el.style.cssText = 'margin = '5px';padding = '2px';borderLeft= '5px';
```

+ 使用事件委托来减少事件处理器的数量
