// Home page
const getIndex = function(req, res, next) {
    res.render('index', { title: 'Express' });
};

module.exports.getIndex = getIndex;
