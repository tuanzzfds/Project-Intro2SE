var express = require('express');
var router = express.Router();

/* GET Listening page. */

router.get('/', function(req, res, next) {
  res.render("playmusic",{title: "ChillnFree"});
});

module.exports = router;