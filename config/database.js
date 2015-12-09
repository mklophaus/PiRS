var mongoose = require('mongoose');
mongoose.Promise = Promise;

var env = require('./environment');

// Use different database URIs based on whether an env var exists.
var dbUri = env.DATABASE_URL ||
            'mongodb://localhost/' + env.SAFE_TITLE;

mongoose.connect(dbUri);

module.exports = mongoose;
