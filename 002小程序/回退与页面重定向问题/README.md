回退与页面重定向问题
===

#### 场景分析

+ 1 返回上一页
   + 希望上一页时，页面数据实时刷新

+ 2 表单提交后
   + 不能返回显示已提交的表单


#### 解决方案

> 微信小程序生命周期: 页面返回执行wx.navigateBack之后，跳转的页面会执行 onShow 函数

+ 对于场景1 : 将 loadDataFunc 放在 onShow 中执行

+ 对于场景2 : 表单页面提交成功后 调用 `wx.redirectTo` 方法不保留当前表单页


#### 简单讲述一下微信小程序路由跳转

![微信小程序生命周期](.wiki/微信小程序生命周期.png)


#### 1、wx.navigateTo   

> 保留当前页面 ,  wx.navigateBack 可以返回

```js
wx.navigateTo({
  url: '/pages?params=' + data,
})
```

```js
// 通过 onLoad options 参数获取
onLoad: function (options) {
    this.setData({
      data:options.params
    })
}
```

```js
// default:1 , 返回的页面数，如果 delta 大于现有页面数，则返回到首页
wx.navigateBack({
  delta: 2 
})
```

```js
onShow: function () {
    // re-fresh data
}
```


#### 2、wx.redirectTo   

> 关闭当前页面,跳转到另外一个页面

```js
wx.redirectTo( { url: '/test?id=1' })
```



 