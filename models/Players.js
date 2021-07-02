const mongoose = require("mongoose");

const Players = mongoose.Schema({
  firstname: String,
  surname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => validator.isEmail(value),
  },
});

module.exports = mongoose.model("players", Players);
