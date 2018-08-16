let socket = io();
let room;

socket.on('connect', function() {
    let sessionID = socket.io.engine.id;
    console.log('Student ID: ' + sessionID);
});

socket.on('error', function(data) {
    alert(data);
});

$('#slowDownButton').on('click', function(e) {
    socket.emit('slowDown')
});

$('#confusedButton').on('click', function(e) {
    socket.emit('confused')
});

$('#breakButton').on('click', function(e) {
    socket.emit('break')
});

$('#questionButton').on('click', function(e) {
    let question = $('#question').val();
    socket.emit('question', question)
});

$('#roomCodeButton').on('click', function() {
    let roomCode = $('#roomCode').val();
    if(!roomCode) {
        alert('Error: Room code required');
        return;
    }
    socket.emit('joinRoom', roomCode);
    room = roomCode;
});

socket.on('joinedRoom', function() {
    console.log('Successfully joined room ' + room);

    $('#slowDownButton').attr('disabled', false);
    $('#confusedButton').attr('disabled', false);
    $('#breakButton').attr('disabled', false);
    $('#questionButton').attr('disabled', false);
    $('#question').attr('disabled', false);
    $('#roomCodeButton').attr('disabled', true);
    $('#roomCode').attr('disabled', true);
});

socket.on('roomDeleted', function() {
    alert('Teacher left room');

    $('#slowDownButton').attr('disabled', true);
    $('#confusedButton').attr('disabled', true);
    $('#breakButton').attr('disabled', true);
    $('#questionButton').attr('disabled', true);
    $('#question').attr('disabled', true);
    $('#question').val("");
    $('#roomCodeButton').attr('disabled', false);
    $('#roomCode').attr('disabled', false);
});

window.onbeforeunload = function() {
    socket.emit('leaveRoom');
};