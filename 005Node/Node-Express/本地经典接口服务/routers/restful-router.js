
let db = require("../cache-data.js");
const util = require('util');
const fs = require("fs");
const path = require("path")

module.exports = function (app) {

    // http://localhost:3000/index-page
    app.get('/index-page', function (req, res) {
        console.log("path:" + path.resolve("./") + "/static/index.html")
        res.sendFile(path.resolve("./") + "/static/index.html");
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

    // http://localhost:3000/get/1
    app.get('/get/:id', function (req, res) {

        let params = req.params; // { id: '1111' }
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, params);

        if (params.hasOwnProperty('id') && isFinite(params.id)) {
            let id = parseInt(params.id);
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
        let q = req.query;
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, q);

        if (q.hasOwnProperty('pageIndex') && isFinite(q.pageIndex) &&
            q.hasOwnProperty('pageSize') && isFinite(q.pageSize)) {

            let pageIndex = parseInt(q.pageIndex);
            let pageSize = parseInt(q.pageSize);

            let dbData = db.page(pageIndex, pageSize);

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

    // http://localhost:3000/add
    app.post('/add', function (req, res) {
        let body = req.body;
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, util.inspect(body));

        if (body.hasOwnProperty('id') && isFinite(body.id) &&
            body.hasOwnProperty('name') && body.name) {

            let id = parseInt(body.id);
            let name = body.name;

            let dbData = db.add(id, name);

            res.status(200).json({
                code: 200,
                msg: "sccuess",
                data: dbData
            })

        } else {
            res.status(200).json({
                code: 200,
                msg: "params err",
                data: false
            })
        }
    });

    // http://localhost:3000/update
    app.post('/update', function (req, res) {
        let body = req.body;
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, util.inspect(body));

        if (body.hasOwnProperty('id') && isFinite(body.id) &&
            body.hasOwnProperty('name') && body.name) {

            let id = parseInt(body.id);
            let name = body.name;

            let dbData = db.update(id, name);

            res.status(200).json({
                code: 200,
                msg: "sccuess",
                data: dbData
            })

        } else {
            res.status(200).json({
                code: 200,
                msg: "params err",
                data: false
            })
        }
    });

    // http://localhost:3000/delete
    app.post('/delete', function (req, res) {
        let body = req.body;
        console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`, util.inspect(body));

        if (body.hasOwnProperty('id') && isFinite(body.id)) {

            let id = parseInt(body.id);

            let dbData = db.delete(id);

            res.status(200).json({
                code: 200,
                msg: "sccuess",
                data: dbData
            })

        } else {
            res.status(200).json({
                code: 200,
                msg: "params err",
                data: false
            })
        }
    });

    // http://localhost:3000/res_download
    app.get('/res_download', function (req, res) {
        console.log("path:" + path.resolve("./") + "/static/test.txt");
        res.status(200).download(path.resolve("./") + "/static/test.txt", "download.txt");
    });

    // http://localhost:3000/fs_download
    app.get('/fs_download', function (req, res) {
        console.log("path:" + path.resolve("./") + "/static/test.txt");
        res.status(200).set({
            "Content-type": "application/octet-stream",
            "Content-Disposition": "attachment;filename=" + encodeURI("下载文件.txt")
        });
        fReadStream = fs.createReadStream(path.resolve("./") + "/static/test.txt");
        fReadStream.on("data", function (chunk) { res.write(chunk, "binary") });
        fReadStream.on("end", function () {
            res.end();
        });
    });

    app.get('/*', function (req, res) {
        res.send('/404');
    });
};