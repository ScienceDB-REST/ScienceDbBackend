'use strict';
module.exports = function(sequelize, DataTypes) {
  var reference_sequence = sequelize.define('reference_sequence', {
    sequence: DataTypes.STRING,
    taxon_id: DataTypes.INTEGER,
    microbiome_otu_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return reference_sequence;
};