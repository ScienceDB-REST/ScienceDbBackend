'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sample_to_metabolite_measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      metabolite_measurement_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'metabolite_measurements',
          key: 'id'
        },
        allowNull: false
      },
      sample_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'samples',
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable('sample_to_metabolite_measurements');
  }
};