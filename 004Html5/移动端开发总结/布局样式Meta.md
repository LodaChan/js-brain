# 移动端开发总结 - 布局样式Meta

+ 最新版本 IE Chrome指定
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
```

+ 图片保持清晰度

```css
.css{/* 普通显示屏(设备像素比例小于等于1.3)使用1倍的图 */ 
    background-image: url(img_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:1.5){
.css{/* 高清显示屏(设备像素比例大于等于1.5)使用2倍图  */
    background-image: url(img_2x.png);
  }
}
```

+ 点击不灵敏


+ 图片懒加载
   + js 判断视野范围 与 图片是否加载过
   + 通过特异的属性 data-imgurl 来记录 需要加载的图片 src

```js
var imgOffsetTop = $img.offset().top; // img相对于document顶部的位置

// 视野判断区间
imgOffsetTop < (windowHeight +  scrollTop)

// 判断是否加载过
$img.attr('data-imgurl') === $img.attr('src')

// 使用赋值加载
$img.attr('src',$img.attr('data-imgurl')); // 把自定义属性中存放的真实的src地址赋给src属性

```

+ 实现边框效果 特别是1px 和 圆角效果
   + 伪类 实现圆角渐变边框效果
   + border-image 渐变色/图片实现边框


+ 关于布局
   + 采用box-sizing:border-box;
   + 不使用 margin-left 和 margin-right ， 尽量用padding

+ swiper

```css
ul.pinxiang-list{
      width:100%;
      overflow-x:scroll;
      overflow-y:hidden;
      white-space: nowrap;
      float:left;
}
ul.pinxiang-list li{
      position:relative;
      display:inline-block;
      margin-right:5px;
}
```

+ 关于水平坍塌


+ 上传文件的图片进行CSS穿透
   + img 隔绝了click的穿透
```css
img{pointer-events: none;}
```

+ 原生 select 在安卓自定义样式丢失

```css
select{-webkit-appearance: none;}
```


+ 文本溢出

```css
/* 单行 */
.single{
    overflow:hidden;
    /* 文本不进行换行 */
    white-space:nowrap;
    text-overflow:ellipsis;
}
/* 多行 */
.multi{
    display:-webkit-box !important;
    overflow:hidden;
    text-overflow:ellipsis;
    work-break;break-all;
    -webkit-box-orient:vertical;
    /* 指定行数 */
    -webkit-line-clamp:2;  
}
```

+ 开启弹性滚动
```css
body{
   overflow:scroll;
   -webkit-overflow-scrolling:touch;
   /* Android不支持原生的弹性滚动，但可以借助第三方库iScroll来实现 */
}
```

+ 主屏贴片 主题

```html
<meta name="apple-mobile-web-app-title" content="主屏主题"> 
```

+ 主屏贴片 点击后进入全屏效果

```html
<meta name="apple-mobile-web-app-capable" content="yes" /> 
<meta name="apple-touch-fullscreen" content="yes" /> 
```

+ 主屏贴片 图标 114 x 114
```html
<!-- 原图 扁平化后，主流-->
<link rel="apple-touch-icon-precomposed" href="short_cut_114x114.png" >
<!-- 高光 -->
<link rel="apple-touch-icon" href="short_cut_114x114.png" >

```

+ 屏蔽百度贴广告
```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```

+ 数字被识别为电话号码，关闭电话自动识别功能

```html
<meta name="format-detection" content="telephone=no,email=no" />

<!-- 具体调用 使用 a 标签结合前缀 -->
<a href="tel:110">10086</a>
<a href="mailto:10086@qq.com">10086@qq.com</a>
<a mailto:10086@gmail.com">10086@gmail.com</a> 
```


+ IOS Web app启动动画

iPad 的启动画面是不包括状态栏区域的。所以启动图片需要减去状态栏区域所对应的方向上的20px大小，相应地在retina设备上要减去40px的大小

（landscape：横屏 | portrait：竖屏）

```html
<!-- iPhone -->
<link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image">
<!-- iPhone (Retina) -->
<link href="apple-touch-startup-image-640x960.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad (portrait) -->
<link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
<!-- iPad (landscape) -->
<link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">
<!-- iPad (Retina, portrait) -->
<link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad (Retina, landscape) -->
<link href="apple-touch-startup-image-2048x1496.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">

```

+  REM布局
 
```css
@media screen and (min-width:480px) and (max-width:639px) {
    html {
        font-size: 15px
    }
}
@media screen and (min-width:640px) and (max-width:719px) {
    html {
        font-size: 20px
    }
}
@media screen and (min-width:720px) and (max-width:749px) {
    html {
        font-size: 22.5px
    }
}
@media screen and (min-width:750px) and (max-width:799px) {
    html {
        font-size: 23.5px
    }
}
@media screen and (min-width:800px) and (max-width:959px) {
    html {
        font-size: 25px
    }
}
@media screen and (min-width:960px) and (max-width:1079px) {
    html {
        font-size: 30px
    }
}
@media screen and (min-width:1080px) {
    html {
        font-size: 32px
    }
```

+ 触摸DOM元素会半透明的灰色背景
```css
a,button,input,textarea,select{
    -webkit-tap-highlight-color: rgba(0,0,0,0;)
}

/* 如果还是没办法就替换标签吧 */
html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

```

```html
<meta name="msapplication-tap-highlight" content="no">
```

+ 取消默认外观

```css
a,button,input,textarea,select{
   -webkit-appearance:none;
}
```

+ 键盘输入默认开启大写 与 开启自动修正

```html
<input type="text" autocapitalize="off" autocorrect="off" />
```

+ 清除输入框内阴影
```css
input,textarea {
　　border: 0; 
　　-webkit-appearance: none; 
}
```

+ 禁止保存或拷贝图像
```css
img { -webkit-touch-callout: none; }
```

+ 如何模拟按钮hover
```
ontouchstart
ontouchend
来改变className
.className = "ele-hover"
```

+ 屏幕旋转 与 样式 控制
```js
window.onorientationchange = function(){
    switch(window.orientation){
        case -90:
        case 90:
        alert("横屏:" + window.orientation);
        case 0:
        case 180:
        alert("竖屏:" + window.orientation);
        break;
    }
} 
```
```css
/* 竖屏时使用的样式 */
@media all and (orientation:portrait) {
    .css{}
}

/* 横屏时使用的样式 */
@media all and (orientation:landscape) {
    .css{}
}
```

+ audio元素和video元素在ios和andriod中无法自动播放
  + 触屏即播

+ 摇一摇 DeviceMotionEvent
```js
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}

// event.accelerationIncludingGravity.x;
// event.accelerationIncludingGravity.y;
// event.accelerationIncludingGravity.z;
```

+ 指定上传照片还是视频
  + ios 有拍照、录像、选取本地图片功能
  + 部分android只有选取本地图片功能
```html
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
```


+ transition闪屏
```css
.ele{
    /* 硬件加速特别是svg */
    transform: translate3d(0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
}
```


+ 去掉语音输入按钮

```css
input::-webkit-input-speech-button {display: none}
```


