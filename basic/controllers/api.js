// API root
const getAPIRoot = function(req, res, next) {
    res.json({ foo: 'bar' });
};

module.exports.getAPIRoot = getAPIRoot;
