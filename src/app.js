const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
  res.json({
    message: '🤗 POP INDUSTRIE API 🤗',
  });
});
app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
