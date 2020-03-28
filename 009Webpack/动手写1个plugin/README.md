关于 plugin
===

> webpack打包是一种事件流的机制，它的原理是将各个插件串联起来。那么实现这一切的核心就是tapable [ˈkeɪpəbl]

#### tapable 支持的事件流

```js
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable');
```


#### 插件组成

+ 一个javascript命名函数。
+ 在插件函数的prototype上定义一个 apply 方法。
+ 指定一个绑定到webpack自身的钩子函数。
+ 处理webpack内部实列的特定数据。
+ 功能完成后调用webpack提供的回调函数。


```js
// 一个javascript命名函数
function MyExampleWebpackPlugin() {
  
};
// 在插件函数的prototype上定义一个 apply 方法
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到webpack自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation, callback) {
    console.log('这是一个插件demo');

    // 功能完成后调用 webpack 提供的回调
    callback();
  })
}

// 导出plugin
module.exports = MyExampleWebpackPlugin;
```

```js
const MyExampleWebpackPlugin = require('./MyExampleWebpackPlugin');
module.exports = {
  plugins: [
    new MyExampleWebpackPlugin(options)
  ]
};
```


#### Compiler 对象 与 Compilation 对象

+ Compiler对象 包含了Webpack环境所有的配置信息，包含options，loaders, plugins这些项，这个对象在webpack启动时候被实例化，它是全局唯一的
+ Compiler 代表了是整个webpack从启动到关闭的生命周期

+ Compilation 对象  包含了当前的模块资源、编译生成资源、文件的变化等
+ Compilation 对象只代表了一次新的编译


#### 常用API

+ 1 读取输出资源、模块及依赖

