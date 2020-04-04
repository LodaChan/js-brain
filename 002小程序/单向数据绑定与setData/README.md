# 关于小程序的单向数据绑定


#### 基本涉及概念

+ wxml
+ js
    + event
    + data
    + setData

#### wxml

```html
<view>
   <loading hidden="{{loadingHidden}}">正在登录...</loading>
   <button type="primary" size="default" disabled="{{disabled}}" bindtap="loginBtn">数据请求</button>
</view>
```

#### js

```js
Page({
    data: {
        disabled: false,
        loadingHidden: true
    },
    loginBtn: function (event) {
        this.setData({ disabled: true });
        //弹出正在登录框
        this.setData({ loadingHidden: false });
    }
})
```