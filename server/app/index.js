'use strict';

var app = require('express')();
var path = require('path');
var passport = require('passport');

app.use(require('./sessions.middleware'));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use('/auth', require('./auth/auth.router'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
