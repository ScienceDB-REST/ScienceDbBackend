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
        taxon.belongsTo(models.sample, {
          foreignKey: 'sample_id',
          targetKey: 'id'
        })
      }
    }
  });
  return sample_measurement;
};
