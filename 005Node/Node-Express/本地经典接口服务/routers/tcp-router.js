module.exports = function (app) {

    app.get('/socket.html', function (req, res) {
        res.sendFile(path.resolve("./") + "/static/scoket.html");
    });

    app.get('/socket', function (req, res) {
        res.send('/socket');
    });

    app.get('/viedo', function (req, res) {
        res.send('/viedo');
    });

    app.get('/rtsp', function (req, res) {
        res.send('/rtsp');
    });

    app.post('/upload', function (req, res) {
        res.send('/upload');
    });


    app.post('/big-file-upload', function (req, res) {
        res.send('/big-file-upload');
    });
};