var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signIn', function(req, res, next) {
  res.render("signin",{title: "ChillnFree - Sign In"});
});
router.get('/signUp', function(req, res, next) {
    res.render("signup",{title: "ChillnFree - Sign Up"});
  });

module.exports = router;