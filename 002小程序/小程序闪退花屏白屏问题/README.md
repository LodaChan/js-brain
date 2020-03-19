# 小程序闪退花屏问题

#### 解决方案

+ 图片不要过大 
   + 进行压缩


+ setData数据量不要过大 
   + 数据降维
   + 数据结构优化


+ 同时请求数量不能过多
   + 加入请求限制，同时最大3个

+ 使用 class:hidden 替代 wx:if 
   + 2个或以上 view 销毁或重新渲染时出现闪退




+ 慎用 wx:for 
   + 避免重复渲染 ，判断逻辑不能太deep , 增加渲染消耗会出现花屏、白屏
   + 使用 block 替代 view

参考官方issue: [issue-1784-wx:for会出现花屏或者重复渲染 ](https://github.com/Tencent/wepy/issues/1784 "issue-1784-wx:for会出现花屏或者重复渲染")


```html
<view wx:for="{{list}}" wx:key="index">

<block wx:for="{{list}}" wx:key="index">
```

+ 慎用 filter 等高级样式，用图片来替代效果

```css
.shadow{
   filter: drop-shadow(0rpx 0rpx 10rpx #c50000)
}
```

+ 无解
   + 网速问题
   + 运行程序过多
   + 手机杀毒应用恶意代码
   + 微信版本
   + 缓存垃圾过多