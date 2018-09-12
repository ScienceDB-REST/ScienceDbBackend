'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var cultivar = sequelize.define('cultivar', {
    description: {
      type: DataTypes.STRING
    },
    genotype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    taxon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async fkVal(value) {
          await fkValidate(value, models.taxon)
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        cultivar.belongsTo(models.taxon, {
          foreignKey: 'taxon_id',
          targetKey: 'id'
        })
      }
    }
  });
  return cultivar;
};
