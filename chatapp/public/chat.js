$(function() {
    //Make connection
    let socket = io.connect('http://localhost:3000');

    // Buttons and inputs
    let message = $("#message");
    let username = $("#username");
    let send_message = $("#send_message");
    let send_username = $("#send_username");
    let chatroom = $("#chatroom");
    let feedback = $("#feedback");

    // Emit message
    send_message.click(function(){
        socket.emit('new_message', {message: message.val()})
    })

    // Listen on new message
    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    send_username.click(function(){
        console.log(username.val())
        socket.emit('change_username', {username: username.val()})
    });

    // Emit typing
    message.bind("keypress", () => {
        socket.emit('typing');
    });

    // Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " typing..." + "</p>")
    })

    
});