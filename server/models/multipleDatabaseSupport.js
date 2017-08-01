var Sequelize = require('sequelize');

module.exports.initSequelize = function(config, multDbConfig) {
  var sequelizeInstances = {
    'mappings': []
  }
  // the default:
  sequelizeInstances['default'] = new Sequelize(config)
  Object.keys(multDbConfig).filter(function(k) {
    if (k != 'mappings') {
      sequelizeInstances[k] = new Sequelize(multDbConfig[k])
    } else {
      sequelizeInstances[k] = multDbConfig[k]
    }
  })
  return sequelizeInstances;
}
