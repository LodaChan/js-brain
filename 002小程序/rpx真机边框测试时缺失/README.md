rpx真机边框测试时缺失
===

> 因为 rpx 设置为偶数 计算时遇到 0.5 这种情况


#### 解决方案

+ 1、 rpx设置 全部设置为 奇数

+ 2、补充像素单位

```html
<view class='space'></view>
 ```

 ```css
.space {
    width: 1rpx;
    height: 100%;
    float: left;
}
 ```

+ 3、 border-image 始终使用1个 1px的背景图 作为边框

```css
.border {
    border      : 1px solid transparent; /* 注：需要先设置，否则失效 */
    border-image: url('your border image') 30 30 round;
}
```



