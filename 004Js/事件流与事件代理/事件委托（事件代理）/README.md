# 事件委托（事件代理）

+ 1 将多个事件处理器减少到一个，因为事件处理器要驻留内存，这样就提高了性能
+ 2 对于复杂场景 event.target 可以实现逻辑锁定，即1个事件代理处理元素与子元素的事件
+ 3 对新增子元素不需要重新绑定事件处理器
+ 4 子元素可以添加自己的事件监听 添加阻止冒泡 event.stopPropagation(); 

```js
// 事件代理
(function(){
    var colorList=document.getElementById("color-list");
    colorList.addEventListener('click',showColor,false);
    function showColor (e) {
        e=e||window.event;
        var targetElement=e.target||e.srcElement;
        if(targetElement.nodeName.toLowerCase()==="li"){
        alert(targetElement.innerHTML);
        }
    }
})();

// 阻止冒泡
document.getElementById("father").addEventListener("click",fatherClick);
document.getElementById("son").addEventListener("click",sonClick);

function fatherClick(){
    alert("div");
}

function sonClick(event){
    alert(event.type);
    event.stopPropagation();
}
```

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

#### 事件等级

+   0级事件处理 btn.onclick = function () {}
+   2级事件处理（事件监听）addEventListener("事件名" , handle , true捕获|false冒泡);