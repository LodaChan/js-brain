# 支持CDN资源


#### webpack 配置

```js

module.exports = {
  prod: {...},

  build: {
    assetsSubDirectory: 'static', // 资源的目录
    assetsPublicPath: '/', // 本地线上相对地址
}

module.exports = {
  prod: {...},

  build: {
    assetsSubDirectory: 'static', // 资源的目录
    assetsPublicPath: '//www.baidu.com/', // 资源线上地址
}
```