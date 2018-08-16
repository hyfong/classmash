let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let teachers = {};

app.use(express.static(__dirname + '/student'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/student/student.html');
});

app.use(express.static(__dirname + '/teacher'));
app.get('/teacher', function(req, res){
    res.sendFile(__dirname + '/teacher/teacher.html');
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});

io.on('connection', function(socket) {
    let currentRoom;
    console.log('Client connected with ID ' + socket.id);

    socket.on('newRoom', function() {
        let room = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        socket.join(room);

        currentRoom = room;
        teachers[room] = socket.id;
        console.log('New room created with ID ' + room);
        socket.emit('joinedRoom', room);
    });

    socket.on('joinRoom', function(room) {
        if (!(room in teachers)) {
            socket.emit('error', 'Error: Invalid room');
            return;
        }
        socket.join(room);

        currentRoom = room;
        console.log('Student connected to room ' + room);
        socket.emit('joinedRoom');
        io.to(teachers[room]).emit('studentJoined');
    });

    socket.on('leaveRoom', function() {
        if (currentRoom === undefined) {
            console.log('Student ' + socket.id + ' left');
            return;
        }
        console.log('Student ' + socket.id + ' left room ' + currentRoom);
        socket.leave(currentRoom);
        io.to(teachers[currentRoom]).emit('studentLeft', socket.id);
    });

    socket.on('deleteRoom', function() {
        console.log(socket.broadcast.to(currentRoom).emit)
        socket.broadcast.to(currentRoom).emit('roomDeleted');
        io.of('/').in(currentRoom).clients(function(error, clients) {
            if (clients.length > 0) {
                clients.forEach(function (socket_id) {
                    io.sockets.sockets[socket_id].leave(currentRoom);
                });
            }
        });
        delete teachers[currentRoom];
        console.log('Room ' + currentRoom + ' deleted');
    });

    socket.on('slowDown', function(data) {
    });

    socket.on('speedUp', function(data) {
    });

    socket.on('confused', function(data) {
    });

    socket.on('break', function(data) {
    });

    socket.on('question', function(data) {
    });

});

