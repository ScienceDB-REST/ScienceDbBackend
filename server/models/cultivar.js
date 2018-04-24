'use strict';
module.exports = function(sequelize, DataTypes) {
  var cultivar = sequelize.define('cultivar', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
      validate: {
        isNumeric: true
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
