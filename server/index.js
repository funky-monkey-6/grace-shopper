/* eslint-disable no-console */
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const { syncAndSeed } = require('./db');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

app.use('/api', require('./api'));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

syncAndSeed();
