'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query(
        'CREATE INDEX transcript_counts_gene_idx ON transcript_counts (gene)'
      ),
      queryInterface.sequelize.query(
        'CREATE INDEX transcript_counts_tissue_or_condition_idx ON transcript_counts (tissue_or_condition)'
      ),
      queryInterface.sequelize.query(
        'CREATE INDEX transcript_counts_individual_id_idx ON transcript_counts (individual_id)'
      )
    ]
  },

  down: function(queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query(
        'DROP INDEX transcript_counts_gene_idx'),
      queryInterface.sequelize.query(
        'DROP INDEX transcript_counts_tissue_or_condition_idx'),
      queryInterface.sequelize.query(
        'DROP INDEX transcript_counts_individual_id_idx')
    ]
  }
};
