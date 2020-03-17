# 开发注意事项

+ 页面返回页面不刷新问题
   + 在onshow的时候接收参数并处理

+ 有弹层时，阻止下面的页面滚动
```css
.popup-bg-class{
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 0;
}
```

+ rpx设置在大屏手机显示过小
  + 规定屏幕宽度为 750px 去做适配，  rpx = 物理像素 / 屏幕宽度


+ 小程序闪退问题
  + 图片不要过大 
  + setData数据量不要过大 
  + 同时请求数量不能过多

+ 获取view的 id 和 data-shipmentid
  + e.target.id
  + e.target.dataset.shipmentid

+ 所有页面路径都要放在app.json
```
xxx is not in  app.json
```

+ 操作动态循环的数据
   + 利用 array 的数据更新来实现
```js
for (var i = 0; i < this.data.newBillList.length; i++) {
      if (e.target.dataset.id == this.data.newBillList[i].shipmentid) {
        newBillList[i] = {
          id: this.data.newBillList[i].id,
          price: this.data.newBillList[i],
          one2one: this.data.newBillList[i],
        }
      } else {
        txtArray1[i] = {
          id: this.data.liuliangItems[i].id, changeColor: false,
          price: this.data.liuliangItems[i].price, name: this.data.liuliangItems[i].name,
          one2one: this.data.liuliangItems[i].one2one
        }
      }
    }
```

+ 上传文件wx.uploadFile - 相册选择

```js
 wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          shipmentid: e.target.dataset.shipmentid,
          imageListArr: res.tempFilePaths
        })
        //调用处理列表图片的方法
        this.addImageList(1, 0);//该函数完整代码在第6点
      },
      fail: function(data) {
        wx.showToast({
          title: "选择图片出错",
          icon: "none",
          duration: 1000
        });

      }
    });
```

+ 上传文件wx.uploadFile - 全屏预览、分享
```js
 //预览图片
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

+ 上传文件wx.uploadFile - 上传到服务器

```js
//上传图片，将本地资源上传到开发者服务器
  uploadImage: function(e) {
    var that = this;
    that.setData({
      shipmentid: e.target.dataset.shipmentid
    });
    var listArr = [];
    var uploadImgCount = 0;
    var uploadArr = [];
    var imgLength = 0;
    for (var i = 0; i < this.data.newBillList.length; i++) {
      if (e.target.dataset.shipmentid == this.data.newBillList[i].ShipmetId) {
        imgLength = this.data.newBillList[i].ImageList.length;
        var index = i;
        console.log("列表的待上传的回单数：" + imgLength);
        if (imgLength < 1) {
          wx.showToast({
            title: '没有可上传的回单',
            icon: 'none',
            mask: true,
            duration: 1000
          });
          var row = this.data.newBillList[i];
          listArr.push(row);
        } else {
          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          });
          //遍历图片列表上传
          for (var j = 0; j < this.data.newBillList[i].ImageList.length; j++) {
            //记录当前列表的索引，因为到了success里就获取不到啦
            var index = i;
            //上传图片到开发者服务器
            wx.uploadFile({
              url: app.globalData.apiurl + '/api/NoUploadBackBill/PostImageFile',
              filePath: this.data.newBillList[i].ImageList[j], //要上传文件资源的路径
              name: 'image', // 这里的具体值，要与后台保持一致
              header: {
                'content-type': 'multipart/form-data',
                'Authorization': "BasicAuth " + util.getToken()
              },
              formData: { //HTTP 请求中其他额外的 form data
                'shipmentid': this.data.shipmentid,
                'imgIndex': j //上传的图片编号(后台提供给前端判断图片是否全部上传完)
              },
              success: res => {
                //console.log("res:"+res.data);
                uploadImgCount++;
                uploadArr.push(res.data);

                //判断是否上传完毕
                if (uploadImgCount == imgLength) {

                  //显示数据，调用处理列表图片的方法，只修改所选运单的回单数即可
                  this.addImageList(2, uploadImgCount);
                  //保存操作的列表数到TMS数据表
                  let row = {
                    ShipmetId: this.data.newBillList[index].ShipmetId,
                    EarliestPickTime: this.data.newBillList[index].EarliestPickTime,
                    FromAddress: this.data.newBillList[index].FromAddress,
                    ToAddress: this.data.newBillList[index].ToAddress,
                    DriverName: this.data.newBillList[index].DriverName,
                    LicenseNumber: this.data.newBillList[index].LicenseNumber,
                    DocumentsCnt: uploadImgCount,
                    ImageList: uploadArr
                  }
                  this.setData({
                    saveImageList: row
                  });

                  //保存图片到TMS
                  this.saveImage();

                }
              },
              fail: res => {
                console.log("uploadImage fail:" + res);
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function(res) {}
                });

              }
            });
          }

        }

      }
    }
  }
```

```js
//保存图片
  saveImage: function(e) {
    //console.log("新json字符串:" + JSON.stringify(this.data.saveImageList));
    wx.request({
      url: app.globalData.apiurl + '/api/NoUploadBackBill/SaveImageFile',
      data: JSON.stringify(this.data.saveImageList),
      header: {
        'content-type': 'application/json',
        'Authorization': "BasicAuth " + util.getToken()
      },
      method: "POST",
      success: res => {
        console.log(" POST success：" + res.data.Message);
        if (res.data.Code == "0") {
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            mask: true,
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '上传图片到服务器失败:' + res.data.Message,
            icon: 'none',
            mask: true,
            duration: 2000
          });
        }
      },
      fail: res => {
        console.log("saveImage fail：" + res.data);
      }
    });
  },
```


+ wx:if 与 通过 class 控制display: hidden

+ 以 bind 开头的事件不阻止冒泡，名称以 catch 开头的事件冒泡是阻止的

+ 读取 dataset 中的数据 data-a-b 需要用驼峰命名法 dataAB

+ 输入框Input
   + 键盘弹起，页面自动上推
   + ios下可以明显看到有间隔，安卓下实际上有间隔，但是必须输入框失焦才会显示出来
   + bindinput事件中setData ,IOS 会自动跳到最后

+ bindchange
   + 没等执行完成就点确定按钮或者跳转页面，那么bindchange没触发就不能获取到滑动后改变的值
