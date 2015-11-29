var User = require('../models/user');
var Circle = require('../models/circle');
var spotify = require('../config/spotifyApiHelper');
var locus = require('locus');
var async = require('async');

var indexCircle = function(req, res) {
  Circle.find({}, function(err, records) {
    res.json(records);
  });
};

var createCircle = function(req, res, done) {
  var circleUsersString = JSON.parse(req.body.users);
  var circleUsers = [req.user._id];
  var circle;
  async.series([
    function (callback) {
      circle = new Circle({
        creator: req.user._id,
        users: circleUsers,
        title: req.body.title
      });
      circle.users = circleUsers;
      // return circle
      callback(null, 'one');
    },
    function findCircleUsers(callback){
      circleUsersString.forEach(function(userString){
        User.findOne({ 'spotifyId': userString}, function(err, foundUser) {
          if (err) return done(err);
          if (foundUser) {
            circle.users.push(foundUser._id);
          } else {
            var newUser = new User({
              spotifyId: req.body.spotifyId,
              circles: []
            });
            // circle.users.push(user._id);
            newUser.save(function(err, user) {
              if (err) return done(err);
            });
          }
        });
      });
      circle.save(function(err, circle){
        if (err) res.json(err);
        res.json(circle);
      });
      callback(null, 'two');
    },
    function assignCircles(callback){
      circle.users.forEach(function(user){
        User.findOne({ '_id': user }, function(err, user) {
          if (err) return done(err);
          if (user) {
            var foundUser = user;
            foundUser.circles.push(circle);
            // foundUser.save(function(err){
            //   if (err) return done(err);
            // });
          }
        });
      });
      callback(null, 'three');
    },
    function(err, results){
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  ]);
};

var updateCircle = function(req, res) {
  req.record.set(req.body);
  req.record.save(function (err, record) {
    res.json(record);
  });
};

var destroyCircle = function(req, res) {
  req.record.remove(function (err, record) {
    res.json(record);
  });
};

module.exports = {
  indexCircle: indexCircle,
  createCircle: createCircle,
  updateCircle: updateCircle,
  destroyCircle: destroyCircle
}
