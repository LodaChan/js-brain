# swiper 场景

# 注意事项

+ bindchange 事件

  + 1 失去焦点才能触发到此事件的发生

  + 2 使用 setData change data，则有可能导致  setData 被不停地调用，触发进行判断

  + 3 没等执行完成就点确定按钮或者跳转页面，那么 bindchange 没触发就不能获取到滑动后改变的值，需要做catch处理，否则小程序闪退