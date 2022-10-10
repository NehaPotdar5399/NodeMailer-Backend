const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let mailer = new Schema({
  from: String,
  to: String,
  subject: String,
  text: String,
  
});

module.exports = mongoose.model("mailers", mailer);
