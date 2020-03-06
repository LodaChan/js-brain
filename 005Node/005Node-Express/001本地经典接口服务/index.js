const express = require('express');
const app = express();
const util = require('util');// Node

const bodyParser = require("body-parser");

app.use("/", (req, res, next) => {
    console.log("I am MiddleWare 1");

    console.log("req.query>", util.inspect(req.query));
    console.log("req.cookies>", util.inspect(req.cookies));

    next();

})

var appRouters = require('./routers')(app);


var server = app.listen(3000, () => {
    console.log("server.address()>", util.inspect(server.address()));
    var host = server.address().address;
    var port = server.address().port;

    console.log("http://localhost:3000/");
    console.log("http://localhost:3000/?a=1&b=str&c=1,2,3");
    console.log("http://localhost:3000/?a=1&b=str&c=[1,2,3]");
    console.log("http://localhost:3000/module");
    console.log("http://localhost:3000/module/page");

})

