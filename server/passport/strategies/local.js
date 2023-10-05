const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email', // 클라이언트에서 보내는 유저 ID 필드명
    passwordField: 'password' // 클라이언트에서 보내는 비밀번호 필드명
  },
  async (useremail, password, done) => {
    try {
        // console.log("hi");
        const user = await User.findOne({ email : useremail });
        // console.log(user);
        // console.log(typeof user, user);

        const plainUser = user.toObject(); // 또는 user.toJSON();
        // console.log(plainUser.email);
        // console.log(plainUser.password);
        
        if (!user) {
        console.log("adf");
        return done(null, false, { message: 'Incorrect email.' });
        }
        const hashedPassword = plainUser.password;

        const passwordMatch = await bcrypt.compare(password, hashedPassword); 
        if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
        }
        const dto = {
            email: plainUser.email,
            password: plainUser.password
        }
        return done(null, dto);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
