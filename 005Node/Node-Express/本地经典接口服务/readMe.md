# Node-Express

`个人本地娱乐项目`

一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具

可以设置中间件来响应 HTTP 请求

定义了路由表用于执行不同的 HTTP 请求动作

可以通过向模板传递参数来动态渲染 HTML 页面

#### 一、对比 Node Http

```js
const http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello world!");
});

app.listen(3000, "localhost");
```

```js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.listen(3000)
```

#### 二、认识中间件

+ 内置中间件 app.use(express.static("./static"))
+ 自定义中间件 ， 如：路由中间件
+ 全局中间件
+ 局部中间件
+ 第三方中间件 body-parser

```
// 检查安装
npm list express
```

#### 三、实现 get post 

get

```js
app.get('/get', function (req, res) {

    let q = req.query; // { id: '1111' }
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, q);

    if (q.hasOwnProperty('id') && isFinite(q.id)) {
        let id = parseInt(q.id);
        let dbData = db.get(id);

        res.status(200).json({
            code: 200,
            msg: "ok",
            data: dbData
        })
    }
    else {
        res.status(200).json({
            code: 200,
            msg: "no data or params err",
            data: null
        })
    }

});
```


post

```js
```


#### 四、实现 文件上传(保存) 大文件上传(保存)

#### 五、错误处理

```js
app.get('/err', function (req, res) {
    res.status(500).send('err');// http 错误处理
});

```

#### 六、对比 Koa

Express

+ 在同一线程上完成当前进程的所有 HTTP 请求
+ 历史更久，文档更完整，资料更多，深入人心
+ 如自带 Router、路由规则
+ no callback

Koa ( Ali 常用)

+ 利用 co 作为底层运行框架，利用 Generator 的特性，实现“协程响应”，更加符合V8的设计初衷
+ Connect/Express 的中间件基本需要重写
+ 可选路由太多，多达20多个
+ no callback

#### 七、常用第三方中间件

+  body-parser 作为请求体解析中间件, 解析JSON、Raw、文本、URL-encoded格式的请求体