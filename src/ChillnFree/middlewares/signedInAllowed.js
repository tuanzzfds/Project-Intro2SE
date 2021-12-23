const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "587388834334-fb1iddt85o3r4vlf77h80u745d4d2l2d.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

function SignedInAllowed(req, res, next) {
  if (!req.cookies.isAdmin) {
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
  } else {
    let admin = {
      id: "admin",
      name: "admin",
      email: "chillnfree.team@gmail.com",
      picture:
        "https://res.cloudinary.com/chillnfree/image/upload/v1640229901/ChillnFree/chill_logo_vwbdjq.png",
    };
    req.user = admin;
    next();
  }
}

module.exports = { SignedInAllowed };
