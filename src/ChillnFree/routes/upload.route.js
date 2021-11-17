const express = require('express')
const router = express.Router()
const { upload } = require('../config/upload')
var {SignedInAllowed} = require("../middle_wares/SignedInAllowed");

// const multer = require('multer')
// const upload = multer().single('avatar')


//GET @route /upload
// router.get('/', (req, res, next) => {
//    res.render('upload')
// })

router.get("/", SignedInAllowed, function (req, res, next) {
   if (!req.user) {
     res.redirect("account/signin");
   } else {
     let user = req.user;
     //let token = req.cookies['session-token'];
     res.render("upload", {
       title: "ChillnFree - Upload",
       nameOfAccount: user.name,
     });
   }
 });

router.post('/',SignedInAllowed, upload.single('file'), (req, res, next) => {
   res.redirect('/upload');
})

module.exports = router
