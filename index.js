var express = require('express');
var socket = require('socket.io');
//App start up
// 
var app = express();
var server = app.listen(4000, function(){
    console.log('server is started on port 4000');
} );

//static files 
var io = socket(server);
io.on('connection',function(socket){
    console.log('connection established successfully!!!',socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);

    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
})
app.use(express.static('public'))