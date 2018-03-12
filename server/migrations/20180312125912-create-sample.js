'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('samples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      life_cycle_phase: {
        type: Sequelize.STRING
      },
      barcode_tag: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      harvest_date: {
        type: Sequelize.DATE
      },
      individual_id: {
        type: Sequelize.INTEGER
      },
      field_plot_id: {
        type: Sequelize.INTEGER
      },
      pot_id: {
        type: Sequelize.INTEGER
      },
      parent_id: {
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
    return queryInterface.dropTable('samples');
  }
};