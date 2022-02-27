const mongoose = require('mongoose');
const User = mongoose.models.User;

// Home page
const getIndex = (req, res) => {
    res.render('index', { title: 'Express', user: req.user.toJSON() });
};

const login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login', { flash: req.flash('error'), title: 'Login' });
};

// Register page
const registerPage = async function (req, res) {
    return res.render('register', { title: 'Register' });
};

// Register
const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const secret = req.body.secret;

    try {
        const user = new User({ username, password, secret });
        await user.save();
        return res.redirect('/');
    } catch (err) {
        return res.render('error', {
            error: err,
            message: 'Registration failed',
        });
    }
};

// Reset DB
const reset = async (req, res) => {
    await User.deleteMany({});
    return res.redirect('/');
};

module.exports = {
    getIndex,
    login,
    register,
    registerPage,
    reset
};
