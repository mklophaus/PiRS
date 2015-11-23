var index = function(req, res, next) {
  res.render('./index');
};

module.exports = {
  index: index
};
