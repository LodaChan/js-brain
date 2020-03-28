# 如何理解axios的options

Request Method: OPTIONS 预请求

#### 一、为什么 axios 会有1个预请求呢?

axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中.

浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求。
 
核心原因就是因为: `浏览器知道你跨域访问了`
 
#### 二、会造成什么后果

+ 浪费网络请求
+ 消耗服务器资源

#### 三、参考 Express 的 header config

```js
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 允许跨域设置
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' Express 4.17.1');
    // res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
```

#### 四、如何解决?

+ 把 `非简单请求` 转化为 `简单请求`
 
 Content-Type`application/json` 

 改为: 

 `application/x-www-form-urlencoded;charset=utf-8`

