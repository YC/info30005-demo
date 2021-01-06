const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const app = express();

// Set up bodyParser for form data on requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};
app.use(cors(corsOptions));

// For persistent login sessions
// If needing persistence across server restarts, then read
// https://www.npmjs.com/package/express-session#store
app.use(
    session({
        secret: 'keyboard cat',
        saveUninitialized: false,
        resave: false,
    })
);

// Set up passport.js with local strategy
app.use(passport.initialize());
app.use(passport.session());

// Serialise/Deserialise user
// Serialized information is stored in the session
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user.id);
});
passport.deserializeUser(async (obj, done) => {
    try {
        // Run database query here to get user from serialized object
        const user = { id: obj };
        done(undefined, user);
    } catch (err) {
        done(err, undefined);
    }
});

// Defines local authentication strategy for Passport
// http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy(function (username, password, done) {
        // Run database query instead
        // For this example, we'll allow any login with the password 'password'
        if (password !== 'password') {
            return done(undefined, false, {
                message: 'Incorrect username/password',
            });
        }
        // If user exists and password matches the hash in the database
        const user = { id: username };
        return done(undefined, user);
    })
);

// Handle login
const login = async (req, res, next) => {
    console.log(req.body);
    // Authenticate with passport
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        // Return 401 if unauthorised
        req.login(user, function (err) {
            if (err) {
                err.message = 'Invalid username or password';
                err.status = 401;
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
};
app.post('/login', login);

// Checks whether user is authenticated
const authMiddleware = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    // If user is not authenticated
    const err = new Error('User is not authenticated');
    err.status = 401;
    return next(err);
};

// If user is logged in, return
app.get('/logged_in', authMiddleware, function (req, res) {
    return res.json(req.user);
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    return next(err);
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.status(err.status || 500);
    res.json({ status: 'error', message: err.message });
});

module.exports = app;
