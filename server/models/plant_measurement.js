'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var plant_measurement = sequelize.define('plant_measurement', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    variable: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    value: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    individual_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async fkVal(value) {
          await fkValidate(value, models.individual)
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        plant_measurement.belongsTo(models.individual, {
          foreignKey: 'individual_id',
          targetKey: 'id',
          as: 'individual'
        })
      }
    }
  });
  return plant_measurement;
};
