'use strict';
module.exports = function(sequelize, DataTypes) {
  var individual = sequelize.define('individual', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sowing_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    harvest_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    cultivar_id: {
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
        individual.belongsTo(models.cultivar, {
          foreignKey: 'cultivar_id',
          targetKey: 'id'
        });
        individual.belongsTo(models.field_plot, {
          foreignKey: 'field_plot_id',
          targetKey: 'id'
        });
        individual.belongsTo(models.pot, {
          foreignKey: 'pot_id',
          targetKey: 'id'
        });
      }
    }
  });
  return individual;
};
