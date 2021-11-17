var express = require("express");
var router = express.Router();
var {SignedInAllowed} = require("../middle_wares/SignedInAllowed");


//middleware
router.get("/", SignedInAllowed, function (req, res, next) {
  if (!req.user) {
    res.render("home", { title: "ChillnFree" });
  } else {
    let user = req.user;
    //let token = req.cookies['session-token'];
    res.render("home-signedin", {
      title: "ChillnFree",
      nameOfAccount: user.name,
    });
  }
});

router.get("/home-signedin", SignedInAllowed, function (req, res, next) {
  // console.log('reached the home signed in route');
  let user = req.user;
  //let token = req.cookies['session-token'];
  res.render("home-signedin", {
    title: "ChillnFree",
    nameOfAccount: user.name,
  });
  // console.log(user.name,user.email,user.picture);
});


module.exports = router;
