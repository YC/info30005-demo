const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// stores our array of messages
const messages = [];

// GET main page
app.get('/', (req, res) => {
    var messages_html = '';
    for (const message of messages) {
        messages_html += `<li>${message}</li>`;
    }
    const output = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>w8</title>
    </head>
    <body>
        <form action="/" method="POST">
            <input type="text" name="message" value="" />
            <input type="submit" />
        </form>
        <ul>
            ${messages_html}
        </ul>
    </body>
</html>
`;
    res.send(output);
});
// POST new message
app.post('/', (req, res) => {
    const message = req.body.message;
    messages.push(message);
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);
