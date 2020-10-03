const express = require('express');

const router = express.Router();

const connect = require('../../db');

const Pop = require('./pops.model');

router.get('/pops', (req, res, next) => {
  connect(
    async () => {
      await Pop.find({}).select('-_id -__v')
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

router.post('/pop', (req, res, next) => {
  connect(
    async () => {
      const pop = new Pop(req.body);
      await pop.save()
        .then((inserted) => {
          res.status(200).json({
            message: 'Pop added.',
            // eslint-disable-next-line no-underscore-dangle
            data: { _id: inserted._id },
          });
        })
        .catch((err) => {
          res.status(500);
          next(err);
        });
    }, res,
  );
});

router.get('/pop/:number_funko', (req, res, next) => {
  connect(
    async () => {
      const popNumber = req.params.number_funko;
      await Pop.find({ number_funko: popNumber }).select('-_id -__v')
        .then((pops) => {
          if (pops.length === 0) { next(new Error('Unknow Funko Pop')); } else {
            res.status(200).json({
              message: `Pop ${popNumber}`,
              data: pops,
            });
          }
        })
        .catch((err) => {
          res.status(500);
          next(err);
        });
    }, res,
  );
});

module.exports = router;
