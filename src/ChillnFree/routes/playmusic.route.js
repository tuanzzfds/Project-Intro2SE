var express = require("express");
var router = express.Router();
var { SignedInAllowed } = require("../assets/SignedInAllowed");

/* GET Listening page. */

// router.get('/', function(req, res, next) {
//   res.render("listening_page",{title: "ChillnFree - Play music"});
// });
router.get("/", SignedInAllowed, function (req, res, next) {
  res.render("playmusic", {
    title: "ChillnFree - Play music",
    nameOfAccount: req?.user?.name ?? false,
  });
});

module.exports = router;
