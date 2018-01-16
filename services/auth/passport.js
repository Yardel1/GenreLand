const passport = require('passport');
const User = require('../../models/users');

module.exports = () => {
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser(async (username, done) => {
    try {
      const user = await User.findByUserName(username)
      done(null, user);
    }
    catch (err) { done(err, null) };
  })
};