const express = require('express');
const app = express();
const util = require('util');// Node
const bodyParser = require("body-parser");// body-parser 第三方中间件

// [mk] bodyParser 同时支持 json form text
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}))


const cookieParser = require('cookie-parser')
app.use(cookieParser());

// [mk] load middleware 加载自定义中间件(全局中间件与局部中间件)
app.use("/", require('./middle-ware/customer-middle-ware.js'));

// [mk] load static middleware 加载 内置中间件
app.use(express.static("./static"))

// [mk] load router
require('./routers/common-router.js')(app);
require('./routers/restful-router.js')(app);
require('./routers/tcp-router.js')(app);


var server = app.listen(3000, () => {
    console.log("server.address()>", util.inspect(server.address()));
    var host = server.address().address;
    var port = server.address().port;

    console.log(__dirname);

    console.log("---url sample---");
    console.log("http://localhost:3000/");
    console.log("http://localhost:3000/?a=1&b=str&c=1,2,3");
    console.log("http://localhost:3000/?a=1&b=str&c=[1,2,3]");


    console.log("---RESTFul API---");
    console.log("http://localhost:3000/index-page");
    console.log("http://localhost:3000/err");
    console.log("http://localhost:3000/get?id=1");
    console.log("http://localhost:3000/get/1");
    console.log("http://localhost:3000/fuzzy?name=a");
    console.log("http://localhost:3000/page?pageIndex=2&pageSize=5");
    console.log("http://localhost:3000/add");
    console.log("http://localhost:3000/update");
    console.log("http://localhost:3000/delete");
    console.log("http://localhost:3000/res_download");
    console.log("http://localhost:3000/fs_download");

    console.log("---TCP/IP API---");
    console.log("http://localhost:3000/socket");
    console.log("http://localhost:3000/jsonp");
    console.log("http://localhost:3000/video");
    console.log("http://localhost:3000/tv");
    console.log("http://localhost:3000/upload");
    console.log("http://localhost:3000/big-file-upload");

    console.log("---static resource middle ware---");
    console.log("http://localhost:3000/test.html");
    console.log("http://localhost:3000/test.css");
    console.log("http://localhost:3000/test.png");
    console.log("http://localhost:3000/test.js");
    console.log("http://localhost:3000/test.mp4");
    console.log("http://localhost:3000/test.mp3");
})

