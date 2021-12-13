var express = require("express");
var router = express.Router();
const {
  showAllSongsInJSON,
  showAllChillSongsInJSON,
  showAllStudySongsInJSON,
  showAllSleepSongsInJSON,
} = require("../controllers/files.controller");
const { saveRedirectUrlToCookie } = require("../middlewares/redirectUrl");
const Report = require("../models/reports.model");


router.get("/top-music", showAllSongsInJSON);
router.get("/chill-music", showAllChillSongsInJSON);
router.get("/study-music", showAllStudySongsInJSON);
router.get("/sleep-music",  showAllSleepSongsInJSON);
router.post("/report",(req,res,next)=>{
  if (req.body){
    new Report({
      email: req.body.email,
      message: req.body.message,
      date: req.body.date,
      isSolved: false
    })
      .save()
      .then((newReport) => {
        console.log("New report added: " + newReport);
      });
    res.json({success: true});
  }else{
    res.json({success: false});
  }
})

// router.get("/admin/get-data"){

// }

module.exports = router;
