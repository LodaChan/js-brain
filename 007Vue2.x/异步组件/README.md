# 异步组件 

> 异步加载页面 或者 组件 , 需要 name ， 接收1个promise形式的 exctour


+ 基础用法

```js
// 工厂函数类似 promise 的 exector ， 而且里面通过 setTimeout 支持任务队列实现异步
Vue.component('async-component', function (resolve, reject) {
    setTimeout(function () {
        // 向 `resolve` 回调传递组件定义
        resolve({
            template: '<div>I am async component!</div>'
        })
    }, 0)
})
```

+ 实际用法 会 结合 webpack

```js
Vue.component('async-webpack-component', function (resolve,reject) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包会通过 Ajax 请求加载
  require(['./async-component.vue'], resolve)
})
```

+ 有状态的捕获

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```


