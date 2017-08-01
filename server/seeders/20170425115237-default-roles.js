'use strict';
var path = require('path')
var models = require(path.join(__dirname, '..', 'models', 'index.js'))
var Promise = require('bluebird')

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      models.Role.create({
        name: 'guest',
        description: 'The most basic Role allowing read access, but nothing more.'
      }),
      models.Role.create({
        name: 'scientist',
        description: 'A scientist may create, update, and delete data, that is NOT associated with Users nor Roles.'
      }),
      models.Role.create({
        name: 'administrator',
        description: 'A administrator may create, update, and delete even Users and their Roles. He/she should have all possible ownable rights.'
      })
    ]).then(function(x) {
      console.log("Created default User-Roles.")
      return x
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
