var Circle  = require('../models/circle');


var index = function(req, res, next) {

  if (req.user) {
    console.log(req.user.circles.length);
    var allUserCircles = [];

    if (req.user.circles.length > 0) {

    var itemsProcessed = 0;
    req.user.circles.forEach(function(circle) {
      Circle.findById(circle._id).populate('users').exec(function(err, circle) {
          if (err) {
            console.log(err)
          } else {
            allUserCircles.push(circle);
            itemsProcessed++;

            if (itemsProcessed === req.user.circles.length) {
              console.log(allUserCircles);
              res.render('./index', { user: req.user, userCircles: allUserCircles });
              // res.render('./index', { user: req.user, userCircles: allUserCircles });
            }
          }
      })
    })
    }
    else {
      console.log("squuuuaa");
      res.render('./index', { user: req.user, userCircles: allUserCircles });
    }

  } else {
    res.render('./index', { user: req.user });
    // console.log("no user")
  }

}

module.exports = {
  index: index
};
