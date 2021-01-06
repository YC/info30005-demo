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
// app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.locals.message = 'Not found';
    res.locals.error = {};
    res.render('error');
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
