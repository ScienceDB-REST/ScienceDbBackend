'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config.json')[env];
var multDbConfig = require(__dirname + '/../multDbConfig.json')[env];
var si = require(path.resolve(__dirname, 'multipleDatabaseSupport.js'));
var passportLocalSequelize = require('passport-local-sequelize');
var passport = require('passport');
var db = {};

// Enable multiple databases with Sequelize:
if (config.use_env_variable) {
    var sequelize = si.initSequelize(process.env[config.use_env_variable], multDbConfig);
} else {
    var sequelize = si.initSequelize(config, multDbConfig);
}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file !== 'multipleDatabaseSupport.js');
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        console.log('DEBUG: Model-File "' + file + '" uses Sequelize-Instance ' + (sequelize.mappings[file] || 'default'));
        var sequelizeInstance = sequelize[sequelize.mappings[file]] || sequelize.default;
        var model = sequelizeInstance['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// Enable Authentication with passport-local-sequelize:
passportLocalSequelize.attachToUser(db.User, {
  usernameField: 'email',
  hashField: 'hash',
  saltField: 'salt'
});
passport.use(db.User.createStrategy());
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


module.exports = db;
