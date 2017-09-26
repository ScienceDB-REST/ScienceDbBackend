'use strict';
module.exports = function(sequelize, DataTypes) {
  var pot = sequelize.define('pot', {
    pot: DataTypes.STRING,
    greenhouse: DataTypes.STRING,
    climate_chamber: DataTypes.STRING,
    conditions: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return pot;
};