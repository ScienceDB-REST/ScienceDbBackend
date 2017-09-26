'use strict';
module.exports = function(sequelize, DataTypes) {
  var microbiome_profile = sequelize.define('microbiome_profile', {
    microbiome_sample_id: DataTypes.INTEGER,
    taxon_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        microbiome_profile.belongsTo(models.microbiome_sample, {foreignKey: 'microbiome_sample_id', targetKey: 'id'});
        microbiome_profile.belongsTo(models.taxon, {foreignKey: 'taxon_id', targetKey: 'id'});
      }
    }
  });
  return microbiome_profile;
};
