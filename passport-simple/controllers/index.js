// Home page
const getIndex = function (req, res, next) {
    if (req.isAuthenticated()) {
        // Logged in
        res.render('index', { title: 'Express', user: req.user.id });
    } else {
        // Not logged in, show login page
        res.render('login');
    }
};

module.exports.getIndex = getIndex;
