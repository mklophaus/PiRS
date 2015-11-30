var User = require('../models/user');
var Circle = require('../models/circle');
var spotify = require('../config/spotifyApiHelper');
var locus = require('locus');
var async = require('async');


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
      callback(null, 'one');
    },
    // "userid" {_id: 'userid'}
    function findCircleUsers(callback){
      circleUsersString.forEach(function(userString){
        User.findOne({ 'spotifyId': userString}, function(err, foundUser) {
          if (err) return done(err);
          if (foundUser) {
            circle.users.push(foundUser._id);
            circle.save(function(err, circle){
              if (err) return done(err);
              res.json(circle);
            });
          } else {
            // eval(locus);
            // req.body.users.forEach(function(user))
            var newUser = new User({
              spotifyId: userString,
              circles: []
            });
            circle.users.push(newUser._id);
            circle.save(function(err, circle){
              if (err) return done(err);
              res.json(circle);
            });
            newUser.save(function(err, user) {
              if (err) return done(err);
              // res.json(user);
            });
          }
        });
      });
      callback(null, 'two');
    },
    function assignCircles(callback){
  // eval(locus);
      circle.users.forEach(function(user){
        User.findOne({ '_id': user }, function(err, user) {
          if (err) return done(err);
          if (user) {
            user.circles.push(circle);
            user.save(function(err){
              if (err) return done(err);
              // res.json(user);
            });
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
  createCircle: createCircle,
  updateCircle: updateCircle,
  destroyCircle: destroyCircle
}
