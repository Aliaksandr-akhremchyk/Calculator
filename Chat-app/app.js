const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render('index')
})
server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);

let userId = 0;

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.username = "Anonymous"
    socket.usernameId = ++userId;
        
    io.sockets.emit('greeting_message', {greeting : `Новый пользователь ${socket.usernameId} вступил в чат`, userId: socket.usernameId})

    socket.on('change_username', (data) => {
        socket.username = data.username;
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className, userId: socket.usernameId});
    })

    socket.on('typing', () => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    socket.on('notTyping', () => {
    	socket.emit('notTyping')
    })
})
