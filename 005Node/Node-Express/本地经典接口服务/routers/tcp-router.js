module.exports = function (app) {

    app.get('/socket', function (req, res) {
        res.send('/socket');
    });

    app.get('/viedo', function (req, res) {
        res.send('/viedo');
    });

    app.get('/tv', function (req, res) {
        res.send('/tv');
    });

    app.post('/upload', function (req, res) {
        res.send('/upload');
    });


    app.post('/big-file-upload', function (req, res) {
        res.send('/big-file-upload');
    });
};