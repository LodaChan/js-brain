
let db = require("../cache-data.js");

module.exports = function (app) {

    // http://localhost:3000/index-page
    app.get('/index.html', function (req, res) {
        res.send('/index-page');
    });

    // http://localhost:3000/err
    app.get('/err', function (req, res) {
        res.status(500).send('err');
    });

    // http://localhost:3000/get?id=1
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

    // http://localhost:3000/fuzzy?name=a
    app.get('/fuzzy', function (req, res) {
        let q = req.query; // { id: '1111' }
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, q);

        if (q.hasOwnProperty('name') && q.name) {

            let dbData = db.fuzzy(q.name);

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

    // http://localhost:3000/page?pageIndex=1&pageSize=5
    app.get('/page', function (req, res) {
        res.send('/page');
    });

    // http://localhost:3000/add
    app.get('/add', function (req, res) {
        //req.body
        res.send('/add');
    });

    // http://localhost:3000/update
    app.get('/update', function (req, res) {
        res.send('/update');
    });

    // http://localhost:3000/delete
    app.get('/delete', function (req, res) {
        res.send('/delete');
    });

    // http://localhost:3000/download
    app.get('/download', function (req, res) {
        res.send('/download');
    });

    app.get('/*', function (req, res) {
        res.send('/404');
    });
};