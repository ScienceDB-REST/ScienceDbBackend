'use strict';
module.exports = function(sequelize, DataTypes) {
  var sample = sequelize.define('sample', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    life_cycle_phase: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    barcode_tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    harvest_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
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
    },
    parent_id: {
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
  return sample;
};
