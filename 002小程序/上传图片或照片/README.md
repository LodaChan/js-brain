上传图片或照片
===

+ 图片预览

```js
previewImage: function(e) {
    let current = e.target.dataset.src;
    let imageList = [];
    for (let i = 0; i < this.data.newBillList.length; i++) {
        if (e.target.dataset.shipmentid == this.data.newBillList[i].ShipmetId) {
        imageList = this.data.newBillList[i].ImageList;
        }
        wx.previewImage({
            current: current, //当前显示图片的链接
            urls: imageList //需要预览的图片链接列表
        })
    }
},
```

+ 从相册中选择图片并文件上传
```js
wx.chooseImage({
    count: 1, 
    sizeType: ['original', 'compressed'], 
    sourceType: ['album', 'camera'], 
    success: function (res) {
        
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
            url: 'https://xxxx.com/wxapp', 
            filePath: tempFilePaths[0],
            name: 'img',
            header: {
                "Content-Type": "multipart/form-data",
                'accept': 'application/json',
                'Authorization': token
            },
            formData: {
                'user': 'test' // 其他的字段
            },
            success: function (res) {
                var data = res.data;
                console.log('data');
            },
            fail: function (res) {
                console.log('fail');
            },
        })
    }
})
```

+ 进度监控

```js
const uploadTask = wx.uploadFile({
     // .....
})
uploadTask.onProgressUpdate((res) => {
  console.log('上传进度', res.progress)
  console.log('已经上传的数据长度', res.totalBytesSent)
  console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
})
```