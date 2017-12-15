var http = require('http');
var dt = require('./ZamanSorgula');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Guncel Tarih: "+dt.zaman());
    res.end();
}).listen(8080);