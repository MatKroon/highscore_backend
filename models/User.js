const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const Users = new Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("users", Users);
