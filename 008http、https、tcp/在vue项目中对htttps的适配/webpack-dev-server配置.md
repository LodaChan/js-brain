在vue项目中对htttps的适配
===

#### webpack-dev-server 开启 https 支持


+ 静态目录新增3个文件
   + 1 server.key
   + 2 server.crt
   + 3 ca.pem


+ webpack-dev-server配置

```js

https: {
      https: true,
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt'),
      ca: fs.readFileSync('/path/to/ca.pem'),
}
```

+ 或使用 package.json script 配置方式
```bash
webpack-dev-server --https --key /path/to/server.key --cert /path/to/server.crt --cacert /path/to/ca.pem
```