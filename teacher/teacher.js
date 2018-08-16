let socket = io();
let connectedStudents = 0;
let room;

socket.on('connect', function() {
    let sessionID = socket.io.engine.id;
    console.log('Teacher ID: ' + sessionID);
});

socket.on('error', function(data) {
    alert(data);
});

socket.on('joinedRoom', function(data) {
    room = data;
    $('#roomCode').html(data);
    console.log('Successfully joined room ' + data);
});

socket.on('studentJoined', function() {
    connectedStudents++;
    $('#numStudents').text(connectedStudents);
});

socket.on('studentLeft', function() {
    connectedStudents--;
    $('#numStudents').text(connectedStudents);
});

socket.emit('newRoom');

window.onbeforeunload = function() {
    socket.emit('deleteRoom');
};