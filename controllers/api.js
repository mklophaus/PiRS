var User = require('../models/user');
var Circle = require('../models/circle');

var spotify = require('../config/spotifyApiHelper');

var indexCircle = function(req, res) {
  Circle.find({}, function(err, records) {
    res.send(records);
  });
};

var createCircle = function(req, res) {
  Circle.create(req.body, function(err, record) {
    if(err) {
      res.send(err);
    }
    res.send(record);
  });
};

var updateCircle = function(req, res) {
  req.record.set(req.body);
  req.record.save(function (err, record) {
    res.send(record);
  });
};

var destroyCircle = function(req, res) {
  req.record.remove(function (err, record) {
    res.send(record);
  });
};

module.exports = {
  indexCircle: indexCircle,
  createCircle: createCircle,
  updateCircle: updateCircle,
  destroyCircle: destroyCircle
}
