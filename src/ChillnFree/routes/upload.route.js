const express = require('express')
const router = express.Router()
const { upload } = require('../config/upload')
const { SignedInAllowed } = require("../middlewares/signedInAllowed")
const { saveRedirectUrlToCookie } = require('../middlewares/redirectUrl')
const { uploadCoverPicture } = require('../middlewares/uploadCoverPicture')
const { saveSongToMongo } = require('../middlewares/saveSongToMongo')



//GET @route /upload
router.get("/", SignedInAllowed, saveRedirectUrlToCookie, function (req, res, next) {
   if (!req.user) {
      res.redirect("account/signin")
   }
   else {
      res.clearCookie('redirectUrl')
      let user = req.user
      //let token = req.cookies['session-token']
      res.render("upload", {
         title: "ChillnFree - Upload",
         nameOfAccount: user.name,
      })
   }
})

router.post('/', SignedInAllowed, saveRedirectUrlToCookie, upload.single('file'), uploadCoverPicture, saveSongToMongo, (req, res, next) => {
   res.redirect('/upload')
})

module.exports = router
