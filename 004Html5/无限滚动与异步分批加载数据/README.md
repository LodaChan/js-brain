无限滚动与异步分批加载数据
===

#### 一般下拉场景性能开销

+ Event(click) : 40.84ms
+ Recalculate Style : 105.08ms
+ `Layout : 731.56ms 【big cost】`
+ Update Layer Tree : 58.87ms
+ Paint : 15.32ms


#### 虚拟列表

+ 基本设计
    + 父容器固定高度，并设置属性 overflow:hidden
    + 模拟上部隐藏(首次渲染)
    + 可视区域(异步渲染)
    + 模拟下部隐藏(操作后，再次异步渲染，内容替换)
    + 实际上3个图层都是，只是单独控制对应的位置

+ 具体变换
   + animation : translate3d(0,move-position,0)
   + 或使用 scroll

+ js逻辑
   + 判断网页是否滚动到了底部，如果是滚动向上，且加载下一页数据

+ 事件监听 
    + mouse
    + touch
    + resize
    + orientationchange (safari)