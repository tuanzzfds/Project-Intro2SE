var express = require("express");
var router = express.Router();
const User = require("../models/users.model");

// Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "587388834334-fb1iddt85o3r4vlf77h80u745d4d2l2d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

/* GET users listing. */
router.get("/signIn", function (req, res, next) {
  res.render("signin", { title: "ChillnFree - Sign In" });
});
router.get("/signUp", function (req, res, next) {
  res.render("signup", { title: "ChillnFree - Sign Up" });
});

router.post("/login", function (req, res, next) {
  let token = req.body.token;
  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
    // console.log(JSON.stringify(payload));
    user.id = payload.sub;
  }
  verify()
    .then(() => {
      res.cookie("session-token", token);
      res.send("success");
      // Check user is existed or not
      User.findOne({ idUser: user.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User is: ", currentUser);
        } else {
          // Add user to data base
          new User({
            idUser: user.id,
            name: user.name,
            email: user.email,
            avatar: user.picture,
          })
            .save()
            .then((newUser) => {
              console.log("New user created: " + newUser);
            });
        }
      });
    })
    .catch(console.error);
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("session-token");
  res.redirect("/");
});

module.exports = router;
