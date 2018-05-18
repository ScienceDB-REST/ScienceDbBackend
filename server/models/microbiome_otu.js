'use strict';
module.exports = function(sequelize, DataTypes) {
  var microbiome_otu = sequelize.define('microbiome_otu', {
    otu_id: {
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
    },
    sample_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
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
        isNumeric: true,
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
      validate: {
        isNumeric: true
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    reference_sequence: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        microbiome_otu.belongsTo(models.taxon, {
          foreignKey: 'taxon_id',
          targetKey: 'id',
          as: 'taxon'
        })
        microbiome_otu.belongsTo(models.microbiome_otu, {
          foreignKey: 'parent_id',
          targetKey: 'id',
          as: 'parent'
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
