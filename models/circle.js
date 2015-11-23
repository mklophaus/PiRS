var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug    = require('debug')('app:models');

var circleSchema = new Schema({
  title:   String,
  creator: String,
});

var Circle = mongoose.model('User', circleSchema);

module.exports = Circle;
