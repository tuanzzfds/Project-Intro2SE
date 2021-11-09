var express = require('express');
var router = express.Router();

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '587388834334-fb1iddt85o3r4vlf77h80u745d4d2l2d.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

/* GET users listing. */
router.get('/signIn', function(req, res, next) {
  res.render("signin",{title: "ChillnFree - Sign In"});
});
router.get('/signUp', function(req, res, next) {
    res.render("signup",{title: "ChillnFree - Sign Up"});
 });

 router.post("/login", function (req, res, next) {
  let token = req.body.token;
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

  }
  verify().then(()=>{
    res.cookie('session-token', token);
    res.send('success');
  }).catch(console.error);
 
});

router.get("/logout", function (req, res, next) {
  res.clearCookie('session-token');
  res.redirect('/')
});


module.exports = router;