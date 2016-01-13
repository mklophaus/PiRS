// Require resource's model(s).
var User = require("../models/user");


var index = function(req, res) {
  User.find({}, function(err, records) {
    res.json(records);
  });
};

var show = function(req, res, next){
  User.find({spotifyId: req.params.spotifyId}, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render('users/show', {user: user});
  });
};

var currentUser = function(req, res, next){
  User.findById(req.user.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.send({user});
  });
}


module.exports = {
  index: index,
  show:  show,
  currentUser: currentUser
};
