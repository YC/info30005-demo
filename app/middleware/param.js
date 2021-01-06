const mongoose = require('mongoose');

// Verifies that param is a mongodb object ID
const verifyParam = function (paramName) {
    return function (req, res, next) {
        if (
            !req.params[paramName] ||
            !mongoose.Types.ObjectId.isValid(req.params[paramName])
        ) {
            const err = new Error(`Param ${paramName} is incorrect`);
            err.status = 400;
            return next(err);
        }

        next();
    };
};

module.exports = verifyParam;
