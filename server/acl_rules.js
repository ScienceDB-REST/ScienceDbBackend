module.exports = {
  aclRules: [{
    roles: 'administrator',
    allows: [{
      resources: ['/cultivars', '/cultivar', '/field_plots',
        '/field_plot', '/indexs', '/index', '/individuals',
        '/metabolite_measurements', '/metabolite_measurement',
        '/microbiome_otus', '/microbiome_profiles',
        '/microbiome_profile', '/microbiome_samples',
        '/microbiome_sample', '/pots', '/pot',
        '/reference_sequences', '/reference_sequence', '/roles',
        '/samples', '/sample', '/sample_to_metabolite_measurements',
        '/soil_samples', '/soil_sample', '/taxons', '/taxon',
        '/user2roles', '/user2role', '/users', '/user'
      ],
      permissions: '*'
    }]
  }, {
    roles: 'scientist',
    allows: [{
      resources: ['/animal', '/animals'],
      permissions: ['post', 'put', 'delete']
    }]
  }, {
    roles: 'guest',
    allows: [{
      resources: ['/animal', '/animals'],
      permissions: 'get'
    }]
  }]
}
