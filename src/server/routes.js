const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/stocks', require('./stockRoutes'));

module.exports = router;
