const express = require('express');
const router = express.Router({ mergeParams: true });

// Get parentID/childID from params
router.get('/child/:childID', function (req, res, next) {
    return res.json({
        parentID: req.params.parentID,
        childID: req.params.childID,
    });
});

module.exports = router;
