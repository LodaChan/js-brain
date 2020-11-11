Vue2 高级用法
===


## 一、 $on 与 $once

+ 1 可以从内部监听内部事件
+ 2 可以将相关代码写得内聚一些


```js
this.$once('hook:beforeDestroy',()=>{});
this.$on('hook:beforeDestroy',()=>{});
```

## 二、 @hook:updated

+ 1 可以从外部监听内部事件

```html
<custom-select @hook:updated="customerSelectChangeAction" />
```

## 三、Vue.observable 实现 vuex 的 store 和 mutation

```js
import Vue from 'vue'

// 通过Vue.observable创建一个可响应的对象
export const store = Vue.observable({
  userInfo: {},
  roleIds: []
})

// 定义 mutations, 修改属性
export const mutations = {
  setUserInfo(userInfo) {
    store.userInfo = userInfo
  },
  setRoleIds(roleIds) {
    store.roleIds = roleIds
  }
}
```

```html
<template>
  <div>
    {{ userInfo.name }}
  </div>
</template>
<script>
import { store, mutations } from '../store'
export default {
  computed: {
    userInfo() {
      return store.userInfo
    }
  },
  created() {
    mutations.setUserInfo({
      name: '子君'
    })
  }
}
</script>
```

## 四、 Vue.extend 全局唯一组件

+ 1 构造函数实现
+ 2 内部实现单例

```js
// ? 为什么2个同时关闭
const loading = this.$loading()
const loading1 = this.$loading()
setTimeout(() => {
  loading.close()
}, 1000 * 3)

```

```js
// loading/index.js
import Vue from 'vue'
import LoadingComponent from './loading.vue'

// 通过Vue.extend将组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent)

let loading = undefined

LoadingConstructor.prototype.close = function() {
  // 如果loading 有引用，则去掉引用
  if (loading) {
    loading = undefined
  }
  // 先将组件隐藏
  this.visible = false
  // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
  setTimeout(() => {
    // 移除挂载的dom元素
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    // 调用组件的$destroy方法进行组件销毁
    this.$destroy()
  }, 300)
}

const Loading = (options = {}) => {
  // 如果组件已渲染，则返回即可
  if (loading) {
    return loading
  }
  // 要挂载的元素
  const parent = document.body
  // 组件属性
  const opts = {
    text: '',
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: opts
  })
  // 将loading元素挂在到parent上面
  parent.appendChild(instance.$el)
  // 显示loading
  Vue.nextTick(() => {
    instance.visible = true
  })
  // 将组件实例赋值给loading
  loading = instance
  return instance
}

export default Loading
```

## 五、 自定义指令

```js
import Vue from 'vue'
import LoadingComponent from './loading'
// 使用 Vue.extend构造组件子类
const LoadingContructor = Vue.extend(LoadingComponent)

// 定义一个名为loading的指令
Vue.directive('loading', {
  /**
   * 只调用一次，在指令第一次绑定到元素时调用，可以在这里做一些初始化的设置
   * @param {*} el 指令要绑定的元素
   * @param {*} binding 指令传入的信息，包括 {name:'指令名称', value: '指令绑定的值',arg: '指令参数 v-bind:text 对应 text'}
   */
  bind(el, binding) {
    const instance = new LoadingContructor({
      el: document.createElement('div'),
      data: {}
    })
    el.appendChild(instance.$el)
    el.instance = instance
    Vue.nextTick(() => {
      el.instance.visible = binding.value
    })
  },
  /**
   * 所在组件的 VNode 更新时调用
   * @param {*} el
   * @param {*} binding
   */
  update(el, binding) {
    // 通过对比值的变化判断loading是否显示
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value
    }
  },
  /**
   * 只调用一次，在 指令与元素解绑时调用
   * @param {*} el
   */
  unbind(el) {
    const mask = el.instance.$el
    if (mask.parentNode) {
      mask.parentNode.removeChild(mask)
    }
    el.instance.$destroy()
    el.instance = undefined
  }
})
```

## 六、 更高级的watch immediate 与 deep

+ 1 immediate 立即执行
+ 2 deep 监听对象里面每一个值的
``` js
// 在页面初始化时候加载数据 loadDataFn
watch: {
    viewModel: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.loadDataFn();
        }
      },
      deep: true,// 通过指定deep属性为true, watch会监听对象里面每一个值的变化
      immediate: true,// 立即执行
    },
},

```

+ 3 $watch 有时机的监听

```js
// 等表单数据回填之后，监听数据是否发生变化
// formData get watcher
const unBindWatchFn = this.$watch('formData',
    () => {
    console.log('数据发生了变化')
    },
    {
    deep: true,
    }
);
unBindWatchFn();// un-bind watcher
```

## 七、 函数式组件

+ 1 函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件
+ 2 函数式组件结构比较简单，代码结构更清晰

```js
export default {
  // 通过配置functional属性指定组件为函数式组件
  functional: true,
  // 组件接收的外部属性
  props: {
    avatar: {
      type: String
    }
  },
  /**
   * 渲染函数
   * @param {*} h  作为 createElement 的别名是 Vue 生态系统中的一个通用惯例,实际上也是 JSX 所要求的
   * 从 Vue 的 Babel 插件的 3.4.0 版本开始,我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 
   * const h = this.$createElement,这样你就可以去掉 (h) 参数了。对于更早版本的插件,如果 h 在当前作用域中不可用会抛错
   * 
   * @param {*} context 函数式组件 是 没有this, props, slots等 都在context 上面挂着
   */
  render(h, context) { // render:function(createElement,context)

    const { props } = context;

    if (props.avatar)  return <img src={props.avatar}></img>;

    return <img src="default-avatar.png"></img>
  }
}
```

```js
render (h) {
    return h(App);
}

render: h => h(App);
```

+ 函数式 与 普通组件的区别

```
1 函数式组件需要在声明组件是指定functional
2 函数式组件不需要实例化，所以没有this,this通过render函数的第二个参数来代替
3 函数式组件没有生命周期钩子函数，不能使用计算属性，watch等等
4 函数式组件不能通过$emit对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件
5 因为函数式组件是没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement
6 函数式组件的props可以不用显示声明，所以没有在props里面声明的属性都会被自动隐式解析为prop,而普通组件所有未声明的属性都被解析到$attrs里面，
  并自动挂载到组件根元素上面(可以通过inheritAttrs属性禁止)
```

## 八、 JSX 函数式组件 render函数扩展

```js
var EmptyList = { /* ... */ }
var TableList = { /* ... */ }
var OrderedList = { /* ... */ }
var UnorderedList = { /* ... */ }

Vue.component('smart-list', {
  functional: true,
  props: {
    items: {
      type: Array,
      required: true
    },
    isOrdered: Boolean
  },
  render: function (createElement, context) {
    function appropriateListComponent () {
      var items = context.props.items

      if (items.length === 0)           return EmptyList
      if (typeof items[0] === 'object') return TableList
      if (context.props.isOrdered)      return OrderedList

      return UnorderedList
    }

    return createElement(
      appropriateListComponent(),
      context.data,
      context.children
    )
  }
})
```
## 九、非JSX方式 ， 当 vue2.5+  functional属性支持 基于模板的函数式组件

```html
<template functional>
</template>

<template functional>
  <img :src="props.avatar ? props.avatar : 'default-avatar.png'" />
</template>
```
