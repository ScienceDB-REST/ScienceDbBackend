'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      queryInterface.dropTable('sample_measurements'),
      queryInterface.renameTable('sample_to_metabolite_measurements',
        'sample_to_sample_measurements'),
      queryInterface.renameColumn('sample_to_sample_measurements',
        'metabolite_measurement_id', 'sample_measurement_id')
    ]
  },

  down: function(queryInterface, Sequelize) {
    return [
      queryInterface.createTable('sample_measurements', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        metabolite: {
          type: Sequelize.STRING
        },
        amount: {
          type: Sequelize.DOUBLE
        },
        unit: {
          type: Sequelize.STRING
        },
        is_average: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.renameTable('sample_to_sample_measurements',
        'sample_to_metabolite_measurements'),
      queryInterface.renameColumn('sample_to_metabolite_measurements',
        'sample_measurement_id', 'metabolite_measurement_id')
    ]
  }
};
