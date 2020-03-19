# 关于本地缓存

> 本地缓存为10MB

#### 本地缓存 基本操作

|操作|异步|同步|
|-|-|-|
|插入	|wx.setStorage	|wx.setStorageSync|
|读取	|wx.getStorage	|wx.getStorageSync|
|删除	|wx.removeStorage	|wx.removeStorageSync|
|清空	|wx.clearStorage	|wx.clearStorageSync|
|获取缓存信息	|wx.getStorageInfo	|wx.getStorageInfoSync|


#### 本地缓存 例子

> 建议异步存，同步读取

```js
wx.setStorage({
    key: 'key1',
    data: 'data1',
    success: function (res) {
        console.log('异步保存成功')
    }
})
wx.setStorageSync('key2', 'data2')
console.log('同步保存成功')
```

+ 读取缓存
```js
let that = this;

// 异步
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

// 同步
var userInfo = wx.getStorageSync('userInfo')
that.setData({
    userInfo: userInfo,
    userName: userInfo.name
})
var cache = wx.getStorageSync('cache_key');
```

+ 清除缓存

```js
wx.clearStorage()

wx.removeStorage({
    key: 'key',
    success(res) {
        // ...
    }
})
```