// This is 'app.js' File of Connect App - The Main Driving File of Connect

// Importing Required Modules
const express = require('express');
const ejs = require('ejs');

// Creating an express app
const app = express();
const port = 8000;

// Importing Other Requirements
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

// Setting the App Requirements
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/peerjs', peerServer);

// Initializing the counter to 0 and user list to an empty array
global.counter = 0;
global.users = []

// Home Page of Connect
app.get('/', function (req,res) {
    res.render('home');
});

// Create Room Page of Connect
app.use('/createRoom', require('./routes/create-room.routing'));
app.use('/joinRoom', require('./routes/join-room.routing'));
app.use('/info', require('./routes/info.routing'));
app.use('/room', require('./routes/room.routing'));

// Form Error Page
app.get('/formError/:roomId', function(req, res) {
    res.render('formError', { roomId: req.params.roomId })
});

// Thank You Page
app.get('/thanks', function(req, res){
    res.render('thankYou');
});

// Establishing the connection
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId, userName) => {

        users[users.length - 1].id = userId;

        socket.join(roomId);
        counter++;
        
        console.log("peer-connection", counter, users);

        socket.to(roomId).emit('user-connected', userId, userName, users);

        // Message Connection 
        socket.on('message', message => {
            socket.to(roomId).emit('createMessage', message, userId, userName);
        });

        // Screen Sharing Enabling Connection
        socket.on('screen-share', (userId) => {
            socket.broadcast.to(roomId).emit('screen-sharing', userId, users);
        });

        // Screen Sharing Disabling Connection
        socket.on('stop-screen-share', (userId) => {
            socket.broadcast.to(roomId).emit('stop-screen-sharing', userId, users);
        });

        // Whiteboard Connection
        socket.on('draw', (lastX, lastY, offsetX, offsetY, pencilColor, pencilWidth) => {
            socket.broadcast.to(roomId).emit('drawing', lastX, lastY, offsetX, offsetY, pencilColor, pencilWidth);
        });

        socket.on('disconnect', () => {
            let index;
            for (let i = 0; i < counter; i++) {
                if (users[i] !== undefined && users[i].id === userId) {
                    index = i;
                    break;
                }
            }

            if (index !== undefined) {
                users.splice(index, 1);
                counter--;
            }

            console.log(`${userName} Disconnected`);
            socket.to(roomId).emit('user-disconnected', userId, userName, users);
        });

        socket.on('transmit-msg', (msg) => {
            socket.broadcast.emit('recieve-msg', msg);
        })
    });
});

// Error Page
app.get('*', function(req, res) {
    res.render('error');
});

// Testing the App
server.listen(process.env.PORT || port, function() {
    console.log(`Connect-App listening at http://localhost:${port}`);
});