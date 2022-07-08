const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Set up bodyParser for form data on requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine ejs (deprecated)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Set up Handlebars view engine
app.engine(
  "hbs",
  handlebars.engine({
    defaultlayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

// Serve public directory
// app.use(express.static(path.join(__dirname, 'public')));

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
app.use(flash());

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

// Authentication middleware
const isAuthed = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    return next();
}

// Login page
app.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' });
});
// Handle login
app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })
);
// Handle logout
app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Main page which requires login
app.get('/', isAuthed, (req, res) => {
    res.render('index', { title: 'Express', user: req.user.id });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
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
