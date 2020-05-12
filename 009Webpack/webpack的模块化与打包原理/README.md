# webpack的模块化与打包原理

#### 规范

+ CommonJS

+ UMD

+ ES6 Module

#### CommonJs

```js
// CommonJS 导出
module.exports = { age: 1, a: 'hello', foo:function(){} }

// 或
const obj = { age: 1, a: 'hello', foo:function(){} }

module.exports = obj;

// CommonJS 导入
const foo = require('./foo.js')
```


#### UMD

> Node 环境 就是使用 CommonJS 规范， 如果不是 就判断是否为 AMD 环境， 最后导出 `全局变量`。这样代码可以同时运行在Node和浏览器环境中。目前大部分库都是打包成UMD规范

```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());
}(this, (function () { 'use strict';})));
```

#### ES6 Module

> 因为 webpack 通过__webpack_require__ 函数 模拟了模块的加载（类似于node中的require语法），把定义的模块内容挂载到 module.exports上 。同时__webpack_require__函数中 也 对模块缓存做了优化，防止模块二次重新加载，优化性能

```js

// es6模块 导出
export default { age: 1, a: 'hello', foo:function(){} }

// 或
const obj = { 
        age: 1, 
        a: 'hello',
        foo:function(){} 
}
export default obj;

// es6模块 导入
import foo from './foo'
```

#### webpack 模块异步加载

+ 有点类似 jsonp 的流程 ， 在主js文件中通过在head中构建script标签方式，异步加载模块信息；再使用回调函数 webpackJsonpCallback，把异步的模块源码同步到主文件中 ， primose使用非常精妙，主模块加载完成异步模块才resolve()

+ 在webpack中可以同时使用ES6模块和CommonJS模块。因为 module.exports很像export default，所以ES6模块可以很方便兼容 CommonJS：import XXX from 'commonjs-module'。反过来CommonJS兼容ES6模块，需要额外加上default：require('es-module').default


```js

// async.js
export default function() {
    return 'hello, aysnc module'
}

// 方式1: require.ensure
require.ensure([], function(require){
    var asyncModule = require('./async')
    console.log(asyncModule.default, 234)
})
 
// 方式2: webpack4新的import语法
// 需要加@babel/plugin-syntax-dynamic-import插件
let asyncModule = async () => await import('./async')
```


```js

// 0.bundle.js
// 异步模块
// window["webpackJsonp"]是连接多个chunk文件的桥梁
// window["webpackJsonp"].push = 主chunk文件.webpackJsonpCallback
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [0], // 异步模块标识chunkId,可判断异步代码是否加载成功
  // 跟同步模块一样，存放了{模块路径：模块内容}
  {
  "./src/async.js": (function(module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      __webpack_exports__["default"] = (function () {
        return 'hello, I am aysnc module';
      });
    })
  }
]
);
```

