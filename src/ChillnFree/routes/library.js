var express = require("express");
var router = express.Router();

/** Get library */

router.get("/",function (req, res, next) {
 res.render("library",{title: "ChillnFree", nameOfAccount: "Account"});

});

module.exports = router;
