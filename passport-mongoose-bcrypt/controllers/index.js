const User = require('mongoose').models.User;

// Home page
const getIndex = function (req, res, next) {
    if (req.user) {
        // Logged in, req.user comes from passport.deserializeUser (app.js)
        res.render('index', { title: 'Express', user: req.user });
    } else {
        // Not logged in, show login page
        res.render('login');
    }
};

// Register page
const registerPage = async function (req, res, next) {
    return res.render('register');
};

// Register
const register = async function (req, res, next) {
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
const reset = async function (req, res, next) {
    await User.deleteMany({});
    return res.redirect('/');
};

module.exports.getIndex = getIndex;
module.exports.register = register;
module.exports.registerPage = registerPage;
module.exports.reset = reset;
