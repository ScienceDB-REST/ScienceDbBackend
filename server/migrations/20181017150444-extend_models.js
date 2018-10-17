'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('individuals', 'developmental_state',
        Sequelize.STRING),
      queryInterface.addColumn('individuals', 'life_cycle_phase',
        Sequelize.STRING),
      queryInterface.addColumn('individuals', 'location_type', Sequelize.STRING),
      queryInterface.addColumn('sample_measurements', 'CAS_number',
        Sequelize.STRING)
    ]
  },

  down: function(queryInterface, Sequelize) {
    return [queryInterface.removeColumn('individuals',
        'developmental_state'),
      queryInterface.removeColumn('individuals', 'life_cycle_phase'),
      queryInterface.removeColumn('individuals', 'location_type'),
      queryInterface.removeColumn('sample_measurements', 'CAS_number')
    ]
  }
};
