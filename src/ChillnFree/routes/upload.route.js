const express = require("express");
const router = express.Router();
const { upload } = require("../config/upload");
const { SignedInAllowed } = require("../middlewares/signedInAllowed");
const { saveRedirectUrlToCookie } = require("../middlewares/redirectUrl");
const { uploadCoverPicture } = require("../middlewares/uploadCoverPicture");
const { saveSongToMongo } = require("../middlewares/saveSongToMongo");
const Users = require("../models/users.model");

//GET @route /upload
router.get(
  "/",
  SignedInAllowed,
  saveRedirectUrlToCookie,
  async function (req, res, next) {
    if (!req.user) {
      res.redirect("account/signin");
    } else {
      res.clearCookie("redirectUrl");
      res.render("upload", {
        title: "ChillnFree - Upload",
        user: req.user,
      });
    }
  }
);

router.post(
  "/",
  SignedInAllowed,
  saveRedirectUrlToCookie,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 10 },
  ]),
  saveSongToMongo,
  (req, res, next) => {
    res.json({success: true});
  }
);

module.exports = router;
