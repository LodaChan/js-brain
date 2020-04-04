自定义组件
===

#### 以 weui 弹框为例子 - 定义

+ 物理文件说明
    + weui-dialog.js
    + weui-dialog.json
    + weui-dialog.wxml
    + weui-dialog.wxss

+ 1 json 设置声明
```
{
  "component": true,        // 自定义组件声明
  "usingComponents": {}     // 可选项，用于引用别的组件
}
```

+ 2 编写 wxml 模板

```html
<view class='wx_dialog_container' hidden="{{!isShow}}">
    <view class='wx-mask'></view>
    <view class='wx-dialog'>
        <view class='wx-dialog-title'>{{ title }}</view>
        <view class='wx-dialog-content'>{{ content }}</view>
        <view class='wx-dialog-footer'>
          <view class='wx-dialog-btn' catchtap='_cancelEvent'>{{ cancelText }}</view>
          <view class='wx-dialog-btn' catchtap='_confirmEvent'>{{ confirmText }}</view>
        </view>
    </view>
</view>
```

+ 3 编写 wxss 样式

```css
.wx-mask {
    position  : fixed;
    z-index   : 1000;
    top       : 0;
    right     : 0;
    left      : 0;
    bottom    : 0;
    background: rgba(0, 0, 0, 0.3);
}

.wx-dialog {
    position         : fixed;
    z-index          : 5000;
    width            : 80%;
    max-width        : 600rpx;
    top              : 50%;
    left             : 50%;
    -webkit-transform: translate(-50%, -50%);
    transform        : translate(-50%, -50%);
    background-color : #FFFFFF;
    text-align       : center;
    border-radius    : 3px;
    overflow         : hidden;
}

.wx-dialog-title {
    font-size: 18px;
    padding  : 15px 15px 5px;
}

.wx-dialog-content {
    padding    : 15px 15px 5px;
    min-height : 40px;
    font-size  : 16px;
    line-height: 1.3;
    word-wrap  : break-word;
    word-break : break-all;
    color      : #999999;
}

.wx-dialog-footer {
    display    : flex;
    align-items: center;
    position   : relative;
    line-height: 45px;
    font-size  : 17px;
}

.wx-dialog-footer::before {
    content                 : '';
    position                : absolute;
    left                    : 0;
    top                     : 0;
    right                   : 0;
    height                  : 1px;
    border-top              : 1px solid #D5D5D6;
    color                   : #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin        : 0 0;
    -webkit-transform       : scaleY(0.5);
    transform               : scaleY(0.5);
}

.wx-dialog-btn {
    display                    : block;
    -webkit-flex               : 1;
    flex                       : 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position                   : relative;
}

.wx-dialog-footer .wx-dialog-btn:nth-of-type(1) {
    color: #353535;
}

.wx-dialog-footer .wx-dialog-btn:nth-of-type(2) {
    color: #3CC51F;
}

.wx-dialog-footer .wx-dialog-btn:nth-of-type(2):after {
    content                 : " ";
    position                : absolute;
    left                    : 0;
    top                     : 0;
    width                   : 1px;
    bottom                  : 0;
    border-left             : 1px solid #D5D5D6;
    color                   : #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin        : 0 0;
    -webkit-transform       : scaleX(0.5);
    transform               : scaleX(0.5);
}
```

+ 4  js 逻辑与绑定编写

```js
 Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },
  properties: {

    title: {           
      type: String,
      value: '标题'
    },
    content: {
      type: String,
      value: '弹窗内容'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmText: {
      type: String,
      value: '确定'
    }
  },
  data: {
    isShow: false
  },

  methods: {
    
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
     
    showDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 内部私有方法建议以下划线开头 , triggerEvent 用于触发事件
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})
```

#### 以 weui 弹框为例子 - 调用

+ 1  页面关于自定义组件调用的 json 配置
```js
{
  "usingComponents": {
    "dialog": "/components/weui-dialog/weui-dialog"
  }
}
```

+ 2 页面 wxml 标签引用

```html
<view class="container">
    <weui-dialog id='myDialog' 
      title='标题' 
      content='小程序自定义组件' 
      cancelText='取消' 
      confirm='确认'
      bind:cancelEvent="_cancelEvent"  
      bind:confirmEvent="_confirmEvent">
    </weui-dialog>
    <button type="primary" bindtap="showDialog"> 点击弹出dialog </button>
</view>
```

+ 3 页面 js 调用逻辑

```js
const app = getApp()
Page({
  // 初次渲染完成
  onReady: function () {
    //获得dialog组件
    this.weuiDialog = this.selectComponent("#myDialog");
  },
  showDialog() {
    this.weuiDialog.showDialog();
  },
  _confirmEvent() {
    this.weuiDialog.hideDialog();
  },
  _cancelEvent() {
    this.weuiDialog.hideDialog();
  },
})
```
