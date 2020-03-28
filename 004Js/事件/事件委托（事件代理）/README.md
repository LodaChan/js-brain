

#### event 参数

+ IE window.event.srcElement
+ 其他浏览器 event.target


#### 好处与优点
+ 不需要用for循环为子元素添加事件了
+ 跳出外层，自动为新生成的子元素也不用新为其添加事件

```js
var eles = [];
for (var i = 0; i < eles.length; i++) {
    (function () {
        eles[i].onmouseover = function () { this.style.background = 'red'; }
        eles[i].onmouseout = function () { this.style.background = ''; }
    })(i);
}
```
 
 ```js
var ul = document.getElementById('ul1');

ul.onmouseover = function (ev) {
    var ev = ev || window.event;
    var oLi = ev.srcElement || ev.target;
    if (oLi.nodeName.toLowerCase() == 'li') {
        oLi.style.background = 'red';
    }
}

ul.onmouseout = function (ev) {
    var ev = ev || window.event;
    var oLi = ev.srcElement || ev.target;
    if (oLi.nodeName.toLowerCase() == 'li') {
        oLi.style.background = '';
    }
}
```