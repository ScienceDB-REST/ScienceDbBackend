'use strict';
module.exports = function(sequelize, DataTypes) {
  var metabolite_measurement = sequelize.define('metabolite_measurement', {
    metabolite: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    unit: DataTypes.STRING,
    is_average: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        metabolite_measurement.belongsToMany(models.sample, {
          through: 'sample_to_metabolite_measurements',
          foreignKey: 'metabolite_measurement_id',
          otherKey: 'sample_id'
        });
      }
    }
  });
  return metabolite_measurement;
};
