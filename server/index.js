/* eslint-disable no-console */
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const { syncAndSeed } = require('./db');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// TODO create environment variable for secret
//session needs to stay above mounted router
app.use(
  session({
    name: 'session',
    secret: 'sessionSecretString', // process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false },
    unset: 'destroy',
  }),
);

//for session dev, can delete whenever
app.use((req, res, next) => {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  console.log('SESSIONID: ', req.session.userId);
  next();
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

syncAndSeed();
