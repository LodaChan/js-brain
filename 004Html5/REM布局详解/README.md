# REM布局详解

> 本质是等比缩放

配合

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

+ 通过js计算后 重新设置 html font-size 大小
+ 内部元素通过 rem 的单位来判断大小
+ 100rem就是100的宽度啦
+ html px , 其他元素 rem

```css
html {    
	font-size:16px;
}


p {    
    /* 12÷16=0.75 , 配合设计稿进行计算 */
	font-size: 0.75rem;  
}
```


```js
// 大于540px可以认定为不是手机屏
window.onload = () => {
    var documentEle = document.documentElement

    var clientWidht = documentEle.clientWidth;
    console.log("document width", clientWidht + 'px')

    var remUnit = clientWidht / 100;
    documentEle.style.fontSize = remUnit + 'px';
    console.log("REM", remUnit + 'px')
}
```

