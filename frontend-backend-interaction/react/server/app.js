const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// For production, specify a list of allowed origins instead of *
const cors = require('cors');
app.use(cors());

// body parsing middleware
app.use(bodyParser.json());

// stores our array of messages
const messages = [];

// GET main page
app.get('/', (req, res) => {
    return res.send(messages);
});
// POST new message
app.post('/', (req, res) => {
    const message = req.body.message;
    messages.push({ id: messages.length, message });
    return res.send(messages);
});

app.listen(process.env.PORT || 3000);
