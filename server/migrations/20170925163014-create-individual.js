'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('individuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sowing_date: {
        type: Sequelize.DATE
      },
      harvest_date: {
        type: Sequelize.DATE
      },
      cultivar_id: {
        type: Sequelize.INTEGER
      },
      field_plot_id: {
        type: Sequelize.INTEGER
      },
      pot_id: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('individuals');
  }
};