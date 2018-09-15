'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var transcript_count = sequelize.define('transcript_count', {
    gene: {
      type: DataTypes.STRING,
      allowNull: false
    },
    variable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    tissue_or_condition: {
      type: DataTypes.STRING,
      allowNull: false
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
        transcript_count.belongsTo(models.individual, {
          foreignKey: 'individual_id',
          targetKey: 'id',
          as: 'individual'
        })
      }
    }
  });
  return transcript_count;
};
