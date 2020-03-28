# 使用弹出层底部页面依然滚动

#### 解决方案

        当弹出层出现时，给底部页面加1个class，当弹出层关闭后 remove class

```css
.after-popup-page-class {
    top     : 0px;
    left    : 0px;
    width   : 100%;
    height  : 100%;
    overflow: hidden;
    position: fixed;
    z-index : 0;
}
```