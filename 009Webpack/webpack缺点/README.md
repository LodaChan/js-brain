# webpack 的缺点



#### 1 配置过于复杂

+ 大量的插件 xx-xxx-xxx-xxx-plugin , 参数多，wiki文档支持有限

#### 2 文档不够全面

+ 可以直接使用的很少，副作用非常多

####  3 模块化只对import/export友好

+ commonJs的风格require方式缺不能支持AST语法树

####  4 对 ES2015+不够友好

+ 有的浏览器其实是支持ES5ES6的但是在webpack中就必须要引入bable进行编译转换

####  5 不能直接进行IO处理

+ 复制文件到另一个文件夹，很难扩展，自己写plugin然后再用Node io 进行处理

####  6 编译的速度慢

+ 会先自己进行一轮静态分析
+ 需要自己写loader进行cache

####  7 版本差异大

不论是配置还是参数都变化太大

####  8 默认的vendor体积大


#### 10 对很多文件格式需要额外的支持

比如less对应less-loader,css对应style-loader,vue templete对应vue-loader等等