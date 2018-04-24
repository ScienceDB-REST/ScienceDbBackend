'use strict';
module.exports = function(sequelize, DataTypes) {
  var taxon = sequelize.define('taxon', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    taxonomic_level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        taxon.belongsTo(models.taxon, {
          foreignKey: 'parent_id',
          targetKey: 'id',
          as: 'parent'
        })
      }
    }
  });
  return taxon;
};
