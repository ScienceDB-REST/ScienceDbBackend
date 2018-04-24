'use strict';
module.exports = function(sequelize, DataTypes) {
  var microbiome_otu = sequelize.define('microbiome_otu', {
    reference_sequence_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return microbiome_otu;
};
