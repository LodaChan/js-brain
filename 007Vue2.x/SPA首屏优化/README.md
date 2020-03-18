# SPA首屏优化

#### cdn引入

+ cdn 引入

```html
<!-- 引入Vue,必须先于Element引入 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 引入Element样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

<!-- 引入Element组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

+ 修改 webpack.config

```js
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
 externals: {
  'vue': 'Vue',
  'element': 'ELEMENT'
  }
}
```

#### image lazy load

+ 使用 data-src 利用 滚动事件 判断是否在视野进行异步加载

#### 组件 与 路由 按需加载

```js
component: resolve => require(['@/xxx.page.vue'], resolve);
```


#### gzip 压缩

+ webpack 配置

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// config 变量
productionGzip: true,
productionGzipExtensions: ['js', 'css'],

webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
    })
)

```

+ nginx 配置
```bash
http {
    #开启gizp压缩，提升3倍加载速度
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
```
