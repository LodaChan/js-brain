关于本地缓存
===

> 微信给每个小程序提供了10M的本地缓存空间

#### 缓存API

|操作|异步方式|同步方式|
|-|-|-|
|插入	|wx.setStorage	|wx.setStorageSync|
|读取	|wx.getStorage	|wx.getStorageSync|
|删除	|wx.removeStorage	|wx.removeStorageSync|
|清空	|wx.clearStorage	|wx.clearStorageSync|
|获取缓存信息	|wx.getStorageInfo	|wx.getStorageInfoSync|


#### 缓存例子

> 建议异步存，同步读取

```js
// 同步方式写入
wx.setStorage({
    key: 'key1',
    data: 'data1',
    success: function (res) {
        console.log('异步保存成功')
    }
})
// 异步方式写入
wx.setStorageSync('key2', 'data2')
console.log('同步保存成功')
```

+ 读取缓存
```js


// 同步
var cache = wx.getStorageSync('your cache key');

// 异步
let that = this;
wx.getStorage({
    key: 'number',
    success: function (res) {
        that.setData({
            number: res.data
        })
    },
    fail: function (res) {
    }
})
```

+ 清除缓存

```js
// 全部清除
wx.clearStorage()

// 单个清除
wx.removeStorage({
    key: 'key',
    success(res) {
        // ...
    }
})
```