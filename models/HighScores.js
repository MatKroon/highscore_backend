const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const HighScores = new Schema({
  game_id: ObjectId,
  player_id: ObjectId,
  game_name: String,
  player: {
    firstname: String,
    surname: String,
  },
  points: Number,
  date: Date,
});

module.exports = mongoose.model("highscores", HighScores);
