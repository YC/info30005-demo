const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// init view engine
app.set('view engine', 'pug');

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
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);
