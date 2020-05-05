# webpack-virtual-modules webpack虚拟模块化插件

> 对比 dynamic import

通过转换成正则匹配，目录全部扫描一遍。我们只有把动态扫描目录，转成静态确定的目录告诉webpack，



这样才能去让 webpack 明确的去做按需模块化编译,避免 `全量编译 和 全量打包`


#### 1 npm 链接 

[https://www.npmjs.com/package/webpack-virtual-modules](https://www.npmjs.com/package/webpack-virtual-modules "https://www.npmjs.com/package/webpack-virtual-modules")


#### 2 安装 

```bash
cnpm install webpack-virtual-modules --save-dev
```

#### 3 配置

```js
var VirtualModulesPlugin = require('webpack-virtual-modules');
 
var virtualModules = new VirtualModulesPlugin({
  'node_modules/module-foo.js': 'module.exports = { foo: "foo" };',
  'node_modules/module-bar.js': 'module.exports = { bar: "bar" };'
});



module.exports = {
  // ...
  plugins: [
    virtualModules
  ]
};

// 老版本
module.exports = {
    plugins: [
    new VirtualModulePlugin({
        // 一个src下根本不存在的virtual文件
        moduleName: 'src/mysettings.json',
        // 你希望这个virtual文件的内容是什么
        contents: JSON.stringify({ greeting: 'Hello!' })
    })
    ]
};
```

#### 4 调用

```js
var moduleFoo = require('module-foo');
console.log(moduleFoo.foo);
```

#### 5 原理

+ 避免了正则扫描
+ 将virtual文件作为缓存来欺骗webpack的resolve
+ 使用 webpack hooks 来实现  [https://webpack.js.org/api/compiler-hooks/](https://webpack.js.org/api/compiler-hooks/ "https://webpack.js.org/api/compiler-hooks/") 
