'use strict';
module.exports = function(sequelize, DataTypes) {
  var sample_to_sample_measurement = sequelize.define('sample_to_sample_measurement', {
    sample_measurement_id: DataTypes.INTEGER,
    sample_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sample_to_sample_measurement;
};