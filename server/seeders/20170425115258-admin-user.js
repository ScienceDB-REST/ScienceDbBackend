'use strict';
var path = require('path')
var models = require(path.join(__dirname, '..', 'models', 'index.js'))
var Promise = require('bluebird')

module.exports = {
  up: function(queryInterface, Sequelize) {
    return models.Role.findAll().then(function(r) {
      return new Promise(function(resolve, reject) {
        models.User.register(models.User.build({
          email: 'asis.hallab@gmail.com',
          name: 'Asis Hallab'
        }), 'admin', function(err, user) {
          if (err) {
            console.log("Error in REGISTRATION!\n" + err);
          }
          console.log("Created a new Admin-User. ID = " + user.id);
          return r.map(function(i) {
            return models.User2Role.create({
              UserId: user.id,
              RoleId: i.id
            })
          })
        })
      })
    })
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.bulkDelete('User2Roles', null, {});
    return queryInterface.bulkDelete('Users', null, {});
  }
};
