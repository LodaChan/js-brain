
let db = require("../cache-data.js");

module.exports = function (app) {

    app.get('/demo-page', function (req, res) {
        res.send('/demo-page');// 返回html
    });

    app.get('/err', function (req, res) {
        res.status(500).send('err');// http 错误处理
    });


    app.get('/get', function (req, res) {

        let q = req.query; // { id: '1111' }
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, q);

        if (q.hasOwnProperty('id') && isFinite(q.id)) {
            let id = parseInt(q.id);
            let dbData = db.get(id);
     
            res.json({
                status: 200,
                data: {
                    code: 10000,
                    msg: "ok",
                    data: dbData
                },
            })
        }
        else {
            res.json({
                status: 200,
                data: {
                    code: 10000,
                    msg: "params err",
                    data: null
                },
            })
        }

    });

    app.get('/fuzzy', function (req, res) {
        res.send('/fuzzy');
    });

    app.get('/page', function (req, res) {
        res.send('/page');
    });

    app.get('/add', function (req, res) {
        res.send('/add');
    });

    app.get('/update', function (req, res) {
        res.send('/update');
    });

    app.get('/delete', function (req, res) {
        res.send('/delete');
    });

    app.get('/*', function (req, res) {
        res.send('/delete');
    });
};