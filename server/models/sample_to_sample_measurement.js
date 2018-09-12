'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var sample_to_sample_measurement = sequelize.define(
    'sample_to_sample_measurement', {
      sample_measurement_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          async fkVal(value) {
            await fkValidate(value, models.sample_measurement)
          }
        }
      },
      sample_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          async fkVal(value) {
            await fkValidate(value, models.sample)
          }
        }
      }
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    });
  return sample_to_sample_measurement;
};
