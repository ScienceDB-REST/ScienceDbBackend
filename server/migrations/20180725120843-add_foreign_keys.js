'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    //    queryInterface.addConstraint('cultivars', ['taxon_id'], {
    //      type: 'foreign key',
    //      name: 'cultivars_taxon_id_fk',
    //      references: {
    //        table: 'taxons',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('individuals', ['cultivar_id'], {
    //      type: 'foreign key',
    //      name: 'individuals_cultivar_id_fk',
    //      references: {
    //        table: 'cultivars',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('individuals', ['field_plot_id'], {
    //      type: 'foreign key',
    //      name: 'individuals_field_plot_id_fk',
    //      references: {
    //        table: 'field_plots',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('individuals', ['pot_id'], {
    //      type: 'foreign key',
    //      name: 'individuals_pot_id_fk',
    //      references: {
    //        table: 'pots',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('sample_to_metabolite_measurements', [
    //      'metabolite_measurement_id'
    //    ], {
    //      type: 'foreign key',
    //      name: 'sample_to_metabolite_measurements_metabolite_measurement_id_fk',
    //      references: {
    //        table: 'metabolite_measurements',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('sample_to_metabolite_measurements', [
    //      'sample_id'
    //    ], {
    //      type: 'foreign key',
    //      name: 'sample_to_metabolite_measurements_sample_id_fk',
    //      references: {
    //        table: 'samples',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('microbiome_otus', ['sample_id'], {
    //      type: 'foreign key',
    //      name: 'microbiome_otus_sample_id_fk',
    //      references: {
    //        table: 'samples',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('microbiome_otus', ['taxon_id'], {
    //      type: 'foreign key',
    //      name: 'microbiome_otus_taxon_id_fk',
    //      references: {
    //        table: 'taxons',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('microbiome_otus', ['parent_id'], {
    //      type: 'foreign key',
    //      name: 'microbiome_otus_parent_id_fk',
    //      references: {
    //        table: 'microbiome_otus',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('plant_measurements', ['individual_id'], {
    //      type: 'foreign key',
    //      name: 'plant_measurements_individual_id_fk',
    //      references: {
    //        table: 'individuals',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('samples', ['individual_id'], {
    //      type: 'foreign key',
    //      name: 'samples_individual_id_fk',
    //      references: {
    //        table: 'individuals',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('samples', ['field_plot_id'], {
    //      type: 'foreign key',
    //      name: 'samples_field_plot_id_fk',
    //      references: {
    //        table: 'field_plots',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('samples', ['pot_id'], {
    //      type: 'foreign key',
    //      name: 'samples_pot_id_fk',
    //      references: {
    //        table: 'pots',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('samples', ['parent_id'], {
    //      type: 'foreign key',
    //      name: 'samples_parent_id_fk',
    //      references: {
    //        table: 'samples',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
    //
    //    queryInterface.addConstraint('taxons', ['parent_id'], {
    //      type: 'foreign key',
    //      name: 'taxons_parent_id_fk',
    //      references: {
    //        table: 'taxons',
    //        field: 'id'
    //      },
    //      onDelete: 'cascade',
    //      onUpdate: 'cascade'
    //    });
  },

  down: function(queryInterface, Sequelize) {
    //    queryInterface.removeConstraint('cultivars', 'cultivars_taxon_id_fk');
    //    queryInterface.removeConstraint('individuals',
    //      'individuals_cultivar_id_fk');
    //    queryInterface.removeConstraint('individuals',
    //      'individuals_field_plot_id_fk');
    //    queryInterface.removeConstraint('individuals', 'individuals_pot_id_fk');
    //    queryInterface.removeConstraint('sample_to_metabolite_measurements',
    //      'sample_to_metabolite_measurements_metabolite_measurement_id_fk');
    //    queryInterface.removeConstraint('sample_to_metabolite_measurements',
    //      'sample_to_metabolite_measurements_sample_id_fk');
    //    queryInterface.removeConstraint('microbiome_otus',
    //      'microbiome_otus_sample_id_fk');
    //    queryInterface.removeConstraint('microbiome_otus',
    //      'microbiome_otus_taxon_id_fk');
    //    queryInterface.removeConstraint('microbiome_otus',
    //      'microbiome_otus_parent_id_fk');
    //    queryInterface.removeConstraint('plant_measurements',
    //      'plant_measurements_individual_id_fk');
    //    queryInterface.removeConstraint('samples', 'samples_individual_id_fk');
    //    queryInterface.removeConstraint('samples', 'samples_field_plot_id_fk');
    //    queryInterface.removeConstraint('samples', 'samples_pot_id_fk');
    //    queryInterface.removeConstraint('samples', 'samples_parent_id_fk');
    //    queryInterface.removeConstraint('taxons', 'taxons_parent_id_fk');
  }
};
