'use strict';
module.exports = function(sequelize, DataTypes) {
  var soil_sample = sequelize.define('soil_sample', {
    name: DataTypes.STRING,
    harvest_date: DataTypes.DATE,
    field_plot_id: DataTypes.INTEGER,
    pot_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        soil_sample.belongsTo(models.field_plot, {foreignKey: 'field_plot_id', targetKey: 'id'});
        soil_sample.belongsTo(models.pot, {foreignKey: 'pot_id', targetKey: 'id'});
      }
    }
  });
  return soil_sample;
};
