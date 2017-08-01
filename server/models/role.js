'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, {
          through: 'User2Role',
          onDelete: 'cascade'
        })
      }
    }
  });
  return Role;
};
