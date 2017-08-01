'use strict';
module.exports = function(sequelize, DataTypes) {
  var User2Role = sequelize.define('User2Role', {
    UserId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER
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
