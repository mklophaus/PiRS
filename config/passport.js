var SpotifyStrategy = require('passport-spotify').Strategy;
var User = require('../models/user');

var debug = require('debug')('app:oauth');

module.exports = function(passport) {
  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_OAUTH_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'spotifyId': profile.id }, function(err, user) {
      if (err) return done(err);
      if (user) {
        debug("OAuth successful, found user: ", user.displayName);
        user.accessToken = accessToken;

        if(user.accessToken) {
          user.save(function(err, user) {
            if (err) return done(err);
            return done(null, user);
          });
        }

      } else {
        debug("OAuth successful, user not found!");

        // var image;
        // function getImage() {
        //   if (profile.images.length > 0) {
        //     return image = profile.images[0].url;
        //   } else {
        //     return image = 'https://i.imgur.com/NRhYDQD.png'
        //   }
        // }

        var newUser = new User({
          displayName:  profile.displayName || profile.username,
          email:        profile.emails[0].value,
          spotifyId:    profile.id,
          profileImage: 'https://i.imgur.com/NRhYDQD.png',
          circles:      [],
          accessToken:  accessToken
        });

        newUser.save(function(err, user) {
          debug("User created: ", user);

          if (err) return done(err);
          return done(null, user);
        });
      }
    });
  }));

  passport.serializeUser(function(user, done) {
   done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(null, user);
  })
  });
}
