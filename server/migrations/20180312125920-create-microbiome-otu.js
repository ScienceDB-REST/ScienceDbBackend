'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('microbiome_otus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference_sequence: {
        type: Sequelize.TEXT
      },
      otu_id: {
        type: Sequelize.STRING
      },
      sample_id: {
        type: Sequelize.INTEGER
      },
      taxon_id: {
        type: Sequelize.INTEGER
      },
      sample_desc: {
        type: Sequelize.TEXT
      },
      count: {
        type: Sequelize.INTEGER
      },
      experiment: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.INTEGER
      },
      kingdom: {
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
    return queryInterface.dropTable('microbiome_otus');
  }
};
