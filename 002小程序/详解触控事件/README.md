# 详解触控事件

> 事件可以携带 id, dataset, touches

## 常用小程序触控事件


| 事件 | 说明 |
| :------ | :-------------------------------- |
| touchstart  | 手指触摸                          |
| touchmove   | 手指触摸后移动                     |
| touchcancel | 手指触摸动作`被打断，如弹窗和来电提醒` |
| touchend    | 手指触摸动作结束                   |
| tap         | 手指触摸后离开                     |
| longtap     | 手指触摸后后，超过350ms离开           |


##  一般触发过程

#### 点击

```html
<view>
  <button type="primary" bindtouchstart="mytouchstart" bindtouchend="mytouchend" bindtap="mytap">点我吧</button>
</view>
```

+ 1 touchstart
+ 2 touchend
+ 3 tap


#### 自己通过 tap 实现双击

+ 第一次 tap 通过 setData 更新 data 中的 lastTapTimeStamp

+ 第二次 通过 e.timeStamp - lastTapTimeStamp <= 300 来判断是否是双击事件


#### 长按

```html
<view>
  <button type="primary" bindtouchstart="mytouchstart" bindlongtap="mylongtap" 
    bindtouchend="mytouchend" bindtap="mytap">点我吧</button>
</view>
```
+ 1 touchstart
+ 2 longtap
+ 3 touchend
+ 4 tap


#### 滑动

> data 中定义 lastPosition: [x,y] 并 通过 e.touches[0].pageX 与 e.touches[0].pageY 对 方向进行判断

| 方向| 方向判断|
| :------ | :-------------------------------- |
| up    | pageY - y > 0                       |
| down  | pageY - y < 0                        |
| left  | pageX - x < 0       |
| right | pageX - x > 0           |

+ 1 touchstart , setData更新 lastPosition
+ 2 touchmove
+ 3 touchend





#### 多点触控

暂不支持 :)