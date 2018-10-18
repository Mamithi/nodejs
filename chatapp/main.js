const express = require('express');
const app = express();

// Set the template engine ejs
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

//Listen on port 3000
server = app.listen(3000);

// Socket.io instantistion
const io = require('socket.io')(server);

// Listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected');
    // default username
    socket.username = "Anonymous";

    // Listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    })

    // Listen in new message
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message: data.message, username: socket.username});
    })

    // Listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { username: socket.username});
    });
})

