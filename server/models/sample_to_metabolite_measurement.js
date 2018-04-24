'use strict';
module.exports = function(sequelize, DataTypes) {
  var sample_to_metabolite_measurement = sequelize.define(
    'sample_to_metabolite_measurement', {
      metabolite_measurement_id: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        }
      },
      sample_id: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        }
      }
    }, {
      classMethods: {
        associate: function(models) {
          sample_to_metabolite_measurement.belongsTo(models.sample, {
            foreignKey: 'sample_id',
            targetKey: 'id'
          });
          sample_to_metabolite_measurement.belongsTo(models.metabolite_measurement, {
            foreignKey: 'metabolite_measurement_id',
            targetKey: 'id'
          });
        }
      }
    });
  return sample_to_metabolite_measurement;
};
