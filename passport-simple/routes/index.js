const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexController = require('../controllers/index');

// GET home page
router.get('/', indexController.getIndex);

// Handle login
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

// Handle logout
router.post(
    '/logout',
    (req, res) => {
        req.logout();
        res.redirect('/');
    }
)

module.exports = router;
