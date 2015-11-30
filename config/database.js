var mongoose = require('mongoose');

// var env = require('./environment');

// Use different database URIs based on whether an env var exists.


mongoose.connect(process.env.DATABASE_URL);

module.exports = mongoose;
