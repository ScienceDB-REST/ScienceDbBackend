'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

module.exports = function(sequelize, DataTypes) {
  var microbiome_otu = sequelize.define('microbiome_otu', {
    otu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
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
    },
    sample_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      }
    },
    experiment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    kingdom: {
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
    },
    reference_sequence: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        microbiome_otu.belongsTo(models.taxon, {
          foreignKey: 'taxon_id',
          targetKey: 'id',
          as: 'taxon'
        })
        microbiome_otu.belongsTo(models.sample, {
          foreignKey: 'sample_id',
          targetKey: 'id',
          as: 'sample'
        })
      }
    }
  });
  return microbiome_otu;
};
