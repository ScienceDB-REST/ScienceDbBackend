'use strict';
module.exports = function(sequelize, DataTypes) {
  var field_plot = sequelize.define('field_plot', {
    field_name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    location_code: DataTypes.STRING,
    soil_treatment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return field_plot;
};
