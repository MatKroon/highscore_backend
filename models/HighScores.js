const mongoose = require("mongoose");

const HighScores = mongoose.Schema({
  game_id: ObjectId,
  player_id: ObjectId,
  points: Number,
  date: Date,
});

module.exports = mongoose.model("highscores", HighScores);
