# setData方法、bind事件、catch事件

#### 以 bind 开头的事件 不阻止冒泡

#### 以 catch 开头的事件 冒泡是阻止的

#### setData()
   + 内容必须满足 json 化

   + 读取 dataset 中的数据 data-a-b 需要用驼峰命名法 dataAB

   + 单次设置的数据不能超过1024kB

   + value 不要设为 undefined

   + 合并 diff 操作

```js
this.setData({ one: '1' })
this.setData({ two: '2'})
this.setData({ three: '3' })

this.setData({
     one: '1',
     two: '2',
     three: '3',
})
```
  