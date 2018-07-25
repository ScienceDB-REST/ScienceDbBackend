'use strict';
module.exports = function(sequelize, DataTypes) {
  var metabolite_measurement = sequelize.define('metabolite_measurement', {
    metabolite: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      }
    },
    is_average: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        metabolite_measurement.belongsToMany(models.sample, {
          through: 'sample_to_metabolite_measurements',
          foreignKey: 'metabolite_measurement_id',
          otherKey: 'sample_id'
        });
      }
    }
  });
  return metabolite_measurement;
};
