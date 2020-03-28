# setData方法、bind事件、catch事件

      以 bind 开头的事件 不阻止冒泡

      以 catch 开头的事件 冒泡是阻止的，其实建议用 catch

#### setData() 使用注意事项
   
   + 数据定义时。必须设置 type 和 value ,且 value 不建议设置为 undefined

   + 内容必须满足 json 化

   + 读取 dataset 中的数据需要用驼峰命名法 dataAbCd

   + 单次设置的数据不能超过1024kB
 
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
  