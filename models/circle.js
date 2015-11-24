var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    debug = require('debug')('app:models');

var circleSchema = new Schema({
  title:   String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  created: { type: Date, default: Date.now },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var Circle = mongoose.model('Circle', circleSchema);

module.exports = Circle;
