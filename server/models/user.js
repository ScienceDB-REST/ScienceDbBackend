'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activationKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Role, {
          through: 'User2Role',
          onDelete: 'cascade'
        })
      }
    }
  });
  return User;
};
