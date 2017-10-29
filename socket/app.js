var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(req, res) {
    fs.readFile('HTMLPage2.html', function(err, data) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    var room = null;
    socket.on('join', function(data) {
        room = data;
        socket.join(data);
    });

    socket.on('message', function(data) {
        io.sockets.in(room).emit('message', data);
    });
});