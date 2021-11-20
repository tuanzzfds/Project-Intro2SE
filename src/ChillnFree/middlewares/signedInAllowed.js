const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "587388834334-fb1iddt85o3r4vlf77h80u745d4d2l2d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

function SignedInAllowed(req, res, next) {
  let token = req.cookies["session-token"];
  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
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
      req.user = user;
      next();
    })
    .catch((err) => {
      // res.redirect('/account/signIn')
      next();
    });
}

module.exports = { SignedInAllowed }
