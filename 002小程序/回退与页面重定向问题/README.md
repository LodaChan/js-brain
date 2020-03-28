回退与页面重定向问题
===

#### 场景分析

+ 1 返回上一页
   + 希望上一页页面数据实时刷新

+ 2 表单提交后
   + 不能再显示提交表单


#### 解决方案

    微信小程序生命周期: 页面返回执行wx.navigateBack之后，跳转的页面会执行 onShow 函数

+ 对于场景1 : 将 loadDataFunc 放在 onShow 中执行

+ 对于场景2 : 表单页面提交成功后 调用 `wx.redirectTo` 方法不保留当前表单页


#### 简单讲述一下微信小程序路由跳转


#### wx.navigateTo   

      保留当前页面 ,  wx.navigateBack 可以返回

```js
wx.navigateTo({
  url: '/pages?params=' + data,
})
```

通过 onLoad options 参数获取
```js
onLoad: function (options) {
    this.setData({
      data:options.params
    })
}
```

```js
wx.navigateBack({
  delta: 2 // default:1 , 返回的页面数，如果 delta 大于现有页面数，则返回到首页
})
```

通过上一层页面的 OnShow 方法进行数据更新

```js
onShow: function () {
    // re-fresh data
}
```



#### wx.redirectTo   

    关闭当前页面,跳转到另外一个页面

```js
wx.redirectTo( { url: '/test?id=1' })
```



 