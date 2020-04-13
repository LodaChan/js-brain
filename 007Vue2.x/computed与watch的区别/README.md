# computed 与 watch 的区别

#### computed

+ computed 页面重新渲染值不变化,计算属性会立即返回之前的计算结果，而不必再次执行函数
+ 无论是属性还是计算属性，都会生成一个对应的 watcher 实例
+ 与 data 比较 具体过程

    1. data 属性初始化 getter setter
    2. computed 计算属性初始化，提供的函数将用作属性 vm.reversedMessage 的 getter
    3. 当首次获取 reversedMessage 计算属性的值时，Dep 开始依赖收集
    4. 在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定 message 为 reversedMessage 的依赖，并建立依赖关系
    5. 当 message 发生变化时，根据依赖关系，触发 reverseMessage 的重新计算

```js
computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
}
```

#### watch

+ 页面重新渲染时值不变化也会执行

```js
watch: {
     firstName: function (val) {
     this.fullName = val + ' ' + this.lastName
},
```