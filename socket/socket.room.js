var fs = require('fs');
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(52273, function() {
    console.log('Server Running at http://127.0.0.1:52273');
});

server.on('request', function(request, response) {
    fs.readFile('HTMLPage.html', function(error, data) {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(data);
    });
});

io.sockets.on('connection', function(socket) {
    var roomName = null;
    socket.on('join', function(data) {
        roomName = data;
        socket.join(roomName);
        console.log('JOIN ROOM LIST', io.sockets.adapter.rooms);
    });

    socket.on('message', function(data) {
        io.sockets.in(roomName).emit('message', 'test');
    });
});