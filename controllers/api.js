var User = require('../models/user');
var Circle = require('../models/circle');
var spotify = require('../config/spotifyApiHelper');
var locus = require('locus');

var indexCircle = function(req, res) {
  Circle.find({}, function(err, records) {
    res.json(records);
  });
};

var showCircle = function(req, res){
  var id = req.params.id;
  Circle.findById(id, function(err, circle){
    console.log("GOT TO THIS");
    if (err) {
      res.send(err);
    }
    res.json(circle);
  });
};


var indexUser = function(req, res) {
  User.find({}, function(err, records) {
    res.json(records);
  });
};

module.exports = {
  indexCircle: indexCircle,
  indexUser: indexUser,
  showCircle: showCircle
}
