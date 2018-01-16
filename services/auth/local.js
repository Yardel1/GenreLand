const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../../models/users');
const authHelpers = require('./auth-helper');

const options = {};

init();

passport.use(
  new LocalStrategy(options, async (username, password, done) => {
    try {
      const user = await User.findByUserName(username)
      console.log('initial:', user)
      if (!user) return done(null, false);
      if (!authHelpers.comparePass(password, user.password_digest)) return done(null, false);
      console.log('got em:', user)
      return done(null, user);
  }
  catch(err) {
        console.log(err);
        return done(err);
      };
  })
);

module.exports = passport;