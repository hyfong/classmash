let socket = io();
let room;

socket.on('connect', function() {
    let sessionID = socket.io.engine.id;
    console.log('Teacher ID: ' + sessionID);
});

socket.on('Error', function(data) {
    alert(data);
});

socket.on('joinedRoom', function(data) {
    room = data;
    $('#roomCode').html(data);
    console.log('Successfully joined room ' + data);
});

socket.emit('newRoom', {});

window.onbeforeunload = function() {
    socket.emit('deleteRoom');
};