const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const Games = new Schema({
  name: String,
  description: String,
  genre: String,
  image_url: String,
  url_slug: String,
  highscores: Array,
  highestscore: {
    player: {
      firstname: String,
      surname: String,
      player_id: ObjectId,
    },
    points: Number,
    date: Date,
  },
});

module.exports = mongoose.model("games", Games);

const mongo = "mongodb://localhost/highscore";

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
