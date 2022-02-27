const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// body parsing middleware
app.use(express.urlencoded({ extended: true }));

// init view engine
app.set('view engine', 'ejs');

// stores our array of messages
const messages = [];

// GET main page
app.get('/', (req, res) => {
    res.render('main', { messages });
});
// POST new message
app.post('/', (req, res) => {
    const message = req.body.message;
    messages.push(message);
    io.emit('message', message);
    return res.send(messages);
});

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('message', function (msg) {
        // not sure why this log statement isn't printed...
        console.log(`new message ${msg}`);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(process.env.PORT || 3000);
