var express = require("express");
var router = express.Router();
const {
  showAllSongsInJSON,
  showAllChillSongsInJSON,
  showAllStudySongsInJSON,
  showAllSleepSongsInJSON,
} = require("../controllers/files.controller");


router.get("/top-music", showAllSongsInJSON);
router.get("/chill-music", showAllChillSongsInJSON);
router.get("/study-music", showAllStudySongsInJSON);
router.get("/sleep-music",  showAllSleepSongsInJSON);

module.exports = router;
