const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexController = require('../controllers/index');

// Get home page
router.get('/', indexController.getIndex);

// Get register page
router.get('/register', indexController.registerPage);

// Register
router.post('/register', indexController.register);

// Reset
router.post('/reset', indexController.reset);

// Handle login
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    })
);

// Handle logout
router.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
