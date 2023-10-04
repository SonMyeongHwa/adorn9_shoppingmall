const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/schemas/user');

passport.use(new LocalStrategy({
    usernameField: 'UserId', // 클라이언트에서 보내는 유저 ID 필드명
    passwordField: 'UserPassword' // 클라이언트에서 보내는 비밀번호 필드명
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ UserId: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.UserPassword !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
