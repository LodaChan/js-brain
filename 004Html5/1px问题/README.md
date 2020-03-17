# 1px问题

> 怎么设置了1px，在 XS Max看起来那么粗


#### 概念引入 devicePixelRatio

> devicePixelRatio = 物理像素 / 独立像素 

例如:   devicePixelRatio = 设备实际物理像素  / 750px ， 所以 1px 最终看起来是 2px 或者 3px


```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

#### 解决办法

+ 自动加入 meta 标签进行适配

```js
metaEle = doc.createElement('meta');
metaEle.setAttribute('name', 'viewport');
metaEle.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```

+ 根据机型去加载CSS

```js
var link = document.createElement('link');
link.setAttribute("rel","stylesheet");
link.setAttribute("type","text/css");
link.setAttribute("href",".......Android.css");
document.querySelector('head').appendChild(link);
```

+ @media 媒体查询

```css
.border { border: 1px solid #999 }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border { border: 0.5px solid #999 }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border { border: 0.333333px solid #999 }
}
```

+ 对于边框场景 - 伪类
   + 使用 broder none 利用 :after :before 来实现假边框效果
   + 利用 height: 200%; width: 200%; transform: scale(0.5); 来解决

```css
.scale:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}
```

+ 对于边框场景 - box-shadow
  + 而且 box-shadow 不会影响流布局

```css
-moz-box-shadow: 0px 0px 1px 1px #888888; /* 老的 Firefox */
box-shadow: 0px 0px 1px 1px #888888;
```

+ less 变量 定义小数

```css
@border-width-for-2dpx    : 0.5px;
@border-width-for-3dpx    : 0.33333px;

.border { border: 1px solid #999 }

@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border { border: @border-width-for-2dpx  solid #999 }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border { border: @border-width-for-3dpx solid #999 }
}
```

+ 对于边框场景 border-image
```css
border-image: url(border.png) 30 round;
```

+ REM布局

html元素上的font-size会被设置为屏幕宽的1/100, css以rem为基础长度单位进行改写, 比如rem是28px, 原先的7px就是0.25rem. border的宽度能直接写1px

```js
window.onload = () => {
    var documentEle = document.documentElement
    var clientWidht = documentEle.clientWidth;

    var remUnit = clientWidht / 100;
    documentEle.style.fontSize = remUnit + 'px';
    console.log("REM", remUnit + 'px')
}
```
