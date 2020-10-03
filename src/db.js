const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connect(resolve, res) {
  mongoose.connect(`${process.env.URL_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resolve)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.message);
      res.status(500).json({
        message: err.message,
      });
    });
}

module.exports = connect;
