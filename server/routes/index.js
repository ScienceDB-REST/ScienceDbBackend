// Required packages:
// - Some are _not_ defined as local variables in order to enable required
// files to use these imports:
express = require('express');
router = express.Router();
helper = require(__dirname + '/helper.js');
tmp = require('tmp');
Promise = require('bluebird');
passport = require('passport');
objectAssign = require('object-assign');
var glob = require('glob'),
    path = require('path');


// Base Route:
router.get('/', function(req, res, next) {
    res.json('Express is responding to route "/".');
});


// Include model specific routes:
glob.sync(__dirname + '/*_routes.js').forEach(function(file) {
    console.log('Requiring model specific routes from \'%s\'', file);
    require(path.resolve(file));
});


// Exports:
module.exports = router;
