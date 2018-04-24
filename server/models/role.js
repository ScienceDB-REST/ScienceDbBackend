'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
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
