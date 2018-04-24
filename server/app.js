// *** main dependencies *** //
var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var cors = require('cors');
var fs = require('fs');
var acl = require('acl');
var passport = require('./passport.js')
jwt = require('jsonwebtoken');
csv = require('express-csv');
models = require('./models/index');


// Set up authentication:
require('./passport.js')


// ACL rules:
global.acl = new acl(new acl.memoryBackend());
global.acl.allow(require(path.join(__dirname, 'acl_rules.js')).aclRules);


// *** routes *** //
var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));

// Add headers and authentication:
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type,authorization,Authorization,accept,Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('withCredentials', true);


  // Authenticate, if not login, home, or OPTIONS:
  if (req.url !== '' && req.url !== '/login' && req.method !== 'OPTIONS') {
    console.log(`URL is needing auth`);
    console.log(`Headers are:\n${JSON.stringify(req.headers)}`);
    // Generate middleware function from passport and invoke it:
    passport.authenticate('jwt', {
      session: false
    })(req, res, next);
  } else {
    console.log(`req.method -> ${req.method}`);
    // Pass to next layer of middleware
    next();
  }
});

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../client')));
app.use(fileUpload());

// *** main routes *** //
app.use('/', routes);


// *** enable ALL CORS requests *** //
//app.use(cors());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("ERROR Joische Ben:\n" + JSON.stringify(err));
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({message: (err.message || err)});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("ERROR: " + err);
  res.status(err.status || 500);
  res.json(err);
});


module.exports = app;
