const express = require('express');
const app = express();

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
    return res.send(messages);
});

app.listen(process.env.PORT || 3000);
