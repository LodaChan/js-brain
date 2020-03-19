# swiper场景

+ bindchange
  + 失去焦点才能触发到此事件的发生
  + setData 改变  current 值，则有可能导致  setData 被不停地调用，对触犯进行判断
  + 没等执行完成就点确定按钮或者跳转页面，那么bindchange没触发就不能获取到滑动后改变的值