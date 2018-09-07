module.exports.registerAclRules = function(user) {
  user.getRoles().then(function(r) {
    roleNames = r.map(function(i) {
      return i.name
    })
    acl.addUserRoles(user.id, roleNames, function(err) {
      if (err) {
        console.error(
          'There was an error adding User-Roles to ACL\n', err);
        return;
      }
      console.log("Added User-Roles " + roleNames + " to User-ID " +
        user.id)
    })
  })
}
