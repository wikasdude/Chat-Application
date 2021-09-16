//Make connection
var socket=io.connect('http://localhost:4000');
var message = document.getElementById('message');
 
handle = document.getElementById('handle');
output = document.getElementById('output');
btn = document.getElementById('send');
var feedback=document.getElementById('feedback');
console.log(btn);

//Emit Event

btn.addEventListener('click',function(){
    console.log(message.value);
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });
    message.value='';
});
// message listening 
message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);

})
// Listen for Events
socket.on('chat',function(data){
    feedback.innerHTML='';
    if(data.handle==handle.value){
        
    output.innerHTML+="<p style='text-align:right;'><strong>"+data.handle+" : </strong>"+ data.message+"</p>";
    }
    else{

        output.innerHTML+='<p><strong>'+data.handle+' : </strong>'+ data.message+'</p>';
    }
});

socket.on('typing',function(data){

    feedback.innerHTML='<p><em>'+data+' is typing </em></p>';
})

