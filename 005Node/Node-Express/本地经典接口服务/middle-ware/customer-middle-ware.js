const util = require('util');// Node

// 自定义中间件
// 全局中间件
function globalMiddleWare(req, res, next) {
    console.log();
    console.log("global middleWare begin");

    console.log("req.query>", util.inspect(req.query));// req query
    console.log("req.cookies>", util.inspect(req.cookies));// req cookies

    next();

    console.log("global middleWare 1 end");
    console.log();
}

// 局部中间件
function localMiddleWare(req, res, next) {
    console.log("local middleWare begin");
    next();
    console.log("local middleWare end");
}

module.exports = [globalMiddleWare, localMiddleWare]