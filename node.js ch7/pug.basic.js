var http = require('http');
var fs = require('fs');
var pug = require('pug');

http.createServer(function(req, res) {
    fs.readFile('PugPage.pug', 'utf8', function(err, data) {
        var fn = pug.compile(data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fn({
            name: 'RintIanTta',
            description: 'Hello pug With Node.js .. !'
        }));
    });
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});