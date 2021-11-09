var express = require("express");
var router = express.Router();

/* GET home page. */
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '587388834334-fb1iddt85o3r4vlf77h80u745d4d2l2d.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.get("/", function (req, res, next) {
  res.render("home_page", { title: "ChillnFree" });
});

router.get("/home_signedin", SignedInAllowed, function (req, res, next) {
  // console.log('reached the home signed in route');
  let user = req.user;
  //let token = req.cookies['session-token'];
  res.render("home_signedin", {
    title: "ChillnFree",
    nameOfAccount: user.name,
  });
});

function SignedInAllowed(req, res, next){
  let token = req.cookies['session-token'];
  let user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
    }
  verify()
  .then(()=>{
      req.user = user;
      next();
  })
  .catch(err=>{
      res.redirect('/account/signIn')
  })

}

module.exports = router;
