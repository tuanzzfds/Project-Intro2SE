var express = require("express");
var router = express.Router();
var { SignedInAllowed } = require("../middlewares/signedInAllowed");
const Users = require("../models/users.model");
const Songs = require("../models/songs.model");

//middleware
router.get("/", SignedInAllowed, async function (req, res, next) {
  if (!req.user) {
    res.render("home", { title: "ChillnFree", user: false });
  } else {
    res.render("home", {
      title: "ChillnFree",
      user: req.user,
    });
  }
});

module.exports = router;
