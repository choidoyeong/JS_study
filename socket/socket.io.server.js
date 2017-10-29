// 모듈 추출
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버 생성
var server = http.createServer(function(req, res) {
    // HTMLPage 읽기
    fs.readFile('HTMLPage.html', function(error, data) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
}).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273');
});

// 소켓 서버를 생성 및 실행
var id = 0;
var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    id = socket.id;
    socket.on('rint', function(data) {

        io.sockets.to(id).emit('smart', data);
    });
});