// https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314

const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, cb) {
    console.log(`authenticating with email: ${email}`);
    //Assume there is a DB module pproviding a global UserModel
    return models.User.findOne({
        where: {
          email: email
        }
      })
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: `No User found with email '${email}'.`
          });
        }

        return user.authenticate(password, cb);
      })
      .catch(err => {
        console.log(`ERROR in log-in: ${err}`);
        return cb(err);
      });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',
    ignoreExpiration: false
  },
  function(jwtPayload, cb) {
    console.log(`Payload received: ${JSON.stringify(jwtPayload)}`);
    //find the user in db if needed
    return models.User.findById(jwtPayload.id)
      .then(user => {
        console.log(
          `User found for ID in payload: ${JSON.stringify(user)}`);
        return cb(null, user);
      })
      .catch(err => {
        console.log(`Payload received but error: ${err}`);
        return cb(err);
      });
  }
));

module.exports = passport;
