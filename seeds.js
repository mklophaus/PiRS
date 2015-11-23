var mongoose = require('./config/database');

var User = require('./models/user');

var users = [
  {
  display_name: "Ben Benjamin",
  spotifyId: "beineken",
  profile_image: "https://scontent.xx.fbcdn.net/hprofile-xap1/v/t1.0-1/p200x200/1012989_10153159557102664_6156379247819893088_n.jpg?oh=e4442eb297ef7cb5561f945edcb9ec53&oe=56E3E40E",
  // email: String,
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.disconnect();
    }
  });
});
