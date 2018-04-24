'use strict';
module.exports = function(sequelize, DataTypes) {
  var microbiome_sample = sequelize.define('microbiome_sample', {
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    life_cycle_phas: DataTypes.STRING,
    barcode_tag: DataTypes.STRING,
    description: DataTypes.STRING,
    harvest_date: DataTypes.DATE,
    individual_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    field_plot_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    pot_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        microbiome_sample.belongsTo(models.individual, {
          foreignKey: 'individual_id',
          targetKey: 'id'
        });
        microbiome_sample.belongsTo(models.field_plot, {
          foreignKey: 'field_plot_id',
          targetKey: 'id'
        });
        microbiome_sample.belongsTo(models.pot, {
          foreignKey: 'pot_id',
          targetKey: 'id'
        });
      }
    }
  });
  return microbiome_sample;
};
