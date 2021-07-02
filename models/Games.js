const mongoose = require("mongoose");

const Games = mongoose.Schema({
  name: String,
  description: String,
  genre: String,
  imageurl: String,
  url_slug: String,
});

module.exports = mongoose.model("games", Games);
