# 如何理解axios的options

> 使用 OPTIONS 方法发起一个预请求

#### 参考 Express 的 header config

```js
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 允许跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' Express 4.17.1');
    // res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
```