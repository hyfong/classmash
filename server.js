let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let rooms = [];
let connections = [];

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
    connections.push(socket);
    console.log('Client connected with ID ' + socket.id);

    socket.on('joinRoom', function(data) {
        let room = io.nsps['/'].adapter.rooms[data];
        if (!room) {
            socket.emit('Error', 'Error: Invalid room');
            return;
        }
        socket.join(room);
        console.log('Student connected to room ' + data);
        socket.emit('joinedRoom', data);
    });

    socket.on('newRoom', function() {
        let room = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        socket.join(room);
        rooms.push(room);
        console.log('New room created with ID ' + room);
        socket.emit('joinedRoom', room);
    });

    socket.on('deleteRoom', function() {
        console.log('Room deleted with ID ');
        socket.broadcast.emit('roomDeleted')
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

    socket.on('leaveRoom', function(data) {
    });

});

