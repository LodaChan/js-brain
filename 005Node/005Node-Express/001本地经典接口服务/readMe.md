# Express

#### 一、快速上手

```
cnpm install --save -d express
npm start
node index.js
```

```js
const express = require('express');
const app = express();
```

#### 二、对比 Node Http

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

#### 三、中间件 MiddleWare

+ 处理HTTP请求的函数。它最大的特点就是，一个中间件处理完，再传递给下一个中间件
+ 抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止
+ 使用app.use方法，注册了两个中间件

```js
app.use("/", (req, res, next) => {
    console.log("I am MiddleWare");

    console.log("req.query>", util.inspect(req.query));
    console.log("req.cookies>", util.inspect(req.cookies));

    next();

})
```

中间件分类

+ 中间件
+ 局部中间件
+ 内置中间件(静态资源)

#### 四、常用插件

+ body-parser

```

```