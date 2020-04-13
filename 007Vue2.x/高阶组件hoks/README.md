# 高阶组件

#### 基本概念

> 区别于一般封装的组件 , Vue 中 hoks (高阶组件) `接收一个组件作为参数，返回一个新的组件`

#### 具体例子

> 场景 ： vue 每次挂载完成都执行 console.log('done')

+ base-compoment.vue
+ base-compoment-hoks.js

```js

const compoment  from './compoment.vue'
const compomentHoks  from './compomentHoks.js'

const myCompomentUnderHoks = compomentHoks(compoment)

// templete 中使用
export default {
    components: {
      compoment,
      myCompomentUnderHoks
    }
  }
```
