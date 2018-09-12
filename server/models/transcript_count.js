'use strict';
module.exports = function(sequelize, DataTypes) {
  var transcript_count = sequelize.define('transcript_count', {
    gene: {
      type: DataTypes.STRING,
      allowNull: false
    },
    variable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    tissue_or_condition: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return transcript_count;
};
