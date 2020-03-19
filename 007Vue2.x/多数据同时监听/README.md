# 多数据同时监听

> 一般联动数据监听写起来很麻烦，比如：日期

#### 解决方案

+ 1 对象合并，使用 computed 赋值

```js
computed: {
    dateRange () {
      const { start, end } = this
      return {
        start,
        end
      }
    }
  })
```

+ 2 定义监听器，监听合并后的 computed 值
```js
watch: {
    dateRange (val) {
      // do something
    }
  }
```
