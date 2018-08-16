let socket = io();
let connectedStudents = 0;
let slowdown = 0;
let speedUp = 0;
let confused = 0;
let breakPls = 0;
let question = 0;
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

socket.on('slowDown', function(data) {
    slowdown++;
    $('#slowDown').text(slowdown);
});

socket.on('speedUp', function(data) {
    speedUp++;
    $('#speedUp').text(speedUp);
});

socket.on('confused', function(data) {
    confused++;
    $('#confused').text(confused);
});

socket.on('break', function(data) {
    breakPls++;
    $('#breakPls').text(breakPls);
});

socket.on('question', function(data) {
    question++;
    $('#question').text(question);
});

socket.emit('newRoom');

window.onbeforeunload = function() {
    socket.emit('deleteRoom');
};