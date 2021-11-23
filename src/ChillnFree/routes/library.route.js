var express = require("express");
var router = express.Router();
var {SignedInAllowed} = require("../middlewares/signedInAllowed");
const Users = require("../models/users.model");

/** Get library */

router.get("/", SignedInAllowed,async function (req, res, next) {
    if (!req.user) {
      res.redirect("/account/signIn");
    } else {
      res.render("library", {
        title: "ChillnFree",
        user: req.user
      });
    }
  });

module.exports = router;
