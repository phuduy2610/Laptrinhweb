const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('../passport');


/* GET home page. */
router.get('/',loginController.index);
router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send({respond: 0});
        return next();
      }
      req.login(user, function (err) {
        if (err) {
          console.log(err);
        }
        res.send({respond: 1}); // redirect after logged in
      });
    })
      (req, res, next);
  } 
  ,loginController.index);

module.exports = router;
