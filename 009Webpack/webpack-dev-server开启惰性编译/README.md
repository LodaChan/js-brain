# webpack-dev-server开启惰性编译

> 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为惰性模式。

#### script 方式

```bash
webpack-dev-server --lazy
```

#### 配置方式

```js
devServer: {
    open: 'Google Chrome',// 自动使用 Chrome 打开， 一般是  open: true
    openPage: '/different/page',// 自动打开链接
    lazy: true
}
```