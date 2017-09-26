'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('field_plots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      field_name: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      location_code: {
        type: Sequelize.STRING
      },
      soil_treatment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('field_plots');
  }
};