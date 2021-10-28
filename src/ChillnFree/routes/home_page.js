var express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("home_page", { title: "ChillnFree" });
});

router.get("/home_signedin", function (req, res, next) {
  // console.log('reached the home signed in route');
  res.render("home_signedin", {
    title: "ChillnFree",
    nameOfAccount: "Account",
  });
});

module.exports = router;
