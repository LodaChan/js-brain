module.exports = function (app) {

    app.get('/', function (req, res) {
        res.send('Hello world');
    });

    app.get('/module', function (req, res) {
        res.send('module page');
    });

    app.get('/module/page', function (req, res) {
        res.send('module/page page');
    });

};