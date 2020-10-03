const express = require('express');

const router = express.Router();

const pops = require('./pops/pops.routes');

router.use('/', pops);

module.exports = router;
