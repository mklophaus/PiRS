var _ = require('lodash');

var localEnvVars = {
  TITLE:      'aux-hog',
  SAFE_TITLE: 'aux-hog'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
