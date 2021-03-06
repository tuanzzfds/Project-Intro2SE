function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/account/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (req,res,next) {
    console.log("Signed in as: " + xhr.responseText);
    if (xhr.responseText == "success") {
      signOut();
      location.assign("/");
    }
  };
  xhr.send(JSON.stringify({ token: id_token }));
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {});
}
