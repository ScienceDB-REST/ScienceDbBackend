'use strict';
module.exports = function(sequelize, DataTypes) {
  var cultivar = sequelize.define('cultivar', {
    description: DataTypes.STRING,
    genotype: DataTypes.STRING,
    taxon_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        cultivar.belongsTo(models.taxon, {foreignKey: 'taxon_id', targetKey: 'id'})
      }
    }
  });
  return cultivar;
};
