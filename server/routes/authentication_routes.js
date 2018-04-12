router.post('/login', passport.authenticate('local'), function(req, res) {
  // Tell ACL which roles the logged in User has:
  req.user.getRoles().then(function(r) {
    roleNames = r.map(function(i) {
      return i.name
    })
    acl.addUserRoles(req.user.id, roleNames, function(err) {
      if (err) console.log(err)
      console.log("Added User-Roles " + roleNames + " to User-ID " +
        req.user.id)
    })
  })
  // DONE:
  res.redirect('/');
});

router.post('/register', function(req, res) {
  console.log(req.body);
  models.User.register(models.User.build({
    email: req.body.email,
    name: req.body.name
  }), req.body.password, function(err, user) {
    if (err) {
      console.log("Error in REGISTRATION!\n" + err);
      res.json(err);
    }
    console.log("Created a new User:\m" + user);
    passport.authenticate('local')(req, res, function() {
      res.json(user);
    });
  });
});
