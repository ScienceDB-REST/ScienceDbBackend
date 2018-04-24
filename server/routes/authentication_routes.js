// https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314

router.post('/login', function(req, res, next) {

  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message
      });
    }

    // Tell ACL which roles the logged in User has:
    user.getRoles().then(function(r) {
      roleNames = r.map(function(i) {
        return i.name
      })
      acl.addUserRoles(req.user.id, roleNames, function(err) {
        if (err) {
          res.json(err)
        }
        console.log("Added User-Roles " + roleNames +
          " to User-ID " +
          req.user.id)
      })
    })

    req.login(user, {
      session: false
    }, (err) => {
      if (err) {
        res.json(err);
      }

      // generate a signed son web token with the contents of user object and
      // return it in the response
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
      return res.json({
        user,
        token
      });
    });
  })(req, res);
});


// REGISTRATION currently not implemented.
//
//router.post('/register', function(req, res) {
//  console.log(req.body);
//  models.User.register(models.User.build({
//    email: req.body.email,
//    name: req.body.name
//  }), req.body.password, function(err, user) {
//    if (err) {
//      console.log("Error in REGISTRATION!\n" + err);
//      res.json(err);
//    }
//    console.log("Created a new User:\m" + user);
//    passport.authenticate('local')(req, res, function() {
//      res.json(user);
//    });
//  });
//});
