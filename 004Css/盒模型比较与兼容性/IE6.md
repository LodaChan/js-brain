# 盒模型比较与兼容性

#### IE6

+ 设置1px高的容器(div) 
   + 使用 line-height 解决

+ opacity不兼容
   + filter:alpha(opacity=50); 滤镜解决

+ float的元素在margin会加倍
  + display:inline; 或 使用 css hack

+ 图片套上a标签会默认有border
  + 图片border:none;

+ 在各个浏览器下img有空隙
  + 消灭回车

+ 浮动元素与流动元素并列显示，并列3元素的问题
  + >< 相连

+ 行内元素为包含边框
  + 内元素百分比定位错乱问题，zoom:1 解决

+ 多个浮动元素中间夹杂着HTML注释语句时，如果浮动元素宽度为100%，则在下一行多显示一个上一行最后一个字符
  + loader清除空格与注释

+ 两个块元素，竖向的margin值不增加

 + min识别
 ```css
 #container{ min-width: 600px;width:expression(document.body.clientWidth＜ 600? "600px": "auto" );}
 ```

 + 图片下有空隙产生
    + img为display:block
    + vertical-align:top/bottom/middle/text-bottom