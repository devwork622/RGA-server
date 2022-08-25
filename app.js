// https server
const https = require("https");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// Requiring file system to use local files
const fs = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var emailsRouter = require('./routes/emails');
var refreshRouter = require('./routes/refresh');
var alertsRouter = require('./routes/alerts');

var app = express();
// var port = 80;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    origin: "*"
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/emails', emailsRouter);
app.use('/refresh', refreshRouter);
app.use('/alerts', alertsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Creating object of key and certificate
// for SSL
const options = {
  key: fs.readFileSync("my.key"),
  csr: fs.readFileSync("my.csr"),
};

module.exports = app;
