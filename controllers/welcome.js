var index = function(req, res, next) {
  res.render('./index', { user: req.user });
};

module.exports = {
  index: index
};
