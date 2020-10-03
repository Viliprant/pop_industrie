const express = require('express');

const router = express.Router();

const connect = require('../../db');

router.get('/pops', (req, res) => {
  connect(
    () => {
      res.status(200).json({
        message: 'POPS !!!',
      });
    }, res,
  );
});

module.exports = router;
