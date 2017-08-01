// Required packages:
// - Some are _not_ defined as local variables in order to enable required
// files to use these imports:
express = require('express');
models = require('../models/index');
router = express.Router();
helper = require(__dirname + '/helper.js');
tmp = require('tmp');
Promise = require('bluebird');
passport = require('passport');
var glob = require('glob'),
    path = require('path');


// Base Route:
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


// Include model specific routes:
glob.sync(__dirname + '/*_routes.js').forEach(function(file) {
    console.log('Requiring model specific routes from \'%s\'', file);
    require(path.resolve(file));
});


// Exports:
module.exports = router;
