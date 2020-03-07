module.exports = function (app) {

    //设置跨域访问
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); // 允许跨域
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' Express 4.17.1');
        // res.header("Content-Type", "application/json;charset=utf-8");

        next();
    });

    app.get('/', function (req, res) {
        res.send('/');
    });

}