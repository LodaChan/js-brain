在vue项目中对htttps的适配
===

#### webpack-dev0-server 开启 https 支持
```js
module.exports = {
  //...
  devServer: {
    https: true
  }
};
```


#### 自定义签名

```js
https: {
    key: fs.readFileSync('/path/to/server.key'),
    cert: fs.readFileSync('/path/to/server.crt'),
    ca: fs.readFileSync('/path/to/ca.pem'),
}
```

#### package.json script 配置方式
```bash
webpack-dev-server --https --key /path/to/server.key --cert /path/to/server.crt --cacert /path/to/ca.pem
```