const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');

// Initalise models
const User = require('./models/user');

// Import router
const indexRouter = require('./routes/index');

const app = express();

// Set up bodyParser for form data on requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up ejs view engine (deprecated)
// app.set('views', path.join(__dirname, 'views-ejs-deprecated'));
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

app.use(flash());

// Serve public directory
// app.use(express.static(path.join(__dirname, 'public')));

// For persistent login sessions
// If needing persistence across server restarts, then read
// https://www.npmjs.com/package/express-session#store
app.use(
    session({ secret: 'keyboard cat', saveUninitialized: false, resave: false })
);

// Set up passport.js with local strategy
app.use(passport.initialize());
app.use(passport.session());

// Serialise/Deserialise user
// Serialized information is stored in the session
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user._id);
});
passport.deserializeUser(async (obj, done) => {
    try {
        // Run database query here to get user from serialized object
        // exclude password
        const user = await User.findById(obj, { password: 0 });
        done(undefined, user);
    } catch (err) {
        done(err, undefined);
    }
});

// Defines local authentication strategy for Passport
// http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy(async function (username, password, done) {
        // Run database query
        const user = await User.findOne({ username });
        if (!user) {
            return done(undefined, false, {
                message: 'Incorrect username/password',
            });
        }

        // Check password
        user.verifyPassword(password, (err, valid) => {
            if (err || !valid) {
                return done(undefined, false, {
                    message: 'Invalid username or password',
                });
            } else {
                // If user exists and password matches the hash in the database
                return done(undefined, user);
            }
        });
    })
);

// Set up routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    return next(err);
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.title = "Error";

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
