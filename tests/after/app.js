const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect
mongoose.connect('mongodb://localhost:27017/w10', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// url encoded data (e.g. forms)
app.use(bodyParser.urlencoded({ extended: true }));
// json
app.use(bodyParser.json());

// view engine
app.set('view engine', 'ejs');

// routers
const controllers = require('./controllers');
app.get('/api', controllers.getMessages);
app.post('/api', controllers.addMessage);
app.get('/view', controllers.getMessageView);
app.post('/view', controllers.addMessageView);

app.listen(3000, () => {
    console.log('Started');
});
module.exports = app;
