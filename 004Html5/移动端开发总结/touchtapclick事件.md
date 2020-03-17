# 移动端开发总结 - touch tap click事件

+ 关于 touch
    + touchstart  当手指触碰屏幕时候发生，不管当前有多少只手指
    + touchmove 当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
    + touchend 当手指离开屏幕时触发
    + touchcancel 系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

+ tap 解决 300 ms 延迟
