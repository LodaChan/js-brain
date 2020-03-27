# webpack 的缺点

#### 一、配置过于复杂

+ 大量的插件 xx-xxx-xxx-xxx-plugin 轮子多依赖多
+ 参数多，这个参数怎么wiki没有? !!! hack code . nice !

#### 二、文档不够全面

+ wiki的例子本地执行都err

#### 三、模块化只对import/export友好

+ commonJs的风格require方式缺不能支持AST语法树

#### 四、对 ES2015+不够友好

+ 有的浏览器其实是支持 ES5 ES6 的但是在webpack中就必须要引入 bable 进行编译转换

#### 五、不能直接进行IO处理

+ 复制文件到另一个文件夹，很难扩展，自己写plugin然后再用Node IO 进行处理

#### 六、编译的速度慢

+ 会先自己进行一轮静态分析
+ 有的loader没有加cache，自己写1个吧 [lru-cache](https://www.npmjs.com/package/lrucache "lru-cache")

```js
const cache = require('lru-cache')({ max: 1000 })

const cached = cache.get('data key')

if (cached) {
  return cached
} else {
  cache.set('data key', data)
  return data
}
```

#### 七、版本差异大

不论是配置还是参数都变化太大

#### 八、默认的vendor体积大

在main.js全局引入很多插件组件后，vendor出奇的大，不利于首屏加载，需要额外的优化

#### 九、对很多文件格式需要额外的支持

比如：less对应less-loader，css对应style-loader，vue templete对应vue-loader等等...