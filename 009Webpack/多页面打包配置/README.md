# 多页面打包配置

> HtmlWebpackPlugin 每1个实例对应1个SPA

#### 项目结构

+ index.html
   + index.js
+ list.html
   + list.js

#### 具体配置

```js
const plugins = [
　　// HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
　　new HtmlWebpackPlugin({
　　　　template: 'src/index.html',
　　　　filename: 'index.html',
　　　　chunks: ['vendors', 'index']
　　}),
　　new HtmlWebpackPlugin({
　　　　template: 'src/list.html',
　　　　filename: 'list.html',
　　　　chunks: ['vendors', 'list']
　　}),
　　new CleanWebpackPlugin()
];
```