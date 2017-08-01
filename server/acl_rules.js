module.exports = {
  aclRules: [{
    roles: 'administrator',
    allows: [{
      resources: ['/users', '/user'],
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
