'use strict';

const fkValidate = require('../SequelizeForeignKeyValidator.js')

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
      allowNull: false,
      validate: {
        async fkVal(value) {
          await fkValidate(value, models.cultivar)
        }
      }
    },
    field_plot_id: {
      type: DataTypes.INTEGER,
      validate: {
        async fkVal(value) {
          await fkValidate(value, models.field_plot)
        }
      }
    },
    pot_id: {
      type: DataTypes.INTEGER,
      validate: {
        async fkVal(value) {
          await fkValidate(value, models.pot)
        }
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
