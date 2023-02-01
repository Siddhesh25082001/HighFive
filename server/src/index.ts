import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';

import { roomHandler } from "./room/roomHandler";

// Express Application
const app = express();
app.use(cors);
const port = 8000;

// HTTP Server
const server = http.createServer(app);

// Signalling Server (Web Socket Server)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['POST', 'GET']
    }
});

// Web Socket Connection
io.on('connection', (socket) => {
    console.log('User is Connected');
    console.log('User ID:', socket.id);

    // Handling the Room Events
    roomHandler(socket);
})

// Listening to the port
server.listen(port, () => {
    console.log(`Application Running on port ${port}`);
});