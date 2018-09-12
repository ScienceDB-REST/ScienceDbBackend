'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return [
      queryInterface.sequelize.query(
        "ALTER TABLE cultivars ADD CONSTRAINT cultivars_taxon_id_fk FOREIGN KEY (taxon_id) REFERENCES taxons(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE individuals ADD CONSTRAINT individuals_cultivar_id_fk FOREIGN KEY (cultivar_id) REFERENCES cultivars(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE individuals ADD CONSTRAINT individuals_field_plot_id_fk FOREIGN KEY (field_plot_id) REFERENCES field_plots(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE individuals ADD CONSTRAINT individuals_pot_id_fk FOREIGN KEY (pot_id) REFERENCES pots(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE sample_to_sample_measurements ADD CONSTRAINT microbiome_otus_sample_id_fk FOREIGN KEY (sample_id) REFERENCES samples(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE microbiome_otus ADD CONSTRAINT microbiome_otus_sample_id_fk FOREIGN KEY (sample_id) REFERENCES samples(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE microbiome_otus ADD CONSTRAINT microbiome_otus_taxon_id_fk FOREIGN KEY (taxon_id) REFERENCES taxons(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE plant_measurements ADD CONSTRAINT plant_measurements_individual_id_fk FOREIGN KEY (individual_id) REFERENCES individuals(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE samples ADD CONSTRAINT samples_individual_id_fk FOREIGN KEY (individual_id) REFERENCES individuals(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE samples ADD CONSTRAINT samples_field_plot_id_fk FOREIGN KEY (field_plot_id) REFERENCES field_plots(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE samples ADD CONSTRAINT samples_pot_id_fk FOREIGN KEY (pot_id) REFERENCES pots(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE samples ADD CONSTRAINT samples_parent_id_fk FOREIGN KEY (parent_id) REFERENCES samples(id)"
      ),
      queryInterface.sequelize.query(
        "ALTER TABLE taxons ADD CONSTRAINT taxons_parent_id_fk FOREIGN KEY (parent_id) REFERENCES taxons(id)"
      )
    ]
  },

  down: function(queryInterface, Sequelize) {
    return [
      queryInterface.removeConstraint('cultivars',
        'cultivars_taxon_id_fk'),
      queryInterface.removeConstraint('individuals',
        'individuals_cultivar_id_fk'),
      queryInterface.removeConstraint('individuals',
        'individuals_field_plot_id_fk'),
      queryInterface.removeConstraint('individuals',
        'individuals_pot_id_fk'),
      queryInterface.removeConstraint('sample_to_sample_measurements',
        'sample_to_sample_measurements_sample_measurement_id_fk'),
      queryInterface.removeConstraint('sample_to_sample_measurements',
        'sample_to_sample_measurements_sample_id_fk'),
      queryInterface.removeConstraint('microbiome_otus',
        'microbiome_otus_sample_id_fk'),
      queryInterface.removeConstraint('microbiome_otus',
        'microbiome_otus_taxon_id_fk'),
      queryInterface.removeConstraint('microbiome_otus',
        'microbiome_otus_parent_id_fk'),
      queryInterface.removeConstraint('plant_measurements',
        'plant_measurements_individual_id_fk'),
      queryInterface.removeConstraint('samples',
        'samples_individual_id_fk'),
      queryInterface.removeConstraint('samples',
        'samples_field_plot_id_fk'),
      queryInterface.removeConstraint('samples', 'samples_pot_id_fk'),
      queryInterface.removeConstraint('samples', 'samples_parent_id_fk'),
      queryInterface.removeConstraint('taxons', 'taxons_parent_id_fk')
    ]
  }
};
