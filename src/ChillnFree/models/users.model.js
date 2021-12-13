const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  idUser: String,
  name: String,
  email: String,
  picture: String,
  createdAt: String
});
const User = mongoose.model("users",  usersSchema);
module.exports = User;
