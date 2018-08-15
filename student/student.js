let socket = io();
let room;

socket.on('connect', function() {
    let sessionID = socket.io.engine.id;
    console.log('Student ID: ' + sessionID);
});

socket.on('Error', function(data) {
    alert(data);
});

$('#slowDownButton').on('click', function(e) {
    alert('Slow Down');
});
$('#confusedButton').on('click', function(e) {
    alert('Confused');
});
$('#breakButton').on('click', function(e) {
    alert('Need a break');
});
$('#questionButton').on('click', function(e) {
    alert('Have a question');
});

$('#roomCodeButton').on('click', function() {
    let roomCode = $('#roomCode').val();
    if(!roomCode) {
        alert('Error: Room code required');
        return;
    }
    socket.emit('joinRoom', roomCode);
});

socket.on('joinedRoom', function(data) {
    console.log('Successfully joined room ' + data);
    room = data;

    $('#slowDownButton').attr('disabled', false);
    $('#confusedButton').attr('disabled', false);
    $('#breakButton').attr('disabled', false);
    $('#questionButton').attr('disabled', false);
    $('#roomCodeButton').attr('disabled', true);
    $('#roomCode').attr('disabled', true);
    $('#question').attr('disabled', false); // TODO handle disconnections
});