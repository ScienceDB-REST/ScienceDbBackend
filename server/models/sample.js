'use strict';
module.exports = function(sequelize, DataTypes) {
  var sample = sequelize.define('sample', {
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    life_cycle_phase: DataTypes.STRING,
    barcode_tag: DataTypes.STRING,
    description: DataTypes.STRING,
    harvest_date: DataTypes.DATE,
    individual_id: DataTypes.INTEGER,
    field_plot_id: DataTypes.INTEGER,
    pot_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sample;
};