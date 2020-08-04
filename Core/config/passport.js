const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var Auth0Strategy = require('passport-auth0');

const Users = mongoose.model('users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));


// Configure Passport to use Auth0
// var strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     session:false,
//     state: false,
//     callbackURL:
//       process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/home'
//   },
//   function (accessToken, refreshToken, extraParams, profile, done) {
//     console.log('orifke',profile)
//     return done(null, profile);
//   }
// );

// passport.use(strategy);
