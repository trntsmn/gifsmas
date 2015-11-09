var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var hbsHelpers = require('./helpers/hbsHelpers');

var routes = require('./routes/index');
var users = require('./routes/users');

var server = express();

// view engine setup

// Use `.hbs` for extensions and find partials in `views/partials`.
server.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts/',
  defaultLayout: __dirname + '/views/layouts/main.hbs',
}));
server.set('views', path.join(__dirname, 'views'));
//server.engine('hbs', exphbs({defaultLayout: 'layout', extname: ".hbs"}));
server.set('view engine', 'hbs');
hbsHelpers.registerAll(hbs, __dirname);


// uncomment after placing your favicon in /public
server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(require('node-sass-middleware')({
  src: '/scss',
  dest: '/css',
  indentedSyntax: false, //impacts scss/sass
  sourceMap: true,
  debug: true,
  root: path.join(__dirname, 'public'),
}));
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', routes);
server.use('/users', users);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: err.status + " An Error has Occured",
    });
  });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: err.status + " An Error has Occured",
  });
});


module.exports = server;
