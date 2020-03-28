
输入框场景
===

#### 键盘弹起，页面自动上推，输入框位置漂移

+ 1 将input框的adjust-position属性设置为false，即不上推页面。在style中设置 bottom 或 position 使用 js 进行数据绑定 
+ 2 在inputfocus()函数中，通过传入的键盘高度参数，调整input组件的相对位置
+ 3 在inputblur()函数中，恢复input组件的相对位置
 

```html
<!-- adjust-position -->
<input value="{{value}}" bindinput="bindinput" confirm-type="send" adjust-position="false" bindfocus="inputFocus" bindblur="inputBlur" style="bottom:{{inputHeight}}"></input>
```

```js
onReady: function() {
    var that = this
    var query = wx.createSelectorQuery()
    query.selectAll('#input,.group').boundingClientRect()//查询id=input和class=group的页面元素
    query.exec(function (res) {
        if (res[0][1] == undefined || res[0][0] == undefined) {
            that.data.totalHeight = 0
            that.data.inputHeight = 0
        }//注，由于有时候执行onReady()函数时，页面并未渲染完成，所以这里进行一次判断
        else {
            console.log("滚动条+输入框高度：" + res[0][1].bottom)
            console.log("输入框高度：" + res[0][0].height + res[0][1].top - res[0][0].bottom)//注：此处为了input框和键盘之间有一些空隙，没有直接使用res[0][0]的height
            that.data.totalHeight = res[0][1].bottom
            that.data.inputHeight = res[0][0].height + res[0][1].top - res[0][0].bottom
        }
    })
},

inputFocus: function(e) {
    var that = this
    console.log("键盘聚焦")
    if (e.detail.height == 0) {
        return//在开发者工具上便于调试，不会造成input框上推
    }
    if (this.data.totalHeight == 0 || this.data.scrollHeight == 0) {//onReady()函数中未查询到元素信息，则此处再次查询
        var query = wx.createSelectorQuery()
        query.selectAll('#input,.group').boundingClientRect()
        query.exec(function (res) {
            console.log("滚动条+输入框高度：" + res[0][1].bottom)
            console.log("输入框高度：" + res[0][0].height + res[0][1].top - res[0][0].bottom)
            that.data.totalHeight = res[0][1].bottom
            that.data.inputHeight = res[0][0].height + res[0][1].top - res[0][0].bottom
            //-------计算元素的位置 ，这里就取决于具体实现方式了。此处是通过定位input框的top值和scroll-view的长度来实现的-----------
            var ratio = 100 * (this.data.totalHeight - e.detail.height - this.data.inputHeight) / this.data.totalHeight
            this.setData({
                inputTop: ratio,
                scrollHeight: ratio - 1
            })
            setTimeout(function () {
                that.setData({
                    array: that.data.array,
                    toView: "view" + String(that.data.array.length - 1),
                })
            }, 50)//由于滚动条的高度改变，需要间隔一定时间后重新渲染数组，否则数组元素不会自适应滚动条大小进行调整。
        })
    }
    else {
        var ratio = 100 * (this.data.totalHeight - e.detail.height - this.data.inputHeight) / this.data.totalHeight
        console.log(ratio)
        this.setData({
            inputTop: ratio,
            scrollHeight: ratio - 1
        })
        setTimeout(function () {
            that.setData({
                array: that.data.array,
                toView: "view" + String(that.data.array.length - 1)
            })
        }, 50)
    }
},

inputBlur: function() {
    console.log("键盘失焦")
    this.setData({
        inputTop: 82,
        scrollHeight: 81,
        toView: "view" + String(this.data.array.length - 1)
    })
},

```

#### 其他无解issue

+ ios下可以明显看到有间隔，安卓下实际上有间隔，但是必须输入框失焦才会显示出来


+  输入框来回切换的失焦
 

+ bindinput 事件中使用setData ,IOS 会自动跳到最后

