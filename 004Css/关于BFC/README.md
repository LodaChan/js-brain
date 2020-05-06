# 关于BFC

>  BFC（Block Formatting Context）格式化上下文 , 指一个独立的渲染区域或者说是一个隔离的独立容器。


#### BFC 的 形成

1、浮动元素，float 除 none 以外的值； 
2、定位元素，position（absolute，fixed）； 
3、display 为以下其中之一的值 inline-block，table-cell，table-caption； 
4、常见 `overflow不为visible；`

#### BFC 的 特性

1.内部的Box会在垂直方向上一个接一个的放置。
2.垂直方向上的距离由 margin 决定
3.bfc的区域不会与float的元素区域重叠。
4.计算bfc的高度时，浮动元素也参与计算
5.bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

#### BFC 的 场景

+ 1 垂直间隔 div 上下有 margin分别是 20 , 30 , 但是最后是 30 , 不是 50

+ 2 浮动元素覆盖 , 两栏布局(右侧不设置width),三栏布局(中间不设置width)

+ 3 防止字体环绕, 用 p 对文本进行隔离

+ 4 overflow:hidden清除溢出,然后就把父元素的height撑大.`对应特性4`


####  UI 框架方案

+ Bootstrap
   + clearfix

+ 大厂
   + div:after {content:''; display:inline-block; clear:both;}

+ 个人
   + div class warper
   + display none
   + visibility hidden
