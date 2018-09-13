'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var sample_measurement = sequelize.define('sample_measurement', {
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
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    is_average: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        sample_measurement.belongsToMany(models.sample, {
          through: 'sample_to_sample_measurements',
          foreignKey: 'sample_measurement_id',
          otherKey: 'sample_id'
        })
      }
    }
  });
  return sample_measurement;
};
