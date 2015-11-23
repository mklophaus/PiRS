SpotifyStrategy = require('passport-spotify').Strategy

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      return done(null, profile);
    });
    // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
}
