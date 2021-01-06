const express = require('express');
const router = express.Router();
const rootAPIController = require('../controllers/api');

// Get API root
router.get('/', rootAPIController.getAPIRoot);

module.exports = router;
