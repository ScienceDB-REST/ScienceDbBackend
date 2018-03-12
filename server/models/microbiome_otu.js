'use strict';
module.exports = function(sequelize, DataTypes) {
  var microbiome_otu = sequelize.define('microbiome_otu', {
    reference_sequence_id: DataTypes.INTEGER,
    otu_id: DataTypes.STRING,
    sample_id: DataTypes.INTEGER,
    sample_desc: DataTypes.STRING,
    count: DataTypes.INTEGER,
    experiment: DataTypes.STRING,
    version: DataTypes.INTEGER,
    kingdom: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return microbiome_otu;
};