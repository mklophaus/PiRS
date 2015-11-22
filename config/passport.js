SpotifyStrategy = require('passport-spotify').Strategy

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/spotify/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
passport.serializeUser(function(student, done) {
      done(null, student.id);
  });

passport.deserializeUser(function(id, done) {
  Student.findById(id, function(err, student) {
    done(err, student);
  });
});
}
