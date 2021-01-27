/**
 * Modules
 */

// Express
const express = require('express');
// Cors
const cors = require('cors');
// Environment Variables
require('dotenv').config();

/**
 * Global Variables
 */

// App Port
const PORT = process.env.PORT || 5000;
// Server Checking Socket Port
const socketPORT = process.env.socketPORT || 5001;

/**
 * Middlewares
 */

// Init Express App
const app = express();
// Use Express Body Parser
app.use(express.json());
// Use Express Urlencoded
app.use(express.urlencoded({
    extended: true
}));
//  Use Cors
app.use(cors());
// Http Server
var server = require('http').createServer(app);
// Socket.io
const io = require("socket.io")(server, {
    cors: { origin: '*' }
});
// Open Socket
io.on('connection', (socket) => {
    let connIp = socket.handshake.address;
    if (connIp = '::1') {
        connIp = '127.0.0.1 (localhost)';
    }
    console.log(`A user connected with IP: ${connIp}`);
});

/**
 * Routes
 */

app.get('/', (req, res) => {
    res.send('Hello from Server API!');
})

/**
 * App Listen Port
 */
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
server.listen(socketPORT, console.log(`Socket is open at port ${socketPORT}`));