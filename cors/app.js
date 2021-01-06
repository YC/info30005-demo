const express = require('express');
const http = require('http');

const app = express();

if (process.env.CORS) {
    // For production, specify a list of allowed origins instead of *
    const cors = require('cors');
    app.use(cors());
}

app.get('/', function (req, res, next) {
    return res.json({ message: 'Hello World!' });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.json({ status: 'error', error: 'Page not found' });
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    return res.json({ status: 'error', error: err });
});

// Get port from Node environment and set provided port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen for HTTP requests on provided port
server.listen(port);

module.exports = app;
