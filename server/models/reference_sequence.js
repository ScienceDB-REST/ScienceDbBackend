'use strict';
module.exports = function(sequelize, DataTypes) {
  var reference_sequence = sequelize.define('reference_sequence', {
    sequence: {
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
    microbiome_otu_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return reference_sequence;
};
