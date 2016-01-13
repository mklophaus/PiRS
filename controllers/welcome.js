var Circle  = require('../models/circle');


var index = function(req, res, next) {
  if (req.user) {

  var allUserCircles = [];
  var itemsProcessed = 0;
  req.user.circles.forEach(function(circle) {
    Circle.findById(circle._id).populate('users').exec(function(err, circle) {
        if (err) {
          console.log(err)
        } else {
          allUserCircles.push(circle);
          itemsProcessed++;

          if (itemsProcessed === req.user.circles.length) {
            res.render('./index', { user: req.user, userCircles: allUserCircles });
          }
        }
    })
  })
  }
  else {
    res.render('./index', { user: req.user });
  }
}

module.exports = {
  index: index
};
