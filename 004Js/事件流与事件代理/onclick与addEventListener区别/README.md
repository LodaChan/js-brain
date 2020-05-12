# onclick 与 addEventListener 区别

#### onclick 与 addEventListener 细节

+ onclick
  + 在同一时间只能指向唯一对象
  + HTML
  + event.stopPropagation(): 取消冒泡 一般点击事件都建议阻止
  + event.preventDefault() 阻止默认事件,比如 a href="JavaScript：void(0)" , 在事件中处理也行
  + return false 全部阻止
```js
element.onclick = fn;
element.onclick = null ;
```

+ addEventListener/attachEvent
  + 可以设置多个
  + 任何DOM都是有效的
  + 可以控制捕获/冒泡
  + removeEventListener/detachEvent 清除
  + addEventListener click
  + attachEvent onclick

```js
element.addEventListener("click",fn,false)
// true 捕获
// false 冒泡


element.removeEventListener("click");
```


![捕获与冒泡.png](捕获与冒泡.png)

#### 关于 执行顺序

+ onclick 会先执行
+ addEventListener
   + FF 1-2-3
   + IE 3-2-1

#### 关于 event 参数
+ w3c
  + target
+ IE 
  + srcElement