const mongoose = require("mongoose");

const reportsSchema = new mongoose.Schema({
  email: String,
  message: String,
  date: String,
  isSolved: Boolean
});
const Report = mongoose.model("reports", reportsSchema);
module.exports = Report;
