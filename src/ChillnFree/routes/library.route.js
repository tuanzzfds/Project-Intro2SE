var express = require("express");
var router = express.Router();
var {SignedInAllowed} = require("../assets/SignedInAllowed");

/** Get library */

router.get("/", SignedInAllowed, function (req, res, next) {
    if (!req.user) {
      res.redirect("/account/signIn");
    } else {
      res.render("library", {
        title: "ChillnFree",
        nameOfAccount: req.user.name,
      });
    }
  });

module.exports = router;
