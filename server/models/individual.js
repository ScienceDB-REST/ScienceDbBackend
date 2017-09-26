'use strict';
module.exports = function(sequelize, DataTypes) {
  var individual = sequelize.define('individual', {
    name: DataTypes.STRING,
    sowing_date: DataTypes.DATE,
    harvest_date: DataTypes.DATE,
    cultivar_id: DataTypes.INTEGER,
    field_plot_id: DataTypes.INTEGER,
    pot_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        individual.belongsTo(models.cultivar, {foreignKey: 'cultivar_id', targetKey: 'id'});
        individual.belongsTo(models.field_plot, {foreignKey: 'field_plot_id', targetKey: 'id'});
        individual.belongsTo(models.pot, {foreignKey: 'pot_id', targetKey: 'id'});
      }
    }
  });
  return individual;
};
