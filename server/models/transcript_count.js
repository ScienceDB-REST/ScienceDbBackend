'use strict';
module.exports = function(sequelize, DataTypes) {
  var transcript_count = sequelize.define('transcript_count', {
    gene: DataTypes.STRING,
    variable: DataTypes.STRING,
    count: DataTypes.NUMERIC,
    tissue_or_condition: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return transcript_count;
};