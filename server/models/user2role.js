'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var User2Role = sequelize.define('User2Role', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User2Role.belongsTo(models.User);
        User2Role.belongsTo(models.Role);
      }
    }
  });
  return User2Role;
};
