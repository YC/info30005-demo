const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const app = express();

// Set up bodyParser for form data on requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // Only provide stack trace in development
    const response = {};
    response.message = err.message;
    if (req.app.get('env') === 'development') {
        response.stack = err.stack;
    }
    // If unknown error has occurred, print error and set status code
    if (!res.statusCode) {
        console.error(err.stack);
        res.status(500);
    }

    // Send response
    res.json(response);
});

module.exports = app;
