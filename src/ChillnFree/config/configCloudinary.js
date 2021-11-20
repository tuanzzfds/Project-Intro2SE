const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "chillnfree",
  api_key: "687998861545446",
  api_secret: "TZhKWvz8jwSb32gCdg-um_4mpOs",
});

module.exports = cloudinary;
