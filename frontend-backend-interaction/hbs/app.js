const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

// body parsing middleware
app.use(express.urlencoded({ extended: true }));

// view engine
app.engine(
  "hbs",
  handlebars.engine({
    defaultlayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

// stores our array of messages
const messages = [];

// GET main page
app.get('/', (req, res) => {
    res.render('main', { messages, title: 'Messages' });
});
// POST new message
app.post('/', (req, res) => {
    const message = req.body.message;
    messages.push(message);
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);
