
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(52273);

function handler (req, res) {
  fs.readFile('Main.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
  });
}
var roomList = [];
var rooms = [];
var inRoom = null;
var count = 0;
io.on('connection', function (socket) {
  socket.emit('make', Object.keys(roomList));

  socket.on('makeRoom', function(data) {
    if(roomList[data.room] != null) 
      socket.emit('exist');
    else {
      socket.leave(inRoom);
      rooms[data.room] = new Object;
      rooms[data.room].nickname = new Object;
      rooms[data.room].nickname[data.name] = socket.id;
      roomList[data.room] = data.room;
      socket.join(data.room);
      inRoom = data.room;
      io.sockets.emit('make', Object.keys(roomList));
      io.to(inRoom).emit('join', Object.keys(rooms[inRoom].nickname));
    }
  });

  socket.on('join', function(data) {
    socket.leave(inRoom);
    socket.join(data.room);
    rooms[data.room].nickname[data.name] = socket.id;
    inRoom = data.room;
    io.to(inRoom).emit('join', Object.keys(rooms[inRoom].nickname));
  });

  socket.on('send', function(data) {
    io.to(inRoom).emit('message', data);
  });

  socket.on('kick', function(data) {
    console.log(data);
    io.to(rooms[inRoom].nickname[data]).emit('leave');
  });

  socket.on('leave', function(data) {
    console.log(socket.id);
    socket.leave(inRoom);
    socket.emit('s');
    inRoom = null;
  })
});