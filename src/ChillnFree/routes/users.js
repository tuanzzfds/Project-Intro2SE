var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const db = mongoose.connection;
const Users = require("../models/users.model");
var { SignedInAllowed } = require("../middlewares/signedInAllowed");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',SignedInAllowed, async function(req, res, next) {
  // res.send('respond with a resource');
  const user = await Users.findOne({ idUser: req.user.id });
    // Prints "Space Ghost is a talk show host".
    console.log(user);
  res.json(user);
});

router.get('/:id',SignedInAllowed, async function(req, res, next) {
  if (!req.user) {
      res.redirect("/account/signin");
    } else {
      res.clearCookie("redirectUrl");
      res.render("profile", {
        title: "ChillnFree - Profile",
        user: req.user
    });
    }
});

module.exports = router;
