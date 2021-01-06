const express = require('express');

const app = express();

// Set up root route
app.get('/', function(req, res, next) {
    return res.json({ hello: 'world' });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.locals.message = 'Not found';
    res.locals.error = {};
    res.render('error');
});

module.exports = app;
