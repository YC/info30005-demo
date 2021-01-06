const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

// Set up bodyParser for form data on requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.json({ error: 'Not Found' });
});

// Error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
