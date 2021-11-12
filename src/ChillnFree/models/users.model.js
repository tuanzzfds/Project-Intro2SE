const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  idUser: String,
  name: String,
  email: String,
  avatar: String,
});
const User = mongoose.model("users",  usersSchema);
module.exports = User;
