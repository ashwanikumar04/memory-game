/*jslint node: true */

var express = require('express');
var app = express();
var serveStatic = require('serve-static');
app.disable('etag');
app.disable('x-powered-by');
app.use(serveStatic(__dirname + '/docs', {
    maxAge: '5d',
    setHeaders: setCustomCacheControl
}));

function setCustomCacheControl(res, path) {
    if (serveStatic.mime.lookup(path) === 'text/html') {
        // Custom Cache-Control for HTML files
        res.setHeader('Cache-Control', 'public, max-age=0');
    }
}

var listeningPort = process.env.PORT || 8095;

var apiRoutes = express.Router();

apiRoutes.get('/', function (req, res) {
    res.redirect('/index.html');
});

var http = require('http').Server(app);

var server = http.listen(listeningPort, function () {
    console.log("App started");
});