var express = require("express");
var router = express.Router();
var { SignedInAllowed } = require("../middlewares/signedInAllowed");
const Users = require("../models/users.model");
const Songs = require("../models/songs.model");
var searchSong = require("../controllers/search.controller")

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

router.get("/search", SignedInAllowed, async function (req, res, next) {
  let check = false;
  const keyword = req.query.keyword;
  const list = await searchSong.func(keyword);
  if (list.length != 0) check = true;
  res.render("search", {
    keyword,
    title: "ChillnFree - Search result",
    user: req.user,
    list,
    check
  });
});

module.exports = router;
