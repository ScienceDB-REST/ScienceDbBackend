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
        sample.belongsTo(models.sample, {
          foreignKey: 'parent_id',
          targetKey: 'id',
          as: 'parent'
        })
        sample.belongsTo(models.pot, {
          foreignKey: 'pot_id',
          targetKey: 'id',
          as: 'pot'
        })
        sample.belongsTo(models.field_plot, {
          foreignKey: 'field_plot_id',
          targetKey: 'id',
          as: 'field_plot'
        })
        sample.belongsTo(models.individual, {
          foreignKey: 'individual_id',
          targetKey: 'id',
          as: 'individual'
        })
      }
    }
  });
  return sample;
};
