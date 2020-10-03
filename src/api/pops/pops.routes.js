const express = require('express');

const router = express.Router();

const connect = require('../../db');

const Pop = require('./pops.model');

router.get('/pops', (req, res, next) => {
  connect(
    async () => {
      await Pop.find({}).select('-_id')
        .then((pops) => {
          res.status(200).json({
            message: 'List of Funko Pop.',
            data: pops,
          });
        })
        .catch((err) => {
          res.status(500);
          next(err);
        });
    }, res,
  );
});

module.exports = router;
