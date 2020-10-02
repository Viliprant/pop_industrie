const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
app.use(morgan('tiny'));
app.use(helmet());

app.get('/', (req, res) => {
    res.json({
        message: '🤗 POP INDUSTRIE API 🤗',
    })
})

module.exports = app;