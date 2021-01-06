const express = require('express');
const router = express.Router();

// GET index route
router.get('/', function(req, res, next) {
    return res.json({ hello: 'world' });
});

// Request path and query
// http://localhost:3000/request?a=b&c=d
router.get('/:param', function(req, res, next) {
    return res.json({ params: req.params, query: req.query, path: req.path });
});

// Request body (note that this is a POST method)
router.post('/body', function(req, res, next) {
    return res.json({ body: req.body });
});

// When having nested routers with params, must use mergeParams
const childRouter = require('./child');
router.use('/parent/:parentID', childRouter);

module.exports = router;
